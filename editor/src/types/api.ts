export interface Room {
  id: number;
  name: string;
  connectionsFrom?: RoomConnection[];
  connectionsTo?: RoomConnection[];
}

export interface Direction {
  id: number;
  name: string;
  command: string;
}

export interface RoomConnection {
  id: number;
  fromRoom: Room;
  toRoom: Room;
  direction: Direction;
}
