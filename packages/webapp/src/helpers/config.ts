export default function getConfig(key: string): string {
  return window.env[key] || process.env[key] || "";
}
