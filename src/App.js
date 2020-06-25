import React from 'react';
import Task from './Task';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Dashboard from './dashboard'
import Dashboard2 from './dashboard2'
import weather from './Weather'

function App() {
  return (
    <div className="container mt-5">
     <Router>
       <Switch>
         <Route path='/'  exact component={Task} />
         <Route exact path='/dashboard'  component={Dashboard} />
         <Route path='/dashboard2'  component={Dashboard2} />
         <Route path='/weather'  component={weather} />
       </Switch>
     </Router>
    </div>
  );
}

export default App;
