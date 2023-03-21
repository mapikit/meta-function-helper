import { cacheFixedImport } from "../dynamic-import.js";

export const logVersion = async () : Promise<void> => {
  if (!process.version) { return; } // Not running in Node;
  const pathLib = await import("path");
  const packageFile = await cacheFixedImport(
    pathLib.join(process.cwd(),"package.json")) as Record<string, unknown>;

  if (process.argv.includes("-v")) {
    console.log("Meta-Function-Helper Version " + packageFile.version);

    process.exit(0);
  }
};
