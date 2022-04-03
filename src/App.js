import Navbar from './Navbar';
import Home from './Home';
import Mast from './Mast';
import Lock from './Lock';
import Vote from './Vote';
import Poap from './Poap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Create from './Create';
import BlogDetails from './BlogDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/deploy">
              <Mast />
            </Route>
            <Route exact path="/locknft">
              <Lock />
            </Route>
            <Route exact path="/voting">
              <Vote />
            </Route>
            <Route exact path="/poap">
              <Poap />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
