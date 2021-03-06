import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  
  state = {
    persons: [
      {id: 1, name: 'Mckenzie', age: 21},
      {id: 2, name: 'Skye', age: 24},
      {id: 3, name: 'Nicole', age: 17}
    ],
    showPersons: false
  }

  // change username based on input value
  nameChangedHandler = (event, id) => {
    // best practice btw

    // find the array index of individual person object based on id 
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // create copy of that person object
    const person = { ...this.state.persons[personIndex] }

    // update the name of the copied person based on the event value (input text value)
    person.name = event.target.value;

    // copy the persons array from state
    const persons = [...this.state.persons];

    // update the person at the found index in the copied persons array to be the updated person
    persons[personIndex] = person;

    // update the state with the copied/updated persons array
    this.setState({ persons: persons })
  }

  // visually shows/hides the persons list content when the show people button is clicked
  togglePersonsHandler = () => {
    const show = this.state.showPersons;
    this.setState({showPersons: !show})
  };

  // deletes person from state list when first paragraph is clicked on
  deletePersonHandler = (index) => {
    // copy the persons array *important to copy array to avoid directly referencing/modifying array in memory
    const persons = [...this.state.persons];

    // remove the person at index
    persons.splice(index, 1);

    // update persons array state with modified copied array 
    this.setState({persons: persons});
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
    }

    return (
      <div className={classes.App}>
        <Cockpit
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} 
        />
        { persons }
      </div>
    );
  }
}

export default App;
