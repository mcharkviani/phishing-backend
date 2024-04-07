export const randomGenerator = (min = 20, max = 50): string => {
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  return number.toString();
};
