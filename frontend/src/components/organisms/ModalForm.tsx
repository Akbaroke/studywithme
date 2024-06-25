import { Modal as MantineModal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import FormCategory from '../molecules/FormCategory';
import FormContent from '../molecules/FormContent';

type Props = {
  children: React.ReactNode;
  title: string;
  formType: 'category' | 'content' | 'detail-content';
  id?: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export default function ModalForm({ children, title, formType, id, className, size = 'sm' }: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const formRender = () => {
    switch (formType) {
      case 'category':
        return <FormCategory id={id} close={close} />;
      case 'content':
        return <FormContent id={id} close={close} />;
      case 'detail-content':
        return <FormContent id={id} close={close} />;
    }
  };

  return (
    <>
      <MantineModal
        centered
        opened={opened}
        onClose={close}
        title={title}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        size={size}
        radius="md"
        styles={{
          title: {
            fontWeight: 600,
          },
          header: {
            borderBottom: '1px solid #f0f0f0',
          },
          body: {
            padding: 20,
          },
        }}>
        {formRender()}
      </MantineModal>

      <div onClick={open} className={className}>
        {children}
      </div>
    </>
  );
}
