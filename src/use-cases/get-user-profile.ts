import { usersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFound } from "./errors/resource-not-found";

interface GetUserProfileUseCaseReq {
  userId: string;
}

interface GetUserProfileUseCaseRes {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseReq): Promise<GetUserProfileUseCaseRes> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFound();
    }

    return {
      user,
    };
  }
}
