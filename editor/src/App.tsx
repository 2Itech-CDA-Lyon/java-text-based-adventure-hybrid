import { ItemEditorPage, NotFoundPage, RoomEditorPage } from "./pages";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/rooms" component={RoomEditorPage} />
        <Route exact path="/items" component={ItemEditorPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
