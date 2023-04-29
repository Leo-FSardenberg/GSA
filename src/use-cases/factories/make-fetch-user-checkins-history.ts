import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { FetchUserCheckInsHistoryUseCase } from "../fetch-user-checkins-history";

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
