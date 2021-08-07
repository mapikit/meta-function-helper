# Meta Function Helper
A helper to validate your configurations while developing a custom function for Meta-System

----

This project was created to provide a way for developers who want to create their own plugins for the Mapikit's Meta System to validate their plugin metadata schema beforehand.

The functionality provided here is also used internally to validate the `meta-function.json` file again in the Meta-System repository, so the validations happens on two ends with the same validator.

## How to use it
This program can be used either as a project dependency with this, or as a CLI tool.

To use it as a dependency you can install it using NPM with `npm i meta-function-helper`. If you use Typescript, this project comes with type declaration built in.

In order to use it as a CLI, install it globally with `npm i -g meta-function-helper`, then validate your function or package files with the next steps.

### Validating Standalone Functions
After successfuly installed, just run `meta-function-check` at the root of your project, where your `meta-function.json` file should be.

### Validating Packages
After installing, run `meta-package-check` at the root of your project, where your `meta-package.json` file is expected to be.

> Note: You may use the property `functionDefinitions` of the package configuration with either paths to `meta-function.json`, or the configurations themselves, or even a combination of both. If using paths, include the file name and format. Also, they may be absolute or relative to the path where you ran the **meta-package-check** command.
