export const phone = (value?: string | null): string | boolean => {
  const regexp = new RegExp(/^\+?[0-9]{10,15}$/);
  if (!value?.match(regexp)) {
    return "Телефон может начинаться с плюса и должен содержать от 10 до 15 цифр";
  }
  return false;
};
