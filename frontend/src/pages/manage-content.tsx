import { ActionIcon, Tabs } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import ModalForm from '@/components/organisms/ModalForm';
import TableCategory from '@/components/organisms/TableCategory';
import TableContent from '@/components/organisms/TableContent';
import TableQuestion from '@/components/organisms/TableQuestion';

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
            <Tabs.Tab value="konten">Konten</Tabs.Tab>
            <Tabs.Tab value="bank-soal">Bank Soal</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="kategori">
            <div className="flex flex-col gap-3 my-5 px-5">
              <div className="flex items-center justify-between">
                <p className="text-md font-semibold">Kategori</p>
                <ModalForm formType="category" title="Buat Kategori">
                  <ActionIcon variant="light" size="lg" radius="md">
                    <IconPlus size={18} />
                  </ActionIcon>
                </ModalForm>
              </div>
              <TableCategory />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="konten">
            <div className="flex flex-col gap-3 my-5 px-5">
              <div className="flex items-center justify-between">
                <p className="text-md font-semibold">Konten</p>
                <ModalForm formType="content" title="Buat Konten" size="xl">
                  <ActionIcon variant="light" size="lg" radius="md">
                    <IconPlus size={18} />
                  </ActionIcon>
                </ModalForm>
              </div>
              <TableContent />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="bank-soal">
            <div className="flex flex-col gap-3 my-5 px-5">
              <div className="flex items-center justify-between">
                <p className="text-md font-semibold">Bank Soal</p>
                <ModalForm formType="question" title="Buat Soal" size="lg">
                  <ActionIcon variant="light" size="lg" radius="md">
                    <IconPlus size={18} />
                  </ActionIcon>
                </ModalForm>
              </div>
              <TableQuestion />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
