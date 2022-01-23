import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import NewsDetails from "./NewsDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/:id" exact component={NewsDetails} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
