export interface IRawListingImageInput {
  image_id: string;
  url?: string;
  base64_data?: string;
  media_type?: string;
}

export interface IRawListingInput {
  owner_id: string;
  rawText: string;
  images: IRawListingImageInput[];
  db_apartment_data?: {
    id: string;
    area: number;
    floor: number;
    room_number: number;
    note: string;
  };
}