import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { SearchListingDto } from './dto/search-listing.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) { }

  create(createListingDto: CreateListingDto) {
    const {apartmentId, apartment, ...listData} = createListingDto;

    if (apartmentId) {
      return this.prisma.listing.create({
        data: {
          ...listData,
          apartment: {
            connect: {id: apartmentId}
          }
        }
      });
    } else if(apartment){
      return this.prisma.listing.create({
        data: {
          ...listData,
          apartment: {
            create: apartment
          }
        }
      })
    }
  }

  async search(searchDto: SearchListingDto) {
    const { keyword, minPrice, maxPrice } = searchDto;
    const whereCondition: Prisma.ListingWhereInput = {};

    if (keyword) {
      whereCondition.OR = [
        { title: { contains: keyword, mode: 'insensitive' } }, // mode insensitive không phân biệt hoa hay thường
        { description: { contains: keyword, mode: 'insensitive' } }
      ];
    }
    // Chỉ xét nếu có 1 trong 2 cần tìm
    if (minPrice !== undefined || maxPrice !== undefined) {
      whereCondition.pricePerMonth = {}

      if (minPrice !== undefined) {
        whereCondition.pricePerMonth.gte = minPrice;
      }

      if (maxPrice !== undefined) {
        whereCondition.pricePerMonth.lte = maxPrice;
      }
    }
    
    const rawListings = await this.prisma.listing.findMany({
      where: whereCondition,
      include: {
        apartment: true,
      }
    });

    // Lọc dữ liệu cho Agent
    return rawListings.map(listing => ({
      id: listing.id,
      title: listing.title,
      description: listing.description,
      status: listing.listingStatus,

      // Ép kiểu từ String (Prisma Decimal) sang Number
      pricePerMonth: Number(listing.pricePerMonth),

      // Gộp dữ liệu căn hộ lên cùng một cấp cho gọn
      floor: listing.apartment.floor,
      area: Number(listing.apartment.area),
      apartmentStatus: listing.apartment.apartmentStatus,
    }))
  }

  async findAll() {
    return this.prisma.listing.findMany();
  }

  async findOne(id: string) {
    return this.prisma.listing.findUnique({
      where: {id},
    });
  }

  update(id: string, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: string) {
    return this.prisma.listing.delete({
      where: {id}
    });
  }
}
