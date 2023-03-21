#!/usr/bin/env node

import { errorExit } from "./error-exit.js";
import { validatePackage } from "./validators.js";

const main = async () : Promise<void> => {
  await validatePackage();
};

main().catch(errorExit);
