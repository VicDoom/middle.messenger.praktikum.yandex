export const getTime = (value?: string): string => {
  if (!value) {
    return "";
  }
  const date = new Date(value);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = hours < 10 ? `0${hours}` : hours; 
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; 
  return `${formattedHours}:${formattedMinutes}`;
};
