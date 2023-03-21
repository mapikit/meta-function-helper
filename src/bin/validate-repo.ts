#!/usr/bin/env node

import { errorExit } from "./error-exit.js";
import { validateFunction } from "./validators.js";

const main = async () : Promise<void> => {
  await validateFunction();
};

main().catch(errorExit);
