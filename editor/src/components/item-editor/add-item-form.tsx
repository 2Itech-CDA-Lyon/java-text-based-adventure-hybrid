import { useContext, useState, FormEvent } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Room } from "../../types/api";
import { RoomEditorContext } from "../room-editor/room-editor-context";
import { ItemEditorContext } from "./item-editor-context";

const AddItemForm = () => {
  const { rooms, actions: { findById: findRoomById }, isValidating: isValidatingRooms } = useContext(RoomEditorContext);
  const { actions } = useContext(ItemEditorContext);
  
  const [name, setName] = useState('');
  const [room, setRoom] = useState<Room | undefined>();

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
            {!isValidatingRooms && <Form.Control
              as="select"
              size="sm"
              value={(room || rooms[0]).id}
              onChange={(event) => setRoom(findRoomById(Number(event.target.value)))}
            >
              {
                rooms.map(
                  room => (
                    <option value={room.id}>{room.name}</option>
                  )
                )
              }
            </Form.Control>}
          </Form.Group>
          <Button type="submit" variant="primary" size="sm">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddItemForm;
