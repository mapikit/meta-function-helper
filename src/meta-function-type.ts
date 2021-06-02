import { ObjectDefinition } from "./object-definition/object-definition-type";

export interface MetaFunction {
  functionName : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  inputParameters ?: ObjectDefinition[];
  outputData : ObjectDefinition[];
  entrypoint : string;
  mainFunction : string;
  customTypes : CustomType[];
}

/**
 * It is either one of the especified strings, or it must be a
 * defined customType, referenced by `$typeName`
 */
export type AcceptedTypes = "string" |  "number" | "boolean" | "date" |
  "array.string" | "array.number" | "array.boolean" | "array.date" |
  "array.cloudedObject" | "cloudedObject" | "array.any" | "any" | string

export interface CustomType {
  name : string;
  type : ObjectDefinition;
}
