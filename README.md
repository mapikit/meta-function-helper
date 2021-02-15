# Meta Function Helper
A helper to validate your configurations while developing a custom function for Meta-System

----

This project was created to provide a way for developers who want to create their own plugins for the Mapikit's Meta System to validate their plugin metadata schema beforehand.

The functionality provided here is also used internally to validate the `meta-function.json` file again in the Meta-System repository, so both the validation happens on two ends with the same validator.

## How to use it
This program can be used either as a project dependency with this, or as a CLI tool.

To use it as a dependency you can install it using NPM with `npm i meta-function-helper`. If you use Typescript, this project comes with type declaration built in.

To use it as a CLI, you may install it globally also using npm: `npm i -g meta-function-helper`. After it, just run `meta-function-check` at the root of your project, where your `meta-function.json` file should be.
