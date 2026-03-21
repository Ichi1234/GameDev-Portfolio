export function formatVersion(version: string) {
  const parts = version.split(".");

  while (parts.length < 3) {
    parts.push("0");
  }

  return `v${parts.join(".")}`;
}