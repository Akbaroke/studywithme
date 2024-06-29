import { Button, FocusTrap, Textarea } from '@mantine/core';
import DefaultProfilePicture from './DefaultProfilePicture';
import { UserModel } from '@/models/userModel';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { IconSend2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

type Props = {
  user: UserModel;
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  minRows?: number;
  maxRows?: number;
  sendComment: () => void;
  hiddenUserInfo?: boolean;
};

export default function InputDiscussion({
  user,
  value,
  onChange,
  isLoading,
  minRows,
  maxRows,
  sendComment,
  hiddenUserInfo,
}: Props) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);

    return () => setActive(false);
  }, []);

  return (
    <div className="flex gap-4">
      {!hiddenUserInfo && (
        <DefaultProfilePicture name={user?.name} className="flex-1 min-w-10" />
      )}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1 w-full">
          {!hiddenUserInfo && (
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold">{user?.name}</h1>
              {user?.is_verified && (
                <VscVerifiedFilled size={16} className="text-blue-500" />
              )}
            </div>
          )}
          <FocusTrap active={active}>
            <Textarea
              placeholder="Tulis komentar ..."
              autosize
              className="w-full"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              minRows={minRows ?? 3}
              maxRows={maxRows ?? 10}
              radius="md"
              readOnly={isLoading}
            />
          </FocusTrap>
        </div>
        <div className="flex items-center justify-end">
          <Button
            rightSection={<IconSend2 size={16} />}
            type="button"
            radius="md"
            size="xs"
            onClick={sendComment}
            // color="#000"
            loading={isLoading}
            disabled={value?.trim().length < 2}>
            Kirim
          </Button>
        </div>
      </div>
    </div>
  );
}
