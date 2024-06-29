function getInitials(name: string): string {
  if (!name) return '';
  const words = name.split(' ');
  if (words.length === 0) return '';
  const firstInitial = words[0].charAt(0);
  const secondInitial = words.length > 1 ? words[1].charAt(0) : '';
  return (firstInitial + secondInitial).toLowerCase();
}

export default getInitials;
