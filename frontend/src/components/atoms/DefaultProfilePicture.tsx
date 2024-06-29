import cn from '@/helpers/cn';
import getInitials from '@/helpers/getInitials';

export default function DefaultProfilePicture({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'bg-black/10 rounded-full w-10 h-10 flex items-center justify-center uppercase font-medium text-gray-400',
        className
      )}>
      <p>{getInitials(name)}</p>
    </div>
  );
}
