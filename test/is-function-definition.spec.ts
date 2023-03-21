import { expect } from "chai";
import { isFunctionDefinition } from "../src/is-function-definition.js";
import { testThrow } from "./helpers/test-throw.js";

describe("isFunctionDefinition Tests", () => {
  it("Passes validation for a correclty formatted functionDefinition", () => {
    const object = {
      functionName: "test-func",
      input: {}, // No need to test this - external package already tested
      output: {}, // This one too
      customTypes: [
        {
          name: "testType",
          type: {},
        },
      ],
    };

    const result = testThrow(() => isFunctionDefinition(object));
    expect(result.thrown).to.be.false;
  });

  it("Fails validation - missing Name", () => {
    const object = {
      input: {},
      output: {},
      customTypes: [
        {
          name: "testType",
          type: {},
        },
      ],
    };

    const result = testThrow(() => isFunctionDefinition(object));
    expect(result.thrown).to.be.true;
  });

  it("Fails validation - missing input", () => {
    const object = {
      functionName: "test-func",
      output: {},
      customTypes: [
        {
          name: "testType",
          type: {},
        },
      ],
    };

    const result = testThrow(() => isFunctionDefinition(object));
    expect(result.thrown).to.be.true;
  });

  it("Fails validation - missing output", () => {
    const object = {
      functionName: "test-func",
      input: {},
      customTypes: [
        {
          name: "testType",
          type: {},
        },
      ],
    };

    const result = testThrow(() => isFunctionDefinition(object));
    expect(result.thrown).to.be.true;
  });

  it("Fails validation - customType missing name", () => {
    const object = {
      functionName: "test-func",
      input: {},
      output: {},
      customTypes: [
        {
          type: {},
        },
      ],
    };

    const result = testThrow(() => isFunctionDefinition(object));
    expect(result.thrown).to.be.true;
  });

  it("Fails validation - customType missing type", () => {
    const object = {
      functionName: "test-func",
      input: {},
      output: {},
      customTypes: [
        {
          name: "something",
        },
      ],
    };

    const result = testThrow(() => isFunctionDefinition(object));
    expect(result.thrown).to.be.true;
    expect(result.error.message).to.contain("should be an object");
  });
});
