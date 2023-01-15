import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import { getUser, createUser } from './services/userAPI';

class App extends React.Component {
  state = {
    loginInput: {},
  };

  componentDidMount() {
    this.fetchApiCreateUser();
  }

  fetchApiCreateUser = async () => {
    const user = await createUser();
    this.setState({ loginInput: user });
  };

  fetchApiGetUser = async () => {
    const saveUser = await getUser();
    this.setState({ loginInput: saveUser });
  };

  render() {
    const { loginInput } = this.state;
    return (
      <main>
        <BrowserRouter>
          <p>TrybeTunes</p>
          <Login
            fetchApiCreateUser={ this.fetchApiCreateUser }
            value={ loginInput }
            fetchApiGetUser={ this.fetchApiGetUser }
          />
        </BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />

          <Route exact path="*" component={ NotFound } />
        </Switch>
      </main>

    );
  }
}

export default App;
