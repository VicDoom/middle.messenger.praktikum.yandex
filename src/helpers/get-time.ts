export function getTime (date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes}`;
};
