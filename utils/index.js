const { validationResult } = require("express-validator");
exports.checkValidation = (req) => {
  let errObj = {};
  const isError = validationResult(req);
  if (isError?.errors.length > 0) {
    isError.errors.map((err) => {
      errObj[err.path] = err.msg;
    });
    return errObj;
  } else return null;
};
