export const actgString = (string: string): boolean => {
  const input = string.toLocaleLowerCase();
  const regex = /[^actg]/;
  const match = input.match(regex);
  return !match;
};

export default { actgString };
