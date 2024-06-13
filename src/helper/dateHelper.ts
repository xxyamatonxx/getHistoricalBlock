export function unixToDate(unix: number): Date {
  return new Date(new Date(unix * 1000).toUTCString());
}

export function isCloseToMidnight(date: Date,limitMinute?:number) {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  if (!limitMinute && limitMinute !== 0) {
    return hours === 23 && minutes >= 57 && seconds >= 0;
  }


  return hours === 23 && minutes >= limitMinute && seconds >= 0;
}