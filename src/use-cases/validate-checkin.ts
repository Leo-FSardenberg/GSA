import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkins-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import dayjs from "dayjs";

interface ValidateCheckinUseCaseReq {
  checkInId: string;
}

interface ValidateCheckinUseCaseRes {
  checkIn: CheckIn;
}

export class ValidateCheckinUseCase {
  constructor(private checkinsRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckinUseCaseReq): Promise<ValidateCheckinUseCaseRes> {
    const checkIn = await this.checkinsRepository.findById(checkInId);
    if (!checkIn) {
      throw new ResourceNotFound();
    }
    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      "minutes"
    );
    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new Error();
    }
    checkIn.validated_at = new Date();

    await this.checkinsRepository.save(checkIn);
    return {
      checkIn,
    };
  }
}
