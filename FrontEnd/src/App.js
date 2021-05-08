import './App.css';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Team from './pages/Team/Team';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Socket from 'socket-connector/client';

function App() {
  const clientSocket = new Socket("http://127.0.0.1:8000");

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/search" component={() => <Search clientSocket={clientSocket} />} />
          <Route path="/team" component={Team} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
