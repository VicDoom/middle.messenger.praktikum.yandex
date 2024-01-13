export const login = (value?: string | null): boolean | string => {
  const regexp = new RegExp("^[a-zA-Z0-9-_]{3,20}$");
  if (!value?.match(regexp)) {
    return "Логин должен содержать от 3 до 20 символов, "
      + "представляющих латиницу, цифры, но не состоять из них, "
      + "без пробелов, возможны дефис и нижнее подчеркивание";
  }
  return false;
};
