export const getCroppedText = (text: string): string => {
  if (text.length < 51) {
    return text;
  };
  return `${text.slice(0, 50)}...`;
};
