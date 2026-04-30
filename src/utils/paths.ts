const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");

export function withBasePath(path: string): string {
  if (
    !path ||
    !basePath ||
    path.startsWith(basePath) ||
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  return path.startsWith("/") ? `${basePath}${path}` : path;
}
