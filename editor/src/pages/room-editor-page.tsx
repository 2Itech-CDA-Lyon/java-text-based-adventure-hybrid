import { useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { AddRoomForm, RoomEditorContextProvider } from "../components/room-editor";
import { RoomEditorContext } from "../components/room-editor/room-editor-context";

const RoomEditorPageContent = () => {
  const { rooms, isValidating } = useContext(RoomEditorContext);

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
          </tr>
        </thead>
        <tbody>
          {
            rooms.map(
              room => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.name}</td>
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
