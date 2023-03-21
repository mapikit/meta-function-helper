import { getAllTypesInDefinition, ObjectDefinition } from "@meta-system/object-definition";
import { error, highlight } from "./chalk-formatting.js";
import { ValidationErrorCodes } from "./error-codes.js";
import { CustomType, FunctionDefinition } from "./meta-function-type.js";

/**
 * Class to validate the rules of the schema of a Meta Function json configuration.
 */
export class MetaCustomTypesValidation {
  private customTypesNames : string[] = [];
  private metaFunctionData : FunctionDefinition;

  public constructor (metaFunctionData : FunctionDefinition) {
    if (metaFunctionData.customTypes !== undefined) {
      metaFunctionData.customTypes.forEach((customType) => {
        this.customTypesNames.push("$" + customType.name);
      });
    } else {
      metaFunctionData.customTypes = [];
    }

    this.metaFunctionData = metaFunctionData;
  }

  public execute () : void {
    this.metaFunctionData.customTypes.forEach((customTypeDefinition) => {
      this.checkCustomTypeLinearity(customTypeDefinition, []);
      this.checkObjectType(customTypeDefinition.type);
    });

    if (this.metaFunctionData.input !== undefined) {
      this.checkObjectType(this.metaFunctionData.input);
    }

    if (this.metaFunctionData.output !== undefined) {
      this.checkObjectType(this.metaFunctionData.output);
    }
  }

  private checkObjectType = (input : ObjectDefinition) : void => {
    const typesList = Object.values(input)
      .map((typeDefinition) => typeDefinition.type);

    typesList.forEach((type) => {
      if (this.isCustomType(type)) {
        return this.validateCustomType(type);
      }
    });
  };

  private isCustomType (input : string) : boolean {
    return input[0] === "$";
  }

  private validateCustomType (input : string) : void {
    if (!this.customTypesNames.includes(input)) {
      throw Error(error(ValidationErrorCodes.missingCustomType) + ` - "${highlight(input)}"`);
    }
  }

  /** Checks if there is no loop reference on the given custom type */
  // eslint-disable-next-line max-lines-per-function
  private checkCustomTypeLinearity (typeToValidate : CustomType, currentReferenceChain : string[] = []) : void {
    const referenceChain = currentReferenceChain;

    if (referenceChain.includes(typeToValidate.name)) {
      throw Error(ValidationErrorCodes.loopCustomType);
    }

    referenceChain.push(typeToValidate.name);
    const types = getAllTypesInDefinition(typeToValidate.type);
    const customObjectTypes = types.filter((propertyDeclaration) => propertyDeclaration[0] === "$");

    customObjectTypes.forEach((type) => {
      if (type[0] === "$") {
        this.validateCustomType(type);
        const referencedCustomType = this.metaFunctionData.customTypes.find((typeDefinition) =>
          typeDefinition.name === type.substring(1));

        return this.checkCustomTypeLinearity(referencedCustomType, referenceChain);
      }
    });
  }
}
