import { CheckIn } from "@prisma/client";
import { CheckInRepository } from "@/repositories/checkins-repository";
import { GymsRepository } from "@/repositories/gyms-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckinUseCaseReq {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckinUseCaseRes {
  checkIn: CheckIn;
}

export class CheckinUseCase {
  constructor(
    private checkinsRepository: CheckInRepository,
    private gymsRepository: GymsRepository
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckinUseCaseReq): Promise<CheckinUseCaseRes> {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) {
      throw new ResourceNotFound();
    }
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
    );
    const maxDistanceM = 100;

    if (distance > maxDistanceM) {
      throw new Error();
    }

    const checkInOnSameDate = await this.checkinsRepository.findByUserIdOnDate(
      userId,
      new Date()
    );
    if (checkInOnSameDate) {
      throw new Error();
    }
    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return {
      checkIn,
    };
  }
}
