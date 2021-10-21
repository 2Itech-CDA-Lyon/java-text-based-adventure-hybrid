import { createContext, FC } from "react";
import useSWR from "swr";
import { Id, Item, ItemInput } from '../../types/api';
import apiFetcher from "../../utils/apiFetcher";

interface ItemEditorContextValue {
  items: Item[],
  isValidating: boolean,
  actions: {
    create: (newItem: ItemInput) => void;
    update: (id: Id, updatedItem: Partial<ItemInput>) => void;
    remove: (id: Id) => void;
  }
}

export const ItemEditorContext = createContext<ItemEditorContextValue>({
  items: [],
  isValidating: false,
  actions: {
    create: () => undefined,
    update: () => undefined,
    remove: () => undefined,
  }
});

const ItemEditorContextProvider: FC = ({ children }) => {
  const { data, isValidating, mutate } = useSWR<Item[], Error>('/items', apiFetcher);

  const items = data || [];

  const create = (newItem: ItemInput) => {
    fetch(`http://localhost:8080/api/items`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .then( response => response.json() )
    .then( (data: Item) => mutate([ ...items, data ]) );
  }

  const remove = (id: Id) => {
    fetch(`http://localhost:8080/api/items/${id}`, {
      method: 'DELETE',
    })
    .then( response => {
      if (response.ok) {
        mutate(items.filter( item => item.id !== id ))
      }
    });
  }

  const update = (id: Id, updatedItem: Partial<ItemInput>) => {
    fetch(`http://localhost:8080/api/items/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedItem),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .then( response => response.json() )
    .then( (data: Item) => mutate(items.map( item => item.id === data.id ? data : item )) );
  }

  const contextValue = {
    items,
    isValidating,
    actions: {
      create,
      remove,
      update,
    }
  };

  return (
    <ItemEditorContext.Provider value={contextValue}>
      {children}
    </ItemEditorContext.Provider>
  )
}

export default ItemEditorContextProvider;
