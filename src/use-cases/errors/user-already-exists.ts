export class UserAlreadyExistsError extends Error {
  constructor() {
    super("An user with that e-mail already exists");
  }
}
