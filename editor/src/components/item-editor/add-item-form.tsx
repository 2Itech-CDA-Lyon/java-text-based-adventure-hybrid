import { useState, FormEvent, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Room } from "../../types/api";
import { RoomSelector } from "../common";
import { ItemCollectionContext, RoomCollectionContext } from "../common/entity-collection-context";

const AddItemForm = () => {
  const { data: rooms } = RoomCollectionContext.useValue();
  const { actions } = ItemCollectionContext.useValue();
  
  const [name, setName] = useState('');
  const [room, setRoom] = useState<Room>({ id: 0, name: '' });

  useEffect(
    () => {
      if (rooms && rooms.length > 0) {
        setRoom(rooms[0])
      }
    },
    [rooms]
  )

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (typeof room === 'undefined') throw new Error('Room cannot be undefined.');
    actions.create({ name, room });
  }

  return (
    <Card className="mt-4 mb-4">
      <Card.Header as="h2">Create new item</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="createFormName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              size="sm"
              onChange={event => setName(event.target.value)}
              value={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="createFormRoom">
            <Form.Label>Room</Form.Label>
            <RoomSelector
              selectedRoom={room}
              onChangeHook={(room) => setRoom(room)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" size="sm">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddItemForm;
