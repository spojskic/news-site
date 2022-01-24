import Login from "./Login";
import Navbar from "./Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./Register";
import Home from "./Home";
import NewsDetails from "./NewsDetails";
import EditArticle from "./EditArticle";
import AddArticle from "./AddArticle";
import ListUsers from "./ListUsers";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/add" exact component={AddArticle} />
        <Route path="/home/:id" exact component={NewsDetails} />
        <Route path="/home/edit/:id" exact component={EditArticle} />
        <Route path="/users" exact component={ListUsers} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
