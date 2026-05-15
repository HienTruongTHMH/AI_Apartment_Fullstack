import { ApartmentStatus, ApartmentTypes, ListingStatus } from "@prisma/client";
import { Type } from "class-transformer";
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsUUID, IsInt, ValidateNested } from "class-validator";

class ApartmentDto {
    @IsUUID()
    ownerId!: string

    @IsInt()
    floor!: number;

    @IsNumber()
    area!: number;

    @IsEnum(ApartmentStatus)
    apartmentStatus!: ApartmentStatus;

    @IsNumber()
    bedroom?: number;

    @IsNumber()
    livingroom?: number;

    @IsNumber()
    bathroom?: number

    @IsEnum(ApartmentTypes)
    apartmetType!:  ApartmentTypes
}
export class CreateListingDto {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    description!: string;

    @IsNumber()
    @IsNotEmpty()
    pricePerMonth!: number;
    
    @IsEnum(ListingStatus)
    listingStatus!: ListingStatus;

    @IsString()
    image! : string;

    @IsUUID()
    @IsNotEmpty()
    apartmentId!: string;

    @ValidateNested()
    @Type(() => ApartmentDto) 
    apartment?: ApartmentDto
}
