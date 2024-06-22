import validator from 'validator';

export const validatorNotOnlySpace = (value: string) => {
  return (
    !validator.isAlphanumeric(validator.blacklist(value, ' ')) ||
    validator.trim(value).replace(/\s+/g, ' ') !== value
  );
};

export const validatorPassword = (value: string) => {
  return /^(?=.*\d)(?=.*[a-zA-Z])/.test(value);
};
