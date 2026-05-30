import { Module } from '@nestjs/common';
import { AlertLogsController } from './alert-logs.controller';
import { AlertLogsService } from './alert-logs.service';

@Module({
  controllers: [AlertLogsController],
  providers: [AlertLogsService]
})
export class AlertLogsModule {}
