export const repeatPassword = (
  value?: string | null, repeatValue?: string | null,
): string | boolean => {
  if ((value ?? "") !== (repeatValue ?? "")) {
    return "Новые пароли не совпадают";
  }
  return false;
};
