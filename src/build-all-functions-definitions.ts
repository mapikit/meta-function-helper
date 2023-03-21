import { FunctionDefinition } from "./meta-function-type.js";
import { getDescriptorFileContent } from "./get-file.js";
import { isFunctionDefinition } from "./is-function-definition.js";

export async function buildAllFunctionDefinitions (
  definitionsAndPaths : Array<string | FunctionDefinition>,
  workingDir = "",
) : Promise<FunctionDefinition[]>  {
  const pathLib = await import("path");
  const [paths, definitions] = separatePathsAndDefinitions(definitionsAndPaths);

  for (const path of paths) {
    const content = await getFunctionDefinitionFromPath(pathLib.resolve(workingDir, path));
    definitions.push(content);
  }

  return definitions;
}

const separatePathsAndDefinitions = (definitionsAndPaths : Array<string | FunctionDefinition>)
: [string[], FunctionDefinition[]] => {
  const paths : string[] = [];
  const definitions : FunctionDefinition[] = [];

  definitionsAndPaths.forEach((description) => {
    if (typeof description === "string") {
      paths.push(description);
      return;
    }

    definitions.push(description);
  });

  return [paths, definitions];
};

// Exported so we can test it
export const getFunctionDefinitionFromPath = async (path : string) : Promise<FunctionDefinition> => {
  const pathLib = await import("path");
  const parsedPath = pathLib.parse(path);
  const fileName = parsedPath.name + parsedPath.ext;
  const filePath = parsedPath.dir;

  const fileContent = await getDescriptorFileContent(filePath, fileName);

  isFunctionDefinition(fileContent);

  return fileContent;
};
