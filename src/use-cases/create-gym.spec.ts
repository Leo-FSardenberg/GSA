import { InMemoryGymsRepo } from "@/repositories/in-memory/in-memory-gyms-repo";
import { CreateGymUseCase } from "./create-gym";
import { beforeEach, expect, describe, it } from "vitest";

let gymsRepo: InMemoryGymsRepo;
let sut: CreateGymUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    gymsRepo = new InMemoryGymsRepo();
    sut = new CreateGymUseCase(gymsRepo);
  });
  it("should be able to register gym", async () => {
    const { gym } = await sut.execute({
      title: "test gym",
      description: null,
      phone: null,
      latitude: -22.8745974,
      longitude: -42.0336158,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
