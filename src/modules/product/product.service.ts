import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import ProductEntity from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>
  ) {}

  async create(product: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save(product)
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOne(id);
  }

  async update(id: number, productProperties: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);
    return this.productRepository.update(id, {...product, ...productProperties  })
  }

  async remove(id: number): Promise<any>  {
    return this.productRepository.delete(id);
  }
}
