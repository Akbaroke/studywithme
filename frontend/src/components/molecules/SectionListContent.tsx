import { ContentModel } from '@/models/contentModel';
import { Divider, SimpleGrid } from '@mantine/core';
import React from 'react';
import { CardContent, CardContentSkeleton } from '../atoms/CardContent';
import { useMediaQuery } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  title: string;
  data: ContentModel[];
  loading: boolean;
};

export default function SectionListContent({ title, data, loading }: Props) {
  const isNotMobile = useMediaQuery('(min-width: 768px)');

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{title}</h1>
        </div>
        <Divider mt={10} />
      </div>
      <AnimatePresence>
        {loading ? (
          <SimpleGrid
            cols={{ base: 2, xs: 3, sm: 4 }}
            spacing={{ base: 10, sm: 20 }}>
            {Array.from({ length: isNotMobile ? 8 : 4 }).map((_, index) => (
              <CardContentSkeleton key={index} />
            ))}
          </SimpleGrid>
        ) : (
          data?.length > 0 && (
            <SimpleGrid
              cols={{ base: 2, xs: 3, sm: 4 }}
              spacing={{ base: 10, sm: 20 }}>
              {data?.slice(0, isNotMobile ? 8 : 4).map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants}>
                  <CardContent {...item} />
                </motion.div>
              ))}
            </SimpleGrid>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

const itemVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
    },
  }),
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
      duration: 0.5,
    },
  }),
  exit: (index: number) => ({
    opacity: 0,
    y: 20,
    transition: {
      delay: index * 0.2, // Adjust the delay as needed
    },
  }),
};

