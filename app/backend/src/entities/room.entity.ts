import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hotel } from './hotel.entity';
import { IRoom, IRoomType } from '../interfaces/room.interface';
import { Reservation } from './reservation.entity';

@Entity()
export class RoomType implements IRoomType {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  capacity: number;
  @Column()
  price: number;
}

@Entity()
export class Room implements IRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(type => Hotel, (hotel) => hotel.id)
  @JoinColumn({ name: 'hotelId' })
  @Index()
  hotel: Hotel;
  @ManyToOne(type => RoomType, (roomType) => roomType.id)
  @JoinColumn({ name: 'roomTypeId' })
  type: RoomType;
  @OneToMany(type => Reservation, (reservation) => reservation.room)
  reservations?: Reservation[];
}
