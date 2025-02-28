import "./App.css";
import ActionItems from "./components/ActionItems";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Reservation from "./components/Reservation";

function App() {
  return (
    // <ActionProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/actions" component={ActionItems} />
            <Route exact path="/reservation" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    // </ActionProvider>
  );
}

export default App;
