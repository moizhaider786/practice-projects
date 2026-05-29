import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StockMovement } from './stock-movement.entity';
import { StockMovementDto } from './dto/stock-movement.dto';
import { StockMovementType } from 'src/types';
@Injectable()
export class StockMovementsService {
    constructor(
        @InjectRepository(StockMovement)
        private readonly stockMovementRepository: Repository<StockMovement>
    ) {}

    async stockIn(stockInDto: StockMovementDto){
        const stockMovement = this.stockMovementRepository.create({
            productId: stockInDto.productId,
            quantity: stockInDto.quantity,
            unitPrice: stockInDto.unitPrice,
            reason: stockInDto.reason,
            referenceNote: stockInDto.referenceNote,
            type: StockMovementType.IN,
        });
        return await this.stockMovementRepository.save(stockMovement);
    }
    async stockOut(stockOutDto: StockMovementDto){
        const stockMovement = this.stockMovementRepository.create({
            productId: stockOutDto.productId,
            quantity: stockOutDto.quantity,
            unitPrice: stockOutDto.unitPrice,
            reason: stockOutDto.reason,
            referenceNote: stockOutDto.referenceNote,
            type: StockMovementType.OUT,
        });
        return await this.stockMovementRepository.save(stockMovement);
    }
}
