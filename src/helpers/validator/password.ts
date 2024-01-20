export const password = (value?: string | null): string | boolean => {
  const regexp = new RegExp(/^(?=.*[A-Z])(?=.*[0-9]).+$/);
  if (!value?.match(regexp) || (value?.length ?? 0) < 8 || 40 < (value?.length ?? 0)) {
    return "Пароль должен содержать от 8 до 40 символов, обязательно одну заглавную букву и цифру";
  }
  return false;
};
