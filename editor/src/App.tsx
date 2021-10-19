import React from 'react';
import useSWR from 'swr';
import { Room } from './types/api';
import apiFetcher from './utils/apiFetcher';

const App = () => {
  const { data: rooms, error } = useSWR<Room[], Error>('/rooms', apiFetcher);

  if (typeof rooms === 'undefined') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>All rooms</h1>
      <ul>
        {
          rooms.map(
            room => <li key={room.id}>{room.name}</li>
          )
        }
      </ul>
    </div>
  );
}

export default App;
