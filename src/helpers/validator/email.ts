export const email = (value?: string | null): string | boolean => {
  const regexp = new RegExp("^[a-zA-Z0-9-_]+@[a-zA-Z]+\.[a-zA-Z]+$");
  if (!value?.match(regexp)) {
    return "Email должен быть корректным, например: na-_me@soup.ru";
  }
  return false;
};
