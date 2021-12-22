import { ValidationErrorCodes } from "./error-codes";

const createError = (err : Error) : Error => {
  return Error(ValidationErrorCodes.failedToGetFile + " || "
    + err
    + " -- The file is probably not a valid JS or JSON file");
};

const resolveFileAndPath = async (
  path : string,
  fileNameAndFormat : string,
) : Promise<string> => {
  const pathLib = await import("path");

  const parsedFileNameAndFormat = fileNameAndFormat.startsWith("/")
    ? `.${fileNameAndFormat}` : fileNameAndFormat;

  return pathLib.resolve(path, parsedFileNameAndFormat);
};

const getFileGetterFunction = (path : string, fileNameAndFormat : string)
  : () => Promise<unknown> => {
  return async () : Promise<unknown> => {
    const resolvedPath = await resolveFileAndPath(path, fileNameAndFormat);
    const isJs = fileNameAndFormat.endsWith(".js") || fileNameAndFormat.endsWith(".json");

    if (isJs) {
      const importedData = await import(resolvedPath)
        .catch((err : Error) => { throw createError(err); });
      return importedData;
    }

    const fileLib = await import("fs");

    return fileLib.promises.readFile(resolvedPath, "utf-8");;
  };
};

export const getDescriptorFileContent = async (path : string, fileName : string)
: Promise<unknown> => {
  const usedFileName = fileName.endsWith(".json") ? fileName : `${fileName}.json`;
  const getter = getFileGetterFunction(path, usedFileName);
  const result = await getter();

  return result as unknown;
};

export const getClassConstructor = async (path : string, fileName : string, mainExport : string)
: Promise<unknown> => {
  const usedFileName = fileName.endsWith(".js") ? fileName : `${fileName}.js`;
  const getter = getFileGetterFunction(path, usedFileName);
  const classFile = await getter();

  return classFile[mainExport];
};
