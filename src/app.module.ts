import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql',
      database: 'nestjs-testprj',
      entities: [],
      synchronize: true, //PROD-WARNING: Only for development, disable in production
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
