import HttpError from "./HttpError.js";

export const errorHelper = (error) => {
  if (error.status && error.message) {
    return HttpError(error.status, error.message);
  } else if (error.status) {
    return HttpError(error.status);
  } else if (error.message) {
    return HttpError(500, error.message);
  } else {
    return HttpError(500);
  }
};
