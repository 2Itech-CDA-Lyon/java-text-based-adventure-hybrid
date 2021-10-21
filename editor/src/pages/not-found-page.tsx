import { FC } from "react";
import { Container } from "react-bootstrap";
import { RouteComponentProps } from "react-router";

const NotFoundPage: FC<RouteComponentProps> = () => {
  return (
    <Container>
      <h1>Page not found</h1>
      <p>This page doesn't exist (yet)...</p>
    </Container>
  );
}

export default NotFoundPage;
