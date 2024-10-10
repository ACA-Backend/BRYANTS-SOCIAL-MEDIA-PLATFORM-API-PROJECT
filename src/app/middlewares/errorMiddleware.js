import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
    TooManyRequestsError,
    ForbiddenError,
    UnauthorizedError,
    ValidationError,
  } from "../../lib/error-definitions.js";
  
  const errorMiddleware = (err, req, res, next) => {
    // Setting the status code default to 500 for unknown errors
    const statusCode = err.statusCode || 500;
  
    if (
      err instanceof NotFoundError ||
      err instanceof BadRequestError ||
      err instanceof UnauthorizedError ||
      err instanceof ForbiddenError ||
      err instanceof InternalServerError ||
      err instanceof TooManyRequestsError ||
      err instanceof ConflictError
    ) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), 
      });
    }
  
    // Special handling for ValidationError with its 'errors' field
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        errors: err.errors,  
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),  
      });
    }
  
    // For other types of errors or unrecognized ones, return 500
    return res.status(statusCode).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), 
    });
  };
  
  export default errorMiddleware;
  