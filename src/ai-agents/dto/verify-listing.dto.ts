// verify-listing.dto.ts
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Type } from "class-transformer";

export class VerifyListingDto {
    @IsString()
    @IsNotEmpty({ message: 'Thiếu ID căn hộ' })
    apartmentId!: string;

    @IsString()
    @IsNotEmpty({ message: 'Thiếu ID chủ nhà' })
    ownerId!: string;

    // --- CÁC TRƯỜNG DỮ LIỆU TỪ FORM FRONTEND ---
    @IsString()
    @IsNotEmpty({ message: 'Tiêu đề không được để trống' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'Mô tả không được để trống' })
    description!: string;

    @IsString()
    pricePerMonth!: string;

    @IsString()
    room_number!: string;

    @IsString()
    floor!: string;

    @IsString()
    area!: string;

    @IsString()
    district!: string;

    @IsString()
    fullAddress!: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    bedroom!: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    bathroom!: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    livingroom!: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    kitchen!: number;

    @IsString()
    type!: string;

    // --- ẢNH GỬI LÊN ---
    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    imageUrls?: string[];
}