import { FC, useContext } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { ModifiableText, RoomSelector } from "../components/common";
import { AddItemForm } from "../components/item-editor";
import ItemEditorContextProvider, { ItemEditorContext } from "../components/item-editor/item-editor-context";
import { RoomEditorContextProvider } from "../components/room-editor";
import { RoomEditorContext } from "../components/room-editor/room-editor-context";
import { Room } from "../types/api";

const ItemEditorPageContent: FC = () => {
  const { rooms, actions: { findById: findRoomById }, isValidating: isValidatingRooms } = useContext(RoomEditorContext);
  const { items, actions, isValidating } = useContext(ItemEditorContext);

  return (
    <Container>
      <h1>Item editor</h1>

      <AddItemForm />

      <h2>All existing items</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Room</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(
              item => (
                <tr key={item.id}>
                  <th>{item.id}</th>
                  <td>
                    <ModifiableText
                      text={item.name}
                      onSubmitHook={(text) => actions.update(item.id, { name: text })}
                    />
                  </td>
                  <td>
                    <RoomSelector
                      selectedRoom={item.room}
                      onChangeHook={(room) => actions.update(item.id, { room })}
                    />
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => actions.remove(item.id)}>Delete</Button>
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

const ItemEditorPage: FC<RouteComponentProps> = () => {
  return (
    <RoomEditorContextProvider>
      <ItemEditorContextProvider>
        <ItemEditorPageContent />
      </ItemEditorContextProvider>
    </RoomEditorContextProvider>
  )
}

export default ItemEditorPage;
