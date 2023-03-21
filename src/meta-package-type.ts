import { FunctionDefinition } from "./meta-function-type.js";

export interface MetaPackage {
  name : string;
  description : string;
  author ?: string;
  version ?: string; // If present, must be SemVer and match package version
  functionsDefinitions : Array<string | FunctionDefinition>,
  entrypoint : string;
}

export interface BuiltMetaPackage {
  name : string;
  description : string;
  author ?: string;
  version ?: string; // If present, must be SemVer and match package version
  functionsDefinitions : Array<FunctionDefinition>,
  entrypoint : string;
}
