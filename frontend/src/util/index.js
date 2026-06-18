export function formatDate(date, format = 'DD-MM-YYYY') {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  const shortMonth = d.toLocaleString('en', {
    month: 'short'
  });

  return format
    .replace('DD', day)
    .replace('MMM', shortMonth)
    .replace('MM', month)
    .replace('YYYY', year);
};
