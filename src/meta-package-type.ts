import { MetaFunction } from "./meta-function-type";

export interface MetaPackage {
  name : string;
  description : string;
  author ?: string;
  version : string; // Must be SemVer
  functionsDefinitions: Array<string | MetaFunction>,
  entrypoint : string;
}