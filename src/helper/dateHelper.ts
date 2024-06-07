export function unixToDate(unix: number): Date {
  return new Date(new Date(unix * 1000).toUTCString());
}

export function isCloseToMidnight(date: Date) {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return hours === 23 && minutes >= 57 && seconds >= 0;
}