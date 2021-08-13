import { MetaFunction } from "./meta-function-type";
import { BuiltMetaPackage, MetaPackage } from "./meta-package-type";
import Path from "path";
import FS from "fs";
import { validateStringConfiguration } from "./validate-string-configuration";
import { ValidationErrorCodes } from "./error-codes";
import { error } from "./chalk-formatting";
import { isMetaFunction } from "./is-meta-function";
const fsPromise = FS.promises;

export async function buildFullPackageDescription (metaPackageDescription : MetaPackage) : Promise<BuiltMetaPackage>  {
  const filePaths : string[] = [];
  const inlineFunctionDescriptions : MetaFunction[] = [];
  metaPackageDescription.functionsDefinitions.forEach((description) => {
    if (typeof description === "string") {
      filePaths.push(description);
      return;
    }

    inlineFunctionDescriptions.push(description);
  });

  const result : BuiltMetaPackage = {
    name: metaPackageDescription.name,
    author: metaPackageDescription.author,
    version: metaPackageDescription.version,
    entrypoint: metaPackageDescription.entrypoint,
    functionsDefinitions: inlineFunctionDescriptions,
    description: metaPackageDescription.description,
  };

  for (const path of filePaths) {
    const content = await getFileContentFromPath(path);
    const parsed = JSON.parse(content)
    isMetaFunction(parsed, true);

    result.functionsDefinitions.push(parsed)
  }


  return result;
}

export async function getFileContentFromPath (path : string) : Promise<string> {
  const relativefilePath = Path.join(process.env.PWD, path);
  const absolutefilePath = Path.join(path);

  const fileContent = await fsPromise.readFile(relativefilePath, "utf-8")
    .catch(async () => {
      return await fsPromise.readFile(absolutefilePath, "utf-8")
        .catch((err) => {
          console.error(error(`Path "${path}" does not resolve in a configuration file`))
          console.error(err);
          throw Error(ValidationErrorCodes.V39);
        });
    });
  
  validateStringConfiguration(fileContent, true);

  return fileContent;
}
