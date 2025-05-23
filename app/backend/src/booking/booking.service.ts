import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from '../entities/room.entity';
import { IRoom } from '../interfaces/room.interface';
import { Repository } from 'typeorm';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  private getCurrentDate(): Date {
    let currentDate = new Date();
    currentDate.setHours(12);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return currentDate;
  }

  getAvailableRooms(
    hotelId?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<IRoom[]> {
    this.logger.log('Fetching available rooms');
    const query = this.roomRepository
      .createQueryBuilder('room')
      // Join with hotel to get the hotel details
      .innerJoinAndSelect('room.hotel', 'hotel', hotelId ? 'hotel.id = :hotelId' : undefined, { hotelId })
      // Join with room type to get the room type details
      .innerJoinAndSelect('room.type', 'roomType');
    return query
      // Left join with reservations to find overlapping reservations
      .leftJoin(
        'room.reservations',
        'reservation',
        '(reservation.startDate < :startDate AND reservation.endDate > :endDate) ' +
        'OR (reservation.startDate > :startDate AND reservation.endDate < :endDate) ' +
        'OR (reservation.startDate >= :startDate AND reservation.startDate < :endDate) ' +
        'OR (reservation.endDate <= :endDate AND reservation.endDate > :startDate)',
        { startDate: startDate || this.getCurrentDate(), endDate: endDate || this.getCurrentDate() },
      )
      // Filter out rooms with overlapping reservations
      .where('reservation.id IS NULL')
      .getMany();
  }
}
