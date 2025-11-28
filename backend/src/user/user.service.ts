import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcryptjs';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.prisma.user?.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new ConflictException('Email already exists');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const data: Prisma.UserCreateInput = {
      email: dto.email,
      passwordHash,
      isAdmin: dto.isAdmin ?? true,
    };

    const user = await this.prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
