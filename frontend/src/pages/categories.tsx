import { Button } from '@mantine/core';
import React from 'react';

export default function Categories() {
  const categories = [
    { id: '1', name: 'Pemrograman' },
    { id: '2', name: 'JavaScript' },
    { id: '3', name: 'React' },
    { id: '4', name: 'Vue.js' },
    { id: '5', name: 'Angular' },
    { id: '6', name: 'Laravel' },
    { id: '7', name: 'Next.js' },
    { id: '8', name: 'Dart' },
    { id: '9', name: 'Flutter' },
    { id: '10', name: 'Tailwind CSS' },
    { id: '11', name: 'Bootstrap' },
    { id: '12', name: 'Svelte' },
    { id: '13', name: 'Golang' },
    { id: '14', name: 'Kotlin' },
    { id: '15', name: 'Rust' },
    { id: '16', name: 'C++' },
    { id: '17', name: 'Python' },
    { id: '18', name: 'PHP' },
    { id: '19', name: 'C#' },
    { id: '20', name: 'Ruby' },
  ];

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
          {categories.map((category) => (
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
