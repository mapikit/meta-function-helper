export const logVersion = async () : Promise<void> => {
  const packageFile = await import("../../package.json");

  if (process.argv.includes("-v")) {
    console.log("Meta-Function-Helper Version " + packageFile.version);

    process.exit(0);
  }
};
