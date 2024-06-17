import { Tabs } from '@mantine/core';
import React from 'react';

export default function ManageContent() {
  return (
    <div>
      <div className="flex flex-col gap-10 py-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Mengelola Konten</h1>
          <p className="text-md font-medium text-gray-500 max-w-lg">
            Pelajari topik-topik penting dalam pengembangan aplikasi web dan
            jadilah developer handal di era teknologi modern.
          </p>
        </div>
        <Tabs variant="outline" defaultValue="kategori">
          <Tabs.List>
            <Tabs.Tab value="kategori">Kategori</Tabs.Tab>
            <Tabs.Tab value="kontent">Kontent</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="kategori">kategori</Tabs.Panel>
          <Tabs.Panel value="kontent">Kontent</Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
