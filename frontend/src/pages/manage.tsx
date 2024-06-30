import { ActionIcon, Tabs } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import ModalForm from '@/components/organisms/ModalForm';
import TableCategory from '@/components/organisms/TableCategory';
import TableContent from '@/components/organisms/TableContent';
import TableQuestion from '@/components/organisms/TableQuestion';
import TableManageContent from '@/components/organisms/TableManageContent';
import { GetServerSideProps } from 'next';
import { NextRequest } from 'next/server';
import getSession from '@/services/getSession';
import { RoleType } from '@/models/userModel';
import { useState } from 'react';
import cn from '@/helpers/cn';

export default function Manage({ role }: { role: RoleType }) {
  const [tabActive, setTabActive] = useState('kategori');

  return (
    <div className="w-full">
      <div className="flex flex-col gap-10 py-10 w-full">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Mengelola</h1>
          <p className="text-md font-medium text-gray-500 max-w-lg">
            Kelola materi pelajaran dan konten yang ada di studywithme.
          </p>
        </div>
        <Tabs
          variant="outline"
          className="w-full"
          value={tabActive}
          onChange={(e) => setTabActive(e as string)}>
          <Tabs.List>
            <Tabs.Tab
              value="kategori"
              className={cn({ 'font-bold': tabActive === 'kategori' })}>
              Kategori
            </Tabs.Tab>
            <Tabs.Tab
              value="konten"
              className={cn({ 'font-bold': tabActive === 'konten' })}>
              Konten
            </Tabs.Tab>
            <Tabs.Tab
              value="bank-soal"
              className={cn({ 'font-bold': tabActive === 'bank-soal' })}>
              Bank Soal
            </Tabs.Tab>
            {role === 'ADMIN' && (
              <Tabs.Tab
                value="manage-user"
                className={cn({ 'font-bold': tabActive === 'manage-user' })}>
                Kelola Pengguna
              </Tabs.Tab>
            )}
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
          <Tabs.Panel value="manage-user">
            <div className="flex flex-col gap-3 my-5 px-5">
              <div className="flex items-center justify-between">
                <p className="text-md font-semibold">Kelola Pengguna</p>
                <ActionIcon
                  variant="light"
                  size="lg"
                  radius="md"
                  className="invisible">
                  <IconPlus size={18} />
                </ActionIcon>
              </div>
              <TableManageContent />
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const sessionData = await getSession(ctx.req as unknown as NextRequest);

  if (!['ADMIN', 'TEACHER'].includes(sessionData?.role as string)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      role: sessionData?.role,
    },
  };
};
