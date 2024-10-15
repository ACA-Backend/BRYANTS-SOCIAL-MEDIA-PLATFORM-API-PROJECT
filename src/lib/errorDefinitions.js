
export class BadRequestError extends Error {
    constructor(message , errors) {
      super(message);
      this.errors = errors;
      this.statusCode = 400;
    }
  }
  
  export class UnauthorizedError extends Error {
    constructor(message , errors) {
      super(message);
      this.errors = errors;
      this.statusCode = 401;
    }
  }
  
  export class ForbiddenError extends Error {
    constructor(message , errors) {
      super(message);
      this.errors = errors;
      this.statusCode = 403;
    }
  }
  
  export class NotFoundError extends Error {
    constructor(message , errors) {
      super(message);
      this.errors = errors;
      this.statusCode = 404;
    }
  }
  
  export class ConflictError extends Error {
    constructor(message , errors) {
      super(message);
      this.errors = errors;
      this.statusCode = 409;
    }
  }
  
  export class UnprocessableEntityError extends Error {
    constructor(message , errors) {
      super(message);
      this.errors = errors;
      this.statusCode = 422;
    }
  }
  
  export class InternalServerError extends Error {
    constructor(message , errors) {
        super(message);
        this.errors = errors;
        this.statusCode = 500;
    }
  }

  export class TooManyRequestsError extends Error {
    constructor(message , errors) {
        super(message);
        this.errors = errors;
        this.statusCode = 429;
    }
  }

  export class ValidationError extends Error {
    constructor( message , errors) {
        super( message );
        this.errors = errors;
        this.statusCode = 422;
    }
}