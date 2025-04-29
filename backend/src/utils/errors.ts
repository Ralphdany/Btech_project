export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, message, "Validation Error");
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string) {
    super(401, message, "Authentication Error");
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message, "Not Found");
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message, "Conflict");
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(500, message, "Database Error");
  }
}
