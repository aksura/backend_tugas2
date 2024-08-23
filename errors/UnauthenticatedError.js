class UnauthenticatedError extends Error {
    constructor(message = "Unauthenticated") {
      super(message);
      this.statusCode = 401;
      this.name = "Unauthorized";
    }
  }
  
  module.exports = UnauthenticatedError;