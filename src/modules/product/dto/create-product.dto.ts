import { IsBoolean, IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsBoolean()
  outOfStock: boolean;
}
