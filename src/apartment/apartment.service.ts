import { Injectable } from '@nestjs/common';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApartmentStatus } from '@prisma/client';

@Injectable()
export class ApartmentService {
  constructor(private readonly prisma: PrismaService) {
  }

  create(createApartmentDto: CreateApartmentDto) {

    return this.prisma.apartment.create({
      data: createApartmentDto
    });
  }

  findAll() {
    return `This action returns all apartment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} apartment`;
  }

  update(id: number, updateApartmentDto: UpdateApartmentDto) {
    return `This action updates a #${id} apartment`;
  }

  remove(id: number) {
    return `This action removes a #${id} apartment`;
  }
}
