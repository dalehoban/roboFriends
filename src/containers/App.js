import React, { Component } from 'react';
import CardList from'../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
  constructor(){
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(){ //no arry function because this is react function
    fetch('http://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ robots: users}));
  }

  onSearchChange = (event) => {
    //since event happens in child, "this" refers to child,
    //unless an arrow function is used, as seen above.
    //rule of thumb: when creating new function within React
    // object, always use arrow function
    this.setState({searchfield: event.target.value}); //must do this with react
  }
  render(){
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if (robots.length === 0){
      return <h1>Loading</h1>
    } else{
      return (
        <div className = 'tc'>
          <h1 className = "f2">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots}/>
            </ErrorBoundry>
          </Scroll>
        </div>
      );
    }
  }
}
export default App;
