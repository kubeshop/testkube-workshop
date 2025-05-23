import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { IRoom } from '../interfaces/room.interface';

const rooms: IRoom[] = [
  {
    id: '1',
    hotel: {
      id: '123',
      name: 'Hotel California',
      location: 'USA',
      rating: 5,
    },
    type: {
      id: '1',
      name: 'Deluxe',
      description: '',
      capacity: 2,
      price: 200,
    },
  },
];

describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: BookingService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        BookingService,
        {
          provide: BookingService,
          useValue: {
            getAvailableRooms: jest.fn().mockResolvedValue(rooms),
          },
        },
      ],
    }).compile();
    // Mock the BookingService
    bookingService = module.get<BookingService>(BookingService);
    controller = module.get<BookingController>(BookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of rooms', async () => {
    const hotelId = '123';
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-01-02');
    const result = await controller.getAvailableRooms(
      hotelId,
      startDate,
      endDate,
    );
    expect(result).toEqual(rooms);
    expect(bookingService.getAvailableRooms).toHaveBeenCalledWith(
      hotelId,
      startDate,
      endDate,
    );
  });
});
