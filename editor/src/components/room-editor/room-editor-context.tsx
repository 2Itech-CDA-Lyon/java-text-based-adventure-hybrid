import { createContext, FC } from "react";
import useSWR, { KeyedMutator } from "swr";
import { Room } from "../../types/api";
import apiFetcher from "../../utils/apiFetcher";

interface RoomEditorContextValue {
  rooms: Room[],
  isValidating: boolean,
  mutate: KeyedMutator<Room[]>,
}

export const RoomEditorContext = createContext<RoomEditorContextValue>({
  rooms: [],
  isValidating: false,
  mutate: () => new Promise<undefined>(()=>{}),
});

const RoomEditorContextProvider: FC = ({ children }) => {
  const { data, isValidating, mutate } = useSWR<Room[], Error>('/rooms', apiFetcher);

  const rooms = data || [];

  const contextValue = {
    rooms,
    isValidating,
    mutate,
  };

  return (
    <RoomEditorContext.Provider value={contextValue}>
      {children}
    </RoomEditorContext.Provider>
  )
}

export default RoomEditorContextProvider;
