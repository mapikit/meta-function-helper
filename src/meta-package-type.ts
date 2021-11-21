import { FunctionDefinition } from "./meta-function-type";

export interface MetaPackage {
  name : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  functionsDefinitions : Array<string | FunctionDefinition>,
  entrypoint : string;
}

export interface BuiltMetaPackage {
  name : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  functionsDefinitions : Array<FunctionDefinition>,
  entrypoint : string;
}
