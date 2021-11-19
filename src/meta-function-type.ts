import { ObjectDefinition } from "@meta-system/object-definition";

export interface MetaFunction extends FunctionDefinition {
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  entrypoint : string;
  mainFunction : string;
}

export interface FunctionDefinition {
  input : ObjectDefinition;
  output : ObjectDefinition;
  functionName : string;
  customTypes ?: CustomType[];
}

export interface CustomType {
  name : string;
  type : ObjectDefinition;
}
