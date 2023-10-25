import { Module } from '@nestjs/common';
import { BssService } from './bss.service';

@Module({
  providers: [BssService],
})
export class BssModule {}
