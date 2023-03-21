import { isFunctionDefinition } from "./is-function-definition.js";
import { BuiltMetaPackage } from "./meta-package-type.js";
import { validateFunctionDefinitionConfiguration } from "./validate-configuration.js";

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
