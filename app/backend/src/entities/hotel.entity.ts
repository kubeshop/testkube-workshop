import { IHotel } from '../interfaces/hotel.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hotel implements IHotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  location: string;
  @Column("decimal", { precision: 5, scale: 2 })
  rating: number;
}
