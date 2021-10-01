import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import {useEffect} from 'react'
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import {getUserAuth} from './action/index'
import { connect } from 'react-redux';

function App(props) {
  // console.log('APP PROPS = ',props);
  useEffect(() => {
    props.getUserAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'> 
            <Login/>           
          </Route>
          <Route exact path='/home'>
            <Header/>
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return{}
}

const mapDispatchToProps = (dispatch) =>({
  getUserAuth : () => dispatch(getUserAuth())
})
export default connect(mapStateToProps,mapDispatchToProps)(App);
