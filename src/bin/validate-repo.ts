#!/usr/bin/env node

import { errorExit } from "./error-exit";
import { validateFunction } from "./validators";

const main = async () : Promise<void> => {
  await validateFunction();
};

main().catch(errorExit);
