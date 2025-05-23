import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { Repository } from 'typeorm';
import { Room } from '../entities/room.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const rooms: Room[] = [
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

describe('BookingService', () => {
  let service: BookingService;
  let repository: Repository<Room>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getRepositoryToken(Room),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnValue({
              innerJoinAndSelect: jest.fn().mockReturnThis(),
              leftJoin: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue(rooms),
            }),
          },
        },
      ],
    }).compile();
    service = module.get<BookingService>(BookingService);
    repository = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a list of available rooms in one registered hotel on the time period', async () => {
    const createQueryBuilderSpy = jest.spyOn(repository, 'createQueryBuilder');
    const mockQueryBuilder = repository.createQueryBuilder();
    expect(
      await service.getAvailableRooms(
        '123',
        new Date('2025-01-01'),
        new Date('2025-01-02'),
      ),
    ).toBe(rooms);
    // Check if the createQueryBuilder method was called with the correct parameters
    expect(createQueryBuilderSpy).toHaveBeenCalledWith('room');
    // Check if the innerJoinAndSelect method was called with the correct parameters
    expect(mockQueryBuilder.innerJoinAndSelect).toHaveBeenCalledWith(
      'room.hotel',
      'hotel',
      'hotel.id = :hotelId',
      { hotelId: '123' },
    );
    // Check if the leftJoin method was called with the correct parameters
    expect(mockQueryBuilder.leftJoin).toHaveBeenCalledWith(
      'room.reservations',
      'reservation',
      '(reservation.startDate < :startDate AND reservation.endDate > :endDate) ' +
        'OR (reservation.startDate > :startDate AND reservation.endDate < :endDate) ' +
        'OR (reservation.startDate >= :startDate AND reservation.startDate < :endDate) ' +
        'OR (reservation.endDate <= :endDate AND reservation.endDate > :startDate)',
      { startDate: new Date('2025-01-01'), endDate: new Date('2025-01-02') },
    );
  });
});
