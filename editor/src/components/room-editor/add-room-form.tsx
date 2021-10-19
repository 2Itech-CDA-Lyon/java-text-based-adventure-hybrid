import { useState, FormEvent, useContext } from "react";
import { Button, Card, Form } from "react-bootstrap"
import { RoomInput, Room } from "../../types/api";
import { RoomEditorContext } from "./room-editor-context";

const AddRoomForm = () => {
  const { rooms, mutate } = useContext(RoomEditorContext);
  
  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    const newRoom: RoomInput = {
      name
    };

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

  return (
    <Card className="mt-4 mb-4">
      <Card.Header as="h2">Create new room</Card.Header>
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
          <Button type="submit" variant="primary" size="sm">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddRoomForm;
