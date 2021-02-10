export interface MetaFunction {
  functionName : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  inputParameters : InputParameters[];
  outputBranches : [];
  outputData : [];
  entrypoint : string;
  mainFunction : string;
  customTypes : CustomType[]
}

/**
 * It is either one of the especified strings, or it must be a
 * defined customType, referenced by `$typeName`
 */
export type AcceptedTypes = "string" |
  "number" | "boolean" | "date" |
  "array.string" | "array.number" | "array.boolean" | "array.date" | string

export interface CustomType {
  name : string;
  properties : { name : string; type : AcceptedTypes }[]
}

export interface InputParameters {
  name : string;
  description ?: string;
  type : AcceptedTypes;
  required ?: boolean;
  group ?: string;
}

export interface OutputBranches {
  branchName : string;
  description ?: string;
}

export interface OutputData {
  name : string;
  branch ?: string;
  type : AcceptedTypes;
}
