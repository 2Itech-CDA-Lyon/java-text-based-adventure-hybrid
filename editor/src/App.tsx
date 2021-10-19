import React, { useEffect, useState } from 'react';
import { Room } from './types/api';

const App = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(
    () => {
      fetch('http://localhost:8080/api/rooms')
      .then( response => response.json() )
      .then( (data: Room[]) => setRooms(data) );
    },
    []
  );

  if (rooms.length === 0) {
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
