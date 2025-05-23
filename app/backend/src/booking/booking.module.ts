import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room, RoomType } from '../entities/room.entity';
import { Hotel } from '../entities/hotel.entity';
import { Reservation } from '../entities/reservation.entity';
import { Guest } from '../entities/guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Hotel, RoomType, Reservation, Guest])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
