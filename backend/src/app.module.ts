import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockMovementsModule } from './stock-movements/stock-movements.module';
import {dataSourceOptions} from './data-source';
import {ConfigModule} from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ProductsModule,
    CategoryModule,
    StockMovementsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
