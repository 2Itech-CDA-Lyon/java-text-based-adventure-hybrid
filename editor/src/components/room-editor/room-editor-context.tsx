import { createContext, FC } from "react";
import useSWR from "swr";
import { Id, Room, RoomInput } from "../../types/api";
import apiFetcher from "../../utils/apiFetcher";

interface RoomEditorContextValue {
  rooms: Room[],
  isValidating: boolean,
  actions: {
    create: (newRoom: RoomInput) => void;
    update: (id: Id, updatedRoom: Partial<RoomInput>) => void
    remove: (id: Id) => void;
  }
}

export const RoomEditorContext = createContext<RoomEditorContextValue>({
  rooms: [],
  isValidating: false,
  actions: {
    create: () => undefined,
    update: () => undefined,
    remove: () => undefined,
  }
});

const RoomEditorContextProvider: FC = ({ children }) => {
  const { data, isValidating, mutate } = useSWR<Room[], Error>('/rooms', apiFetcher);

  const rooms = data || [];

  const create = (newRoom: RoomInput) => {
    fetch(`http://localhost:8080/api/rooms`, {
      method: 'POST',
      body: JSON.stringify(newRoom),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .then( response => response.json() )
    .then( (data: Room) => mutate([ ...rooms, data ]) );
  }

  const remove = (id: Id) => {
    fetch(`http://localhost:8080/api/rooms/${id}`, {
      method: 'DELETE',
    })
    .then( response => {
      if (response.ok) {
        mutate(rooms.filter( room => room.id !== id ))
      }
    });
  }

  const update = (id: Id, updatedRoom: Partial<RoomInput>) => {
    fetch(`http://localhost:8080/api/rooms/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedRoom),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .then( response => response.json() )
    .then( (data: Room) => mutate(rooms.map( room => room.id === data.id ? data : room )) );
  }

  const contextValue = {
    rooms,
    isValidating,
    actions: {
      create,
      remove,
      update,
    }
  };

  return (
    <RoomEditorContext.Provider value={contextValue}>
      {children}
    </RoomEditorContext.Provider>
  )
}

export default RoomEditorContextProvider;
