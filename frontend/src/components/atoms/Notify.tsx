import { toast } from 'sonner';

export type NotifyTypes = 'success' | 'error' | 'loading';

const Notify = (type: NotifyTypes, message: string, id?: string) => {
  switch (type) {
    case 'success':
      return toast.success(message, { id });
    case 'error':
      return toast.error(message, { id });
    case 'loading':
      return toast.loading(message, { id });
  }
};

export default Notify;
