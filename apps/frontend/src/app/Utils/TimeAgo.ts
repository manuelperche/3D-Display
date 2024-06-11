export function TimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) {
    return `${parseInt(secondsPast.toString())} seconds ago`;
  }
  if (secondsPast < 3600) {
    return `${parseInt((secondsPast / 60).toString())} minutes ago`;
  }
  if (secondsPast <= 86400) {
    return `${parseInt((secondsPast / 3600).toString())} hours ago`;
  }
  if (secondsPast > 86400) {
    const day = parseInt((secondsPast / 86400).toString());
    return `${day} day${day > 1 ? "s" : ""} ago`;
  }
  return "";
}
