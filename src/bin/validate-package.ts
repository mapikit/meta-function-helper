#!/usr/bin/env node

import { errorExit } from "./error-exit";
import { validatePackage } from "./validators";

const main = async () : Promise<void> => {
  await validatePackage();
};

main().catch(errorExit);
