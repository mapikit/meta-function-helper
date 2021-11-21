export const errorExit = (error : Error) : void => {
  console.log("Could not pass package file validation due to error below:");
  console.log(error.message);
  console.error(error);

  process.exit(1);
};
