import { error, highlight } from "./chalk-formatting";
import { ValidationErrorCodes } from "./error-codes";
import { CustomType, MetaFunction } from "./meta-function-type";
import { getAllTypesInDefinition } from "./object-definition/get-all-types-in-definition";
import { ObjectDefinition } from "./object-definition/object-definition-type";

/**
 * Class to validate the rules of the schema of a Meta Function json configuration.
 */
export class MetaCustomTypesValidation {
  private customTypesNames : string[] = [];
  private metaFunctionData : MetaFunction;

  public constructor (metaFunctionData : MetaFunction) {
    metaFunctionData.customTypes.forEach((customType) => {
      this.customTypesNames.push("$" + customType.name);
    });

    this.metaFunctionData = metaFunctionData;
  }

  public execute () : void {
    this.metaFunctionData.customTypes.forEach((customTypeDefinition) => {
      this.checkCustomTypeLinearity(customTypeDefinition, []);
      this.checkObjectType(customTypeDefinition.type)
    });

    this.metaFunctionData.inputParameters.forEach(this.checkObjectType);
    this.metaFunctionData.outputData.forEach(this.checkObjectType);
  }

  private checkObjectType = (input : ObjectDefinition) => {
    if (this.isCustomType(input.type.type)) {
      return this.validateCustomType(input.type.type);
    }

    this.validateNormalType(input.type.type);
  };

  private isCustomType (input : string) : boolean {
    return input[0] === "$";
  }

  private validateCustomType (input : string) : void {
    if (!this.customTypesNames.includes(input)) {
      throw Error(error(ValidationErrorCodes.V24) + ` - "${highlight(input)}"`);
    }
  }

  private validateNormalType (input : string) : void {
    const validNormalTypes = ["string", "boolean", "number", "date", "array.number",
      "array.string", "array.boolean", "array.date", "array.cloudedObject", "cloudedObject",
      "array.any", "any"
    ];

    if (!validNormalTypes.includes(input)) {
      throw Error(error(ValidationErrorCodes.V26) + ` - "${highlight(input)}"`);
    }
  }

  /** Checks if there is no loop reference on the given custom type */
  private checkCustomTypeLinearity (typeToValidate : CustomType, currentReferenceChain : string[] = []) : void {
    const referenceChain = currentReferenceChain;

    if (referenceChain.includes(typeToValidate.name)) {
      throw Error(ValidationErrorCodes.V25);
    }

    referenceChain.push(typeToValidate.name);

    const types = getAllTypesInDefinition(typeToValidate.type)
    
    const customObjectTypes = types.filter((propertyDeclaration) => propertyDeclaration[0] === "$")

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
