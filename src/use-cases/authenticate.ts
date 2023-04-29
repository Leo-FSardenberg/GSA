import { usersRepository } from "@/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseReq {
  email: string;
  password: string;
}

interface AuthenticateUseCaseRes {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: usersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseReq): Promise<AuthenticateUseCaseRes> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }
    return {
      user,
    };
  }
}
