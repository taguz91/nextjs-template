export class ServerError extends Error {}

export class UnprocesableDataError extends Error {
  errors: Record<string, string[]>;
  summary;

  constructor(errors: Record<string, string[]>, summary: string[]) {
    super('Los datos enviados no son correctos.');
    this.errors = errors;
    this.summary = summary;
  }
}

export class NotFoundError extends Error {}

export class UnauthorizedError extends Error {}

export class ForbiddenException extends Error {}
