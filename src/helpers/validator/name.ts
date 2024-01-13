export const name = (value?: string | null): string | boolean => {
  const regexp = new RegExp("^[\wА-ЯA-Z][a-zA-Z\wа-я\wА-ЯёЁ]+$");
  if (!value?.match(regexp)) {
    return "Допустимы только символы кириллицы и латиницы, первая буква - заглавная";
  }
  return false;
};
