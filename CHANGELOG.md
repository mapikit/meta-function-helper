# Releases
## 0.3.0 Overhaul interface and extract ObjectDefinition to a separate package
This big release overhauls a lot of the API we had to validate and verify, while also delivering a cleaner and refactored code. Of all the changes there were a lot of things moved and renamed, and a couple of new stuff:

Starting this version, this package will be published to `@meta-system/meta-function-helper` instead of just `meta-function-helper`.

### NEW
- Added a function to get a class from a js file `getClassConstructor`;
- Added a function to get the json data from a `.json` file `getDescriptorFileContent`;
- Added tests! :D

### Changed
- `"inputParameters"` and `"outputData"` were changed to `"input"` and `"output"` respectively. THIS IS NOT BACKWARDS COMPATIBLE.
- Now the validation functions accepts `unknown` as the input type, instead of `string`. They were renamed accordingly.

## 0.2.3 - Make Input Parameters and Output Data Mandatory
- MAIN CHANGE: Now `"inputParameters"` and `"outputData"` are mandatory. This is to users of functions know if the function has no input/output explicitly.

## 0.2.2 - Build Package full configuration
Now there is a function exported to build the full configuration of a package, since you can specify functions on a different file.

## 0.2.1 - Packages Entrypoint
- MINOR CHANGE: Packages now need to have a specified entrypoint to be valid.

## 0.2 - Packages
This release adds support for validating packages and their functions altogether. Instructions on how to use this are in the README of the project.

Alongside this, there were some bugs solved in the function validation process.

## 0.1.1 - Added Function As a Valid Accepted Type
This enables the creation of flow-controlling and side-effects-controlling meta-functions!

- MINOR CHANGE: Now meta-functions do not need to specify an output value for them, as they may be required only as a functional dependency.
- MAIN CHANGE: Now meta-functions may accept another functions as an input. An important aspect is that functions recieved do not share their return type, so creators of meta-functions may treat errors and assert types.
## 0.1.0 - Ovberhauled type definition
**NOTE** - This is incompatible with previous versions of the library, so upgrading requires rewriting your current `meta-function.json` file.
- MAIN CHANGE - Now type definitions are standardized throughout the whole library. No more learning to define the types for inputs, outputs, and custom types.
- MAIN CHANGE - Removed branch definition. You no longer specify code branching. Although branching may still happens, if it is the case that you need to have multiple different outputs, type them as a type union of all the possible types your function branches out to.
- MAIN CHANGE - Now both `inputParameters` and `customTypes` are optional properties in the `meta-function.json` file.

## 0.0.10 - Added `any` As A Valid Type
- Now BOps functions may return and accept any type as a parameter.

## 0.0.9 - Added `array.any` As A Valid Type
- Now BOps functions may return and accept as a parameter arays of any kind.

## 0.0.8 - Added `array.cloudedObject` As A Valid Type
- Now BOps functions may return an unknown object array.

#### 0.0.7 - No code Changes - Package.json small fix

## 0.0.6 - Fix package.json
- Package json was pointing the main file in the wrong folder.

## 0.0.5 - Export types
- Now the library also exports the types for a valid `meta-function.json`.

## 0.0.4 - Validate Branch Data & Clouded Objects
- New validation for presence of data in every branch. Now every branch must have some data bound to it.
- New Type : `"cloudedObject"` - for when the type is an object, but with unknown properties and keys.
- Bugfix : Custom types properties are now also verified for their name uniqueness.

## 0.0.3 - Name Uniqueness Validation
- Now the program validates the names of all structures in the arrays of the provided file. All of the names must be unique.

## 0.0.2 - Bugfixes
- Fixes the validation of items in the `"outputBranches"` array. It must contain elements.
- Fixes the error displayed when validating  the `"type"` of an `"inputParameters"` element. It used to report an `undefined` error, but now it reports a proper message.

## 0.0.1 - Initial Release
Contains the base functionality for supporting the development of custom functions for building systems using Meta System.