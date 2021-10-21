import { FC, useContext } from "react";
import { Form } from "react-bootstrap";
import { Room } from "../../types/api";
import { RoomEditorContext } from "../room-editor/room-editor-context";

interface RoomSelectorProps {
  selectedRoom?: Room;
  onChangeHook: (room: Room) => void;
}

const RoomSelector: FC<RoomSelectorProps> = ({ selectedRoom, onChangeHook }) => {
  const { rooms, isValidating, actions } = useContext(RoomEditorContext);

  if (!rooms && isValidating) {
    return (
      <Form.Control
        as="select"
        size="sm"
      />
    )
  }

  return (
    <Form.Control
      as="select"
      size="sm"
      value={selectedRoom?.id}
      onChange={(event) => onChangeHook(actions.findById(Number(event.target.value)))}
    >
      {
        rooms.map(
          room => (
            <option key={room.id} value={room.id}>{room.name}</option>
          )
        )
      }
    </Form.Control>
  )
}

export default RoomSelector;
