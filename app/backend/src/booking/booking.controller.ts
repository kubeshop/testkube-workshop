import { Controller, Get, ParseDatePipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('/booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('/availableRooms')
  async getAvailableRooms(
    @Query('hotelId', new ParseUUIDPipe({ optional: true })) hotelId?: string,
    @Query('startDate', new ParseDatePipe({ optional: true })) startDate?: Date,
    @Query('endDate', new ParseDatePipe({ optional: true })) endDate?: Date,
  ) {
    return this.bookingService.getAvailableRooms(hotelId, startDate, endDate);
  }
}
