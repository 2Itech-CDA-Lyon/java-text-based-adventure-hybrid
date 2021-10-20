import { useContext } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { ModifiableText } from "../components/common";
import { AddRoomForm, RoomEditorContextProvider } from "../components/room-editor";
import { RoomEditorContext } from "../components/room-editor/room-editor-context";

const RoomEditorPageContent = () => {
  const { rooms, isValidating, actions } = useContext(RoomEditorContext);

  return (
    <Container>
      <h1>Room editor</h1>

      <AddRoomForm />

      <h2>All existing rooms</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            rooms.map(
              room => (
                <tr key={room.id}>
                  <th>{room.id}</th>
                  <td>
                    <ModifiableText
                      text={room.name}
                      onSubmitHook={(text) => actions.update(room.id, { name: text })}
                    />
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => actions.remove(room.id)}>Delete</Button>
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </Table>

      {
        isValidating && <div>Loading...</div>
      }
    </Container>
  );
}

const RoomEditorPage = () => {
  return (
    <RoomEditorContextProvider>
      <RoomEditorPageContent />
    </RoomEditorContextProvider>
  );
}

export default RoomEditorPage;
