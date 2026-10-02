export function genreColor(genre: string): string {
  switch (genre) {
    case 'Fantasy':
      return '#7c3aed';
    case 'Science Fiction':
      return '#0891b2';
    case 'Mystery':
      return '#ca8a04';
    case 'Romance':
      return '#db2777';
    case 'Horror':
      return '#b91c1c';
    case 'Classic':
      return '#92400e';
    case "Children's Literature":
      return '#16a34a';
    default:
      return '#94a3b8';
  }
}
