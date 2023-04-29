import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkins-repository";

interface FetchUserCheckInsHistoryUseCaseReq {
  userId: string;
  page: number;
}

interface FetchUserCheckInsHistoryUseCaseRes {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoryUseCaseReq): Promise<FetchUserCheckInsHistoryUseCaseRes> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    );
    return {
      checkIns,
    };
  }
}
