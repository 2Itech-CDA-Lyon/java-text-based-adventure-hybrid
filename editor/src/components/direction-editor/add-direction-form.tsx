import { FC, FormEvent, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { DirectionCollectionContext } from "../common/entity-collection-context";

const AddDirectionForm: FC = () => {
  const { actions } = DirectionCollectionContext.useValue();

  const [name, setName] = useState('');
  const [command, setCommand] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    actions.create({
      name,
      command,
    });
  }

  return (
    <Card className="mt-4 mb-4">
      <Card.Header as="h2">Create new direction</Card.Header>
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
          <Form.Group className="mb-3" controlId="createFormCommand">
            <Form.Label>Command</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter command"
              size="sm"
              onChange={event => setCommand(event.target.value)}
              value={command}
            />
          </Form.Group>
          <Button type="submit" variant="primary" size="sm">Submit</Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddDirectionForm;
