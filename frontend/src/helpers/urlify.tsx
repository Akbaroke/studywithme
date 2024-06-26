import TextLink from '@/components/atoms/TextLink';

const urlify = (text?: string) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  const parts = text?.split(urlPattern);

  return parts?.map((part, index) =>
    urlPattern.test(part) ? (
      <TextLink href={part} target="_blank" text={part} key={index} />
    ) : (
      part
    )
  );
};

export default urlify;
