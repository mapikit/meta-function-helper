import { isMetaFunction } from "./src/is-meta-function";
import { ValidationErrorCodes } from "./src/error-codes";
import { MetaCustomTypesValidation } from "./src/custom-types-validation";
import { validateStringConfiguration } from "./src/validate-string-configuration";

import { MetaFunction,
  AcceptedTypes,
  CustomType,
  OutputBranches,
  OutputData,
  InputParameters
} from "./src/meta-function-type";

export { MetaFunction,
  AcceptedTypes,
  CustomType,
  OutputBranches,
  OutputData,
  InputParameters
}

export default {
  validateStringConfiguration,
  MetaCustomTypesValidation,
  isMetaFunction,
  ValidationErrorCodes
}

