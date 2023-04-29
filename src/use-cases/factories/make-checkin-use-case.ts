import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckinUseCase } from "../checkin";

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckinUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
