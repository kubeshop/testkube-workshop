import { readFileSync } from 'fs';
import { IRoom } from 'src/interfaces/room.interface';

export class Utils {
  private static loadData(fileName): any[] {
    const filePath = `${__dirname}/../data-management/${fileName}`; // Resolve path relative to the current file
    const data = readFileSync(filePath, 'utf-8');
    const lines = data.trim().split('\n');
    if (lines.length === 0) {
      return [];
    }
    const keys: string[] = lines[0].split(',');
    return lines.slice(1).map((line, index) => {
      let result = {};
      line.split(',').forEach((value, index) => result[keys[index]] = value || '');
      return result;
    });
  }

  static loadRoomData(): IRoom[] {
    const rooms = this.loadData('room.csv');
    const roomTypes = this.loadData('room_type.csv');
    const hotel = this.loadData('hotel.csv');
    return rooms.map((room) => {
      return {
        id: room.id,
        hotel: hotel.find((h) => h.id === room.hotelId),
        type: roomTypes.find((type) => type.id === room.roomTypeId),
      };
    });
  }
}
