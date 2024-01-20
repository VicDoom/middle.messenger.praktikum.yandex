export const message = (value?: string | null): string | boolean => {
  const regexp = new RegExp("^(?!\s*$).+");
  if (!value?.match(regexp)) {
    return "Сообщение не должно быть пустым";
  }
  return false;
};
