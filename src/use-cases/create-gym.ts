import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface createGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}
interface createGymUseCaseReposne {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude,
  }: createGymUseCaseRequest): Promise<createGymUseCaseReposne> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });
    return { gym };
  }
}
