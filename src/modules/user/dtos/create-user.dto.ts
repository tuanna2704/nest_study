import { DepartmentCategory } from "src/enums/department-category.enum"; 'src/enums/department-category.enum'
import { IsBoolean, IsEmail, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  department: DepartmentCategory;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsBoolean()
  isActive: boolean;
}