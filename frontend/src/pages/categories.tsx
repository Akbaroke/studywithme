import {
  CardContent,
  CardContentSkeleton,
} from '@/components/atoms/CardContent';
import Metadata from '@/components/atoms/Metadata';
import cn from '@/helpers/cn';
import { CategoryModel } from '@/models/categoryModel';
import { ContentModel } from '@/models/contentModel';
import { getAllCategory } from '@/services/categoryService';
import { getAllContent } from '@/services/contentService';
import { Button, SimpleGrid, Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export default function Categories() {
  const [categorySelected, setCategorySelected] = useState('');
  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });
  const contents = useQuery<ContentModel[]>({
    queryKey: ['contents'],
    queryFn: getAllContent,
  });

  const filteredContents = categorySelected
    ? contents?.data?.filter((content) =>
        content.categories.some((category) => category.id === categorySelected)
      )
    : contents?.data;

  return (
    <AnimatePresence>
      <Metadata title="Kategori" />
      <div className="flex flex-col gap-5 sm:py-10 py-5">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Kategori</h1>
          <p className="text-md font-medium text-gray-500 max-w-lg">
            Pelajari topik-topik penting dalam pengembangan aplikasi web dan
            jadilah developer handal di era teknologi modern.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories?.isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Button key={index} variant="default" radius="md" size="xs">
                  <Skeleton height={8} width={50} radius="xl" />
                </Button>
              ))
            : categories?.data?.map(
                (category: CategoryModel, index: number) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}>
                    <Button
                      variant={
                        categorySelected === category.id ? 'filled' : 'default'
                      }
                      radius="md"
                      color={
                        categorySelected === category.id ? '#000' : 'default'
                      }
                      size="xs"
                      onClick={() =>
                        setCategorySelected(
                          categorySelected === category.id ? '' : category.id
                        )
                      }
                      className={cn(
                        'hover:shadow-lg transition-all duration-500',
                        categorySelected === category.id && 'shadow-lg'
                      )}>
                      {category.name}
                    </Button>
                  </motion.div>
                )
              )}
        </div>
        <SimpleGrid
          mt={30}
          cols={{ base: 2, xs: 3, sm: 4 }}
          spacing={{ base: 10, sm: 20 }}>
          {contents?.isLoading
            ? Array.from({ length: 16 }).map((_, index) => (
                <CardContentSkeleton key={index} />
              ))
            : filteredContents?.map((item, index) => (
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
      </div>
    </AnimatePresence>
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

