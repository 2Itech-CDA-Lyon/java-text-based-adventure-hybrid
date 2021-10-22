import { FC } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { RouteComponentProps } from "react-router";
import { ModifiableText } from "../components/common";
import { DirectionCollectionContext } from "../components/common/entity-collection-context";
import { AddDirectionForm } from "../components/direction-editor";

const DirectionEditorPageContent: FC = () => {
  const { data: directions, isValidating, actions } = DirectionCollectionContext.useValue();

  return (
    <Container>
      <h1>Direction editor</h1>

      <AddDirectionForm />

      <h2>All existing directions</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Command</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            directions.map(
              direction => (
                <tr key={direction.id}>
                  <th>{direction.id}</th>
                  <td>
                    <ModifiableText
                      text={direction.name}
                      onSubmitHook={(text) => actions.update(direction.id, { name: text })}
                    />
                  </td>
                  <td>
                    <ModifiableText
                      text={direction.command}
                      onSubmitHook={(text) => actions.update(direction.id, { command: text })}
                    />
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => actions.remove(direction.id)}>Delete</Button>
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

const DirectionEditorPage: FC<RouteComponentProps> = () => {
  return (
    <DirectionCollectionContext.Provider>
      <DirectionEditorPageContent />
    </DirectionCollectionContext.Provider>
  );
}

export default DirectionEditorPage;
