import { createContext, FC } from "react";
import useSWR from "swr";
import { Room, RoomInput } from "../../types/api";
import apiFetcher from "../../utils/apiFetcher";

interface RoomEditorContextValue {
  rooms: Room[],
  isValidating: boolean,
  actions: {
    create: (newRoom: RoomInput) => void
    remove: (id: number) => void
  }
}

export const RoomEditorContext = createContext<RoomEditorContextValue>({
  rooms: [],
  isValidating: false,
  actions: {
    create: () => undefined,
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

  const remove = (id: number) => {
    fetch(`http://localhost:8080/api/rooms/${id}`, {
      method: 'DELETE',
    })
    .then( response => {
      if (response.ok) {
        mutate(rooms.filter( room => room.id !== id ))
      }
    });
  }

  const contextValue = {
    rooms,
    isValidating,
    actions: {
      create,
      remove,
    }
  };

  return (
    <RoomEditorContext.Provider value={contextValue}>
      {children}
    </RoomEditorContext.Provider>
  )
}

export default RoomEditorContextProvider;
