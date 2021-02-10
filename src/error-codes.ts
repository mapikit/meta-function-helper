export enum ValidationErrorCodes {
  V00 = "V00 - Could not read file",
  V01 = "V01 - Mentioned Author must be a String",
  V02 = "V02 - Package Version is not a valid SemVer",
  V03 = "V03 - No Description for the function has been provided",
  V04 = "V04 - No entrypoint for the function was given",
  V05 = "V05 - No Main Function has been provided",
  V06 = "V06 - CustomTypes must be an Array",
  V07 = "V07 - Output Data must be an Array",
  V08 = "V08 - Output Branches must be an Array",
  V09 = "V09 - Input Parameters must be an Array",
}