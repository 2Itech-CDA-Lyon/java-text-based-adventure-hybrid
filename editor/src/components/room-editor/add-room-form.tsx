import { useState, FormEvent, useContext } from "react";
import { Button, Card, Form } from "react-bootstrap"
import { RoomEditorContext } from "./room-editor-context";

const AddRoomForm = () => {
  const { actions } = useContext(RoomEditorContext);
  
  const [name, setName] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    actions.create({ name });
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
