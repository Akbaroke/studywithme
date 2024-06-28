import { formatSeconds } from '@/helpers/formatDate';
import { DetailContentModel } from '@/models/contentModel';
import { UserModel } from '@/models/userModel';
import { ActionIcon, Divider } from '@mantine/core';
import { IconLock, IconPencil } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import ModalForm from '../organisms/ModalForm';

const ListContent = ({
  content,
  id_content,
}: {
  content: DetailContentModel;
  id_content: string;
}) => {
  const session: UserModel = useSession().data?.user as UserModel;

  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/detail-content/${id_content}/${content.id}`}
        className="flex items-center justify-between py-3 text-sm text-gray-500 [&>div>h2]:hover:text-gray-500 border-b border-dashed cursor-pointer flex-1">
        <div className="flex items-center gap-2">
          <h1 className="line-clamp-1">{content.serial_number}.</h1>
          <h2 className="font-medium text-black line-clamp-2">
            {content.title}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          {content?.is_premium && <IconLock size={16} />}
          {content?.video_url && (
            <>
              <Divider orientation="vertical" />
              <p>{formatSeconds(content.duration)}</p>
            </>
          )}
        </div>
      </Link>
      {(session?.role === 'TEACHER' || session?.role === 'ADMIN') && (
        <ModalForm
          formType="detail-content"
          id_content={id_content}
          id={content.id}
          className="ml-3"
          title="Edit Materi"
          size="xl">
          <ActionIcon variant="light" size="lg" radius="md">
            <IconPencil size={18} />
          </ActionIcon>
        </ModalForm>
      )}
    </div>
  );
};

export default ListContent;
