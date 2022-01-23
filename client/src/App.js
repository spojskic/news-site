import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
