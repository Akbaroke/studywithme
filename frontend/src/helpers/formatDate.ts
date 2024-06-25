import moment from 'moment';

function formatDate(date: Date): string {
  return moment(date).format('DD-MM-YYYY HH:mm:ss');
}
function formatDateOnly(date: Date): string {
  return moment(date).format('DD MMMM YYYY');
}

function formatSeconds(seconds: number): string {
  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format hours, minutes, and seconds as two-digit strings
  const hoursString = String(hours).padStart(2, '0');
  const minutesString = String(minutes).padStart(2, '0');
  const secondsString = String(remainingSeconds).padStart(2, '0');

  // Determine the format based on the total time
  if (hours > 0) {
    return `${hoursString}:${minutesString}:${secondsString}`;
  } else if (minutes > 0) {
    return `${minutesString}:${secondsString}`;
  } else {
    return `00:${secondsString}`;
  }
}

export { formatDate, formatDateOnly, formatSeconds };
