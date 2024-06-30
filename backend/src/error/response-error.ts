export class ResponseError extends Error {
  constructor(public status: number = 500, public message: string) {
    super(message);
    this.status = status;
  }
}
