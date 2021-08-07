import { MetaFunction } from "./meta-function-type";
import { MetaPackage } from "./meta-package-type";
import Path from "path";
import FS from "fs";
import { ValidationErrorCodes } from "./error-codes";
import { validateStringConfiguration } from "./validate-string-configuration";
import { error } from "./chalk-formatting";

const fsPromise = FS.promises;

export class ValidateMetaPackageFunctionDefinition {
  public constructor (
    private readonly packageConfig : MetaPackage
  ) {}

  public async execute () : Promise<void> {
    const functionsDefinitions = this.packageConfig.functionsDefinitions;
    const stringFunctionsDefinitions : string[] = []
    const objectFunctionsDefinitions : MetaFunction[] = []
    
    functionsDefinitions
      .forEach((functionDef) => {
        if (typeof functionDef === "string") {
          stringFunctionsDefinitions.push(functionDef);
          return;
        }

        objectFunctionsDefinitions.push(functionDef);
      });
    
    objectFunctionsDefinitions.forEach((functionDef) => {
      validateStringConfiguration(JSON.stringify(functionDef), true)
    });

    await this.validateAllFilesStringDefinition(stringFunctionsDefinitions);
  }

  private async validateAllFilesStringDefinition (paths : string[]) : Promise<void> {
    const promises = [];
    paths.forEach((path) => {
      promises.push(this.getFileMetaFunctionDefinition(path));
    });

    await Promise.all(promises);
  }

  private async getFileMetaFunctionDefinition (path : string) : Promise<void> {
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
  }
}