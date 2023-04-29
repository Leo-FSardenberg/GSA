import {} from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkins-repository";

interface GetUserMetricsUseCaseReq {
  userId: string;
}

interface GetUserMetricsUseCaseRes {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: CheckInRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseReq): Promise<GetUserMetricsUseCaseRes> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);
    return {
      checkInsCount,
    };
  }
}
