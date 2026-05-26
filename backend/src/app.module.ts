import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category/category.entity';
import { Product } from './products/product.entity';
import { StockMovement } from './stock-movements/stock-movement.entity';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'nest-practiceprj',
      entities: [Category, Product, StockMovement],
      synchronize: true, //PROD-WARNING: Only for development, disable in production
    }),
    ProductsModule,
    CategoryModule,
    StockMovementsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
