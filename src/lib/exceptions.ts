export class DateNotFound extends Error {
  constructor(message: string = "Date not found.") {
    super(message);
    this.name = "DateNotFound";
  }
}

export class ResourceNotFound extends Error {
  constructor(message: string = "Resource not found.") {
    super(message);
    this.name = "ResourceNotFound";
  }
}
