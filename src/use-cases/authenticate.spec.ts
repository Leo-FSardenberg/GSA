import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepo } from "@/repositories/in-memory/in-memory-usesrs-repo";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

let usersRepo: InMemoryUsersRepo;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepo = new InMemoryUsersRepo();
    sut = new AuthenticateUseCase(usersRepo);
  });

  it("should be able to register", async () => {
    await usersRepo.create({
      name: "Wrong Jeremy",
      email: "wrongjeremy@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "wrongjeremy@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });
  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({
        email: "wrongjeremy@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepo.create({
      name: "Wrong Jeremy",
      email: "wrongjeremy@example.com",
      password_hash: await hash("123456", 6),
    });
    await expect(
      sut.execute({
        email: "wrongjeremy@example.com",
        password: "123556",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
