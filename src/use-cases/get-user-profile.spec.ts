import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryUsersRepo } from "@/repositories/in-memory/in-memory-usesrs-repo";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFound } from "./errors/resource-not-found";

let usersRepo: InMemoryUsersRepo;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepo = new InMemoryUsersRepo();
    sut = new GetUserProfileUseCase(usersRepo);
  });

  it("should be able to get user's profile", async () => {
    const newUser = await usersRepo.create({
      name: "Wrong Jeremy",
      email: "wrongjeremy@example.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: newUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual("Wrong Jeremy");
  });
  it("should not be able to get user profile with incorrect id", async () => {
    await expect(
      sut.execute({
        userId: "some bs",
      })
    ).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
