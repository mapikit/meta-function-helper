import { expect } from "chai";
import { validatePackage } from "../src/bin/validators";
import { asyncTestThrow } from "./helpers/test-throw";

describe("Validate Package - Bin", () => {
  const validPackagePath = "./test/test-files/valid-package/";
  const invalidPackagePath = "./test/test-files/invalid-packages/";

  it("Gets and validates successfully a valid package", async () => {
    // The validate package has a file dependency
    const result = await asyncTestThrow(
      async () => { await validatePackage(validPackagePath); });

    expect(result.thrown).to.be.false;
  });

  it("Gets and validates a faulty package - missing name", async () => {
    const result = await asyncTestThrow(
      async () => { await validatePackage(invalidPackagePath + "missing-name"); });

    expect(result.thrown).to.be.true;
    expect(result.error.message).to.include("Package name");
  });

  it("Gets and validates a faulty package - missing description", async () => {
    const result = await asyncTestThrow(
      async () => { await validatePackage(invalidPackagePath + "missing-description"); });

    expect(result.thrown).to.be.true;
    expect(result.error.message).to.include("Package Description");
  });

  it("Gets and validates a faulty package - Version not SemVer", async () => {
    const result = await asyncTestThrow(
      async () => { await validatePackage(invalidPackagePath + "version"); });

    expect(result.thrown).to.be.true;
    expect(result.error.message).to.include("Version must be a SemVer");
  });

  it("Gets and validates a faulty package - missing entrypoint", async () => {
    const result = await asyncTestThrow(
      async () => { await validatePackage(invalidPackagePath + "missing-entrypoint"); });

    expect(result.thrown).to.be.true;
    expect(result.error.message).to.include("Entrypoint");
  });
});
