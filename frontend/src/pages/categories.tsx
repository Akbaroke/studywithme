import CardContent from '@/components/atoms/CardContent';
import cn from '@/helpers/cn';
import { CategoryModel } from '@/models/categoryModel';
import { ContentModel } from '@/models/contentModel';
import { getAllCategory } from '@/services/categoryService';
import { getAllContent } from '@/services/contentService';
import { Button, SimpleGrid, Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
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
    <div>
      <div className="flex flex-col gap-5 py-10">
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
            : categories?.data?.map((category: CategoryModel) => (
                <Button
                  key={category.id}
                  variant={
                    categorySelected === category.id ? 'filled' : 'default'
                  }
                  radius="md"
                  color={categorySelected === category.id ? '#000' : 'default'}
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
              ))}
        </div>
        <SimpleGrid
          mt={30}
          cols={{ base: 2, xs: 3, sm: 4 }}
          spacing={{ base: 10, sm: 20 }}>
          {filteredContents?.map((item) => (
            <CardContent key={item.id} {...item} />
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
