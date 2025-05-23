import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Guest } from './guest.entity';
import {
  IReservation,
  ReservationStatus,
} from '../interfaces/reservation.interface';
import { Room } from './room.entity';

@Entity()
@Index(['startDate', 'endDate'])
export class Reservation implements IReservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(type => Room, (room) => room.id)
  @JoinColumn({ name: 'roomId' })
  room: Room;
  @Column({type: 'date'})
  startDate: Date;
  @Column({type: 'date'})
  endDate: Date;
  @ManyToOne(type => Guest, (guest) => guest.id)
  @JoinColumn({ name: 'guestId' })
  guest: Guest;
  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;
  @Column("decimal", { precision: 10, scale: 2 })
  totalPrice: number;
  @Column({type: 'date'})
  createdAt: Date;
  @Column({type: 'date'})
  updatedAt: Date;
}
