import { PartialType } from '@nestjs/mapped-types';
import { CreateListingDto } from './create-listing.dto';

import {ListingStatus } from "@prisma/client";
import { IsString, IsNumber, IsEnum, IsNotEmpty, IsUUID} from "class-validator";

export class UpdateListingDto extends PartialType(CreateListingDto) {
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
}
