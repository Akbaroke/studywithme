import Table from '@/components/molecules/Table';
import { Tabs } from '@mantine/core';
import React from 'react';

export default function ManageContent() {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-10 py-10 w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Mengelola Konten</h1>
          <p className="text-md font-medium text-gray-500 max-w-lg">
            Kelola materi pelajaran dan konten yang ada di studywithme.
          </p>
        </div>
        <Tabs variant="outline" defaultValue="kategori" className="w-full">
          <Tabs.List>
            <Tabs.Tab value="kategori">Kategori</Tabs.Tab>
            <Tabs.Tab value="kontent">Kontent</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="kategori">
            <div className="flex flex-col gap-3 my-5 px-5">
              <p className="text-md font-semibold">Kategori</p>
              <Table header={['Name', 'Total Kategori']} data={[]} />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="kontent">
            <div className="flex flex-col gap-3 my-5 px-5">
              <p className="text-md font-semibold">Konten</p>
              <Table
                header={[
                  'Thumbnail',
                  'Title',
                  'Premium',
                  'Total Konten',
                  'Kategori',
                  'Total Klik',
                ]}
                data={[]}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="kontent">
            <div className="flex flex-col gap-3 my-5 px-5">
              <p className="text-md font-semibold">Konten</p>
              <Table
                header={[
                  'Thumbnail',
                  'Title',
                  'Premium',
                  'Total Konten',
                  'Kategori',
                  'Total Klik',
                ]}
                data={[]}
              />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
