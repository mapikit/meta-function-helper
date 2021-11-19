export const testThrow = (encapsulatedFunction : () => void) : { thrown : boolean; error : Error } => {
  let thrown = false;
  let error;

  try {
    encapsulatedFunction();
  } catch (e) {
    thrown = true;
    error = e;
  }

  return { thrown, error };
};
