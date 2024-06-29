import { DiscussionModel } from '@/models/contentModel';
import DefaultProfilePicture from '../atoms/DefaultProfilePicture';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { ActionIcon } from '@mantine/core';
import moment from 'moment';
import {
  IoChatbubbleEllipsesOutline,
  IoChatbubbleEllipses,
} from 'react-icons/io5';

type Props = {
  discussion: DiscussionModel;
  isDisableReply?: boolean;
  onOpenReply?: () => void;
};

export default function DiscussionItem({
  discussion,
  isDisableReply,
  onOpenReply,
}: Props) {
  return (
    <div className="flex gap-4">
      <DefaultProfilePicture name={discussion.user.name} />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold">{discussion.user.name}</h1>
            {discussion.user.is_verified && (
              <VscVerifiedFilled size={16} className="text-blue-500" />
            )}
            <p className="text-xs">
              {moment(discussion.created_at).format('DD/MM/YYYY')}
            </p>
          </div>
          <p className="text-sm">{discussion.message}</p>
        </div>
        {!isDisableReply && (
          <div className="flex gap-1 items-center">
            <ActionIcon
              variant="subtle"
              aria-label="Replies"
              size={25}
              onClick={onOpenReply}
              styles={{
                icon: {
                  color: 'rgb(0 0 0 / 0.2)',
                },
              }}
              radius="100">
              {discussion?.replies?.length === 0 ? (
                <IoChatbubbleEllipsesOutline
                  style={{ width: '70%', height: '70%' }}
                />
              ) : (
                <IoChatbubbleEllipses style={{ width: '70%', height: '70%' }} />
              )}
            </ActionIcon>
            <p className="text-xs font-semibold text-gray-500">
              {discussion?.replies?.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
