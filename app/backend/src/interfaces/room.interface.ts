import { IHotel } from './hotel.interface';

export interface IRoomType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
}

export interface IRoom {
  id: string;
  hotel: IHotel;
  type: IRoomType;
}
