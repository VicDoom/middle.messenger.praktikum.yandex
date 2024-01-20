export const displayName = (value?: string | null): string | boolean => {
  const regexp = new RegExp("^(?!\s*$).+");
  if (!value?.match(regexp)) {
    return "Строка не должна быть пустой";
  }
  return false;
};
