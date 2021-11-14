import logo from './logo.svg';
import react,{useState} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	useHistory,
  Redirect
} from 'react-router-dom';

import { connect } from 'react-redux';

import './styles/modules.scss';
//pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Edit from './pages/Edit';
import Dashboard from './pages/Dashboard';
import NotResults from './pages/NotResults';



function App( user ) {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/edit/:id" render={(props)=>user? (Edit):(<Redirect to='/'/>)}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route  component={NotResults}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }}

export default connect(mapStateToProps,null)(App)
