import { createContext, FC, useContext } from "react";
import useSWR from "swr";
import { Direction, DirectionInput, Entity, Id, Item, ItemInput, ResourceIdentifier, Room, RoomInput } from "../../types/api";
import apiFetcher from "../../utils/apiFetcher";

interface EntityCollectionContextValue<E extends Entity, I> {
  data: E[]
  isValidating: boolean
  actions: {
    findById: (id: Id) => E
    create: (newObject: I) => void
    update: (id: Id, updatedObject: Partial<I>) => void
    remove: (id: Id) => void
  }
}

/**
 * Generate a CRUD context for a particular collection
 * E = Entity type
 * I = Input type for entity E
 * @param resourceIdentifier Identifier for entity E in the API
 * @returns 
 */
const generateEntityCollectionContext = <E extends Entity, I>(resourceIdentifier: ResourceIdentifier) => {
  /**
   * Context object
   */
  const Context = createContext<EntityCollectionContextValue<E, I> | undefined>(undefined);

  /**
   * Context provider
   * @param props
   * @returns 
   */
  const Provider: FC = ({ children }) => {
    const { data: swrData, isValidating, mutate } = useSWR<E[], Error>(`/${resourceIdentifier}`, apiFetcher);
  
    const data = swrData || [];
  
    const findById = (id: Id) => {
      const result = data.find( obj => obj.id === id );
      if (typeof result === 'undefined') {
        throw new Error('Result of findById does not exist.');
      }
      return result;
    }
  
    const create = (newObject: I) => {
      fetch(`http://localhost:8080/api/${resourceIdentifier}`, {
        method: 'POST',
        body: JSON.stringify(newObject),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then( response => response.json() )
      .then( (returnedObject: E) => mutate([ ...data, returnedObject ]) );
    }
  
    const update = (id: Id, updatedObject: Partial<I>) => {
      fetch(`http://localhost:8080/api/${resourceIdentifier}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedObject),
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      })
      .then( response => response.json() )
      .then( (returnedObject: E) => mutate(data.map( obj => obj.id === returnedObject.id ? returnedObject : obj )) );
    }
  
    const remove = (id: Id) => {
      fetch(`http://localhost:8080/api/${resourceIdentifier}/${id}`, {
        method: 'DELETE',
      })
      .then( response => {
        if (response.ok) {
          mutate(data.filter( obj => obj.id !== id ))
        }
      });
    }
  
    const contextValue = {
      data,
      isValidating,
      actions: {
        findById,
        create,
        remove,
        update,
      }
    };
  
    return (
      <Context.Provider value={contextValue}>
        {children}
      </Context.Provider>
    )
  }

  /**
   * Context hook
   * @returns
   */
  const useValue = () => {
    const result = useContext(Context);
    if (typeof result === 'undefined') {
      throw new Error('EntityCollectionContext should not be undefined. Did you forget to wrap your component inside a EntityCollectionContextProvider?');
    }
    return result;
  }
  
  // Pack hook and provider in a single object
  return {
    Provider,
    useValue,
  }
}

export const RoomCollectionContext = generateEntityCollectionContext<Room, RoomInput>(ResourceIdentifier.Room);
export const ItemCollectionContext = generateEntityCollectionContext<Item, ItemInput>(ResourceIdentifier.Item);
export const DirectionCollectionContext = generateEntityCollectionContext<Direction, DirectionInput>(ResourceIdentifier.Direction);
