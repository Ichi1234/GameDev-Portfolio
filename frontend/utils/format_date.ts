export function formatDate(dateString: string, includeDay = false) {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    ...(includeDay && { day: "numeric" }),
    month: "short",
    year: "numeric",
  }).toUpperCase();
}
