import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { BookingModule } from '../src/booking/booking.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Utils } from './fixtures/utils';
import e from 'express';
import { IRoom } from 'src/interfaces/room.interface';

const rooms = Utils.loadRoomData();

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let hotelId: string = '47c1082c-2fa6-11f0-819b-325096b39f47';
  let filteredRooms: IRoom[] = [];
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DATABASE_HOST'),
            port: +configService.get('DATABASE_PORT') || 5432,
            username: configService.get('DATABASE_USER'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
          }),
          inject: [ConfigService],
        }),
        BookingModule
      ],
    }).compile();
    filteredRooms = rooms.filter((room) => room.hotel.id === hotelId);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Method: /booking/availableRooms (GET)', () => {
    it('should return all available rooms of the hotel when start and end date are before current reservations', async () => {
      const startDate = '2024-12-25';
      const endDate = '2024-12-30';
      const response = await request(app.getHttpServer())
        .get(`/booking/availableRooms/?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`)
        .expect(200);
      const body: IRoom[] = JSON.parse(response.text);
      expect(body.length).toBe(filteredRooms.length);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: filteredRooms[0].id }),
          expect.objectContaining({ id: filteredRooms[1].id }),
        ]));
    });

    it('should return all available rooms of the hotel when start and end date are after current reservations', async () => {
      const startDate = '2025-01-16';
      const endDate = '2025-01-20';
      const response = await request(app.getHttpServer())
        .get(`/booking/availableRooms/?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`)
        .expect(200);
      const body: IRoom[] = JSON.parse(response.text);
      expect(body.length).toBe(2);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: filteredRooms[0].id }),
          expect.objectContaining({ id: filteredRooms[1].id }),
        ]));
    });

    it('should return only one room of the hotel when start date is before and end date is in middle of current reservations', async () => {
      const startDate = '2024-12-25';
      const endDate = '2025-01-10';
      const response = await request(app.getHttpServer())
        .get(`/booking/availableRooms/?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`)
        .expect(200);
      const body: IRoom[] = JSON.parse(response.text);
      expect(body.length).toBe(1);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: filteredRooms[1].id }),
        ]));
    });

    it('should return only one room of the hotel when start date is in middle and end date is after current reservations', async () => {
      const startDate = '2025-01-10';
      const endDate = '2025-01-20';
      const response = await request(app.getHttpServer())
        .get(`/booking/availableRooms/?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`)
        .expect(200);
      const body: IRoom[] = JSON.parse(response.text);
      expect(body.length).toBe(1);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: filteredRooms[1].id }),
        ]));
    });

    it('should return only one room of the hotel when start and end date are in middle of current reservations', async () => {
      const startDate = '2025-01-05';
      const endDate = '2025-01-13';
      const response = await request(app.getHttpServer())
        .get(`/booking/availableRooms/?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`)
        .expect(200);
      const body: IRoom[] = JSON.parse(response.text);
      expect(body.length).toBe(1);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: filteredRooms[1].id }),
        ]));
    });

    it('should return only one room of the hotel when start date is before and end date is after of current reservations', async () => {
      const startDate = '2024-12-25';
      const endDate = '2025-01-25';
      const response = await request(app.getHttpServer())
        .get(`/booking/availableRooms/?hotelId=${hotelId}&startDate=${startDate}&endDate=${endDate}`)
        .expect(200);
      const body: IRoom[] = JSON.parse(response.text);
      expect(body.length).toBe(1);
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: filteredRooms[1].id }),
        ]));
    });
  });
});
