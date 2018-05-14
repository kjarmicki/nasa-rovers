function fill(char, times) {
  return Array.from({ length: times }).map(() => char).join('');
}

function ensureSize(num, size = 2) {
  let output = num.toString();
  if (output.length < size) {
    output = fill('0', size - output.length) + output;
  }
  return output;
}

export function daysToMiliseconds(days) {
  return days * 1000 * 60 * 60 * 24;
}

export function msToReadableDate(ms) {
  const date = new Date(ms);
  return `${date.getFullYear()}-${ensureSize(date.getMonth() + 1)}-${ensureSize(date.getDate())}`;
}
