import { images } from '@/assets';
import { Button } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default function Banner() {
  const router = useRouter();
  return (
    <div className="w-full h-max sm:h-[300px] rounded-xl overflow-hidden relative bg-black sm:p-8 p-5">
      <Image
        src={images.BANNER_1}
        alt="banner_1"
        className="w-full h-full object-cover object-left absolute top-0 left-0 bottom-0 right-0"
      />
      <div className="flex flex-col gap-2 relative z-10 justify-center h-full">
        <div>
          <h1 className="text-2xl font-bold text-white">Screencast Efectif</h1>
          <h1 className="text-xl font-bold text-white">
            untuk Para Programmer
          </h1>
        </div>
        <p className="text-white text-xs leading-5 max-w-sm">
          Tingkatkan level keahlian Anda melalui screencast efektif yang
          mendalam. Pelajari beragam topik penting seperti Laravel, React,
          Next.js, Tailwind CSS, dan banyak lagi.
        </p>
        <Button
          variant="filled"
          size="xs"
          radius="md"
          mt={10}
          color="#fff"
          styles={{
            root: {
              color: '#000',
              width: 'max-content',
            },
          }}
          rightSection={<IconArrowNarrowRight size={15} />}
          onClick={() => router.push('/categories')}>
          Temukan Kategori
        </Button>
      </div>
    </div>
  );
}
