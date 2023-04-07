export async function cacheFixedImport (path : string) : Promise<unknown> {
  // checks if it is running on NodeJS
  if (process.version) {
    let result;

    if (path.endsWith(".json")) {
      const fs = await import("fs/promises");
      result = JSON.parse((await fs.readFile(path)).toString());
    } else {
      const { pathToFileURL } = await import("node:url");
      const fileUrl = pathToFileURL(path);
      result = await import(fileUrl.href);
    }

    return result;
  }

  return import(path);
}
