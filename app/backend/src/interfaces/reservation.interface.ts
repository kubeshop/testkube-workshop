import { IGuest } from './guest.interface';
import { IRoom } from './room.interface';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  CHECKED_OUT = 'CHECKED_OUT',
  CANCELLED = 'CANCELLED',
}

export interface IReservation {
  id: string;
  room: IRoom;
  startDate: Date;
  endDate: Date;
  guest: IGuest;
  status: ReservationStatus;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
