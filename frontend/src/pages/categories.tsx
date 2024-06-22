import { CategoryModel } from '@/models/categoryModel';
import { getAllCategory } from '@/services/categoryService';
import { Button, Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

export default function Categories() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

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
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Button key={index} variant="default" radius="md" size="xs">
                  <Skeleton height={8} width={50} radius="xl" />
                </Button>
              ))
            : data?.map((category: CategoryModel) => (
                <Button
                  key={category.id}
                  variant="default"
                  radius="md"
                  size="xs"
                  className="hover:shadow-lg transition-all duration-500">
                  {category.name}
                </Button>
              ))}
        </div>
      </div>
    </div>
  );
}
