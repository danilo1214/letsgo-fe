export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  const capitalized = s
    .split(' ')
    .map((c) => c.charAt(0).toUpperCase() + c.slice(1));
  return capitalized.join(' ');
};
