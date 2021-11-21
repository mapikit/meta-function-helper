import { isFunctionDefinition } from "./is-function-definition";
import { BuiltMetaPackage } from "./meta-package-type";
import { validateFunctionDefinitionConfiguration } from "./validate-configuration";

export class ValidateMetaPackageFunctionDefinition {
  public constructor (
    private readonly packageConfig : BuiltMetaPackage,
  ) {}

  public async execute () : Promise<void> {
    const functionsDefinitions = this.packageConfig.functionsDefinitions;

    functionsDefinitions
      .forEach((functionDef) => {
        isFunctionDefinition(functionDef);

        validateFunctionDefinitionConfiguration(functionDef);
      });
  }
};
