import { compare } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUsersRepo } from "@/repositories/in-memory/in-memory-usesrs-repo";
import { UserAlreadyExistsError } from "./errors/user-already-exists";

let usersRepo: InMemoryUsersRepo;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepo = new InMemoryUsersRepo();
    sut = new RegisterUseCase(usersRepo);
  });
  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const usersRepo = new InMemoryUsersRepo();
    const registerUseCase = new RegisterUseCase(usersRepo);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register the same email twice", async () => {
    const usersRepo = new InMemoryUsersRepo();
    const registerUseCase = new RegisterUseCase(usersRepo);
    const email = "johndoe@example.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      registerUseCase.execute({
        name: "John Doe",
        email,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
