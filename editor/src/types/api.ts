export type Id = number;

export interface Entity {
  id: Id;
}

export interface Room extends Entity {
  name: string;
  connectionsFrom?: RoomConnection[];
  connectionsTo?: RoomConnection[];
}

export interface Direction extends Entity {
  name: string;
  command: string;
}

export interface RoomConnection extends Entity {
  fromRoom: Room;
  toRoom: Room;
  direction: Direction;
}

export interface Item extends Entity {
  name: string;
  room?: Room;
}

export interface RoomInput {
  name: string;
}

export interface ItemInput {
  name: string;
  room: Room;
}
