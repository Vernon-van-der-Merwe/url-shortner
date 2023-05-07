export const config = {
    createUrl: {
      initialValues: {
        name: "",
        originalUrl: "",
      },
  
      validate: {
        name: (val) =>
          val.length <= 2 ? "Name should be longer than 2 characters" : null,
        originalUrl: (val) =>
          val.length <= 3 ? "originalUrl should be longer than 3 characters" : null,
      },
    }
  };
  