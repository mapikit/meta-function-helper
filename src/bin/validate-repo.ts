#!/usr/bin/env node

import { processing } from "../chalk-formatting";
import { validateMetaFunctionConfiguration } from "../validate-configuration";
import { logVersion } from "./log-version";
import { getDescriptorFileContent } from "../get-file";
import { errorExit } from "./error-exit";

const main = async () : Promise<void> => {
  await logVersion();

  console.log(processing("Starting validation of the \"meta-function.json\" file...\n"));

  const fileContent = await getDescriptorFileContent("./", "meta-function.json")
    .catch(errorExit);

  try { validateMetaFunctionConfiguration(fileContent); }
  catch (err) { errorExit(err); };
};

main().catch(errorExit);
