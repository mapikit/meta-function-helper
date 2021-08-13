import { BuiltMetaPackage } from "./meta-package-type";
import { validateStringConfiguration } from "./validate-string-configuration";

export class ValidateMetaPackageFunctionDefinition {
  public constructor (
    private readonly packageConfig : BuiltMetaPackage
  ) {}

  public async execute () : Promise<void> {
    const functionsDefinitions = this.packageConfig.functionsDefinitions;
    
    functionsDefinitions
      .forEach((functionDef) => {
        validateStringConfiguration(JSON.stringify(functionDef), true);
      });
  }
}