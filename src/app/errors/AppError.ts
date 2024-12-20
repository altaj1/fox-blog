class AppError extends Error {
  public statusCode: number;
  constructor(statuCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statuCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
