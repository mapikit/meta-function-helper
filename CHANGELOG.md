# Releases
## 0.0.8 - Added `array.cloudedObject` As A Valid Type
- Now BOps functions may return an unknown object array

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