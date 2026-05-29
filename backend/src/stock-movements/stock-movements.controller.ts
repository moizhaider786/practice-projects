import { Controller, Post, Body } from '@nestjs/common';
import { StockMovementsService } from './stock-movements.service';
import {StockMovementDto} from './dto/stock-movement.dto';
@Controller('stock-movements')
export class StockMovementsController {
    constructor(private readonly stockMovementsService: StockMovementsService) {}

    @Post('in')
    async stockIn(@Body() stockInDto: StockMovementDto) {
        const res = await this.stockMovementsService.stockIn(stockInDto);
        return {
            message: 'Stock movement recorded successfully',
            data: res
        }
    }

    @Post('out')
    async stockOut(@Body() stockOutDto: StockMovementDto) {
        const res = await this.stockMovementsService.stockOut(stockOutDto);
        return {
            message: 'Stock movement recorded successfully',
            data: res
        }
    }
}
