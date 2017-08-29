import React, { Component } from 'react'
import './App.css'

import axios from 'axios'



class App extends Component {
  constructor() {
    super()
    this.state = {
      todos: [],
      allclick: false,
      todoclick: false,
      doneclick: false
    }
    this.addNewToDo = this.addNewToDo.bind(this)
    this.changeClassAll = this.changeClassAll.bind(this)
    this.changeClassToDo = this.changeClassToDo.bind(this)
    this.changeClassDone = this.changeClassDone.bind(this)
    this.taskDone = this.taskDone.bind(this)
  }
  render() {
    return (
      <div className='App'>
        <h1>Get stuff done!</h1>
        <p className='btn-group'>
          <button type='button' className={this.state.allclick === false ? 'btn btn-default' : 'btn btn-primary'} onClick={this.changeClassAll}>All</button>
          <button type='button' className={this.state.todoclick === false ? 'btn btn-default' : 'btn btn-primary'} onClick={this.changeClassToDo}>To-do</button>
          <button type='button' className={this.state.doneclick === false ? 'btn btn-default' : 'btn btn-primary'} onClick={this.changeClassDone}>Done</button>
        </p>
        <p>
          <form id='todolist' onSubmit={(e) => { this.addNewToDo(e) }}>
            <input id='todoinput' type='text' />
            <input type='submit' />
          </form>
        </p>
        <div className='Items'>
          {this.state.todos.map((items, i) => <Items allState={this.state} doneState={items.done} index={i} todos={items.item} tDone = {this.taskDone}/>)}
        </div>
      </div>
    )
  }

  taskDone(i) {
    let doneTasks = Array.from(this.state.todos)
    doneTasks[i].done = !doneTasks[i].done
    this.setState ({
      todos: doneTasks
    })
  }

  componentWillMount () {
    const promiseGet = axios.get('http://localhost:8080/todo')
    promiseGet.then((result) => {
  console.log('Woot!')
  console.log(result.data)
  this.setState ({
      todos: result.data
    })  
}).catch((error) => {
  console.log('Boo!')
  console.log(error)
})
    
  }

  componentDidUpdate () {
    const promisePost = axios.post('http://localhost:8080/todo', {todos: this.state.todos})
    promisePost.then((result) => {
  console.log('Woot!')
  console.log(result.data)
}).catch((error) => {
  console.log('Boo!')
  console.log(error)
})
  }

  addNewToDo(e) {
    e.preventDefault()
    let newToDos = Array.from(this.state.todos)
    newToDos.push({ item: (document.getElementById('todoinput').value), done: false })
    this.setState({
      todos: newToDos
    })
    document.getElementById('todoinput').value = ''
  }

  changeClassAll() {
    if (this.state.allclick === false) {
      this.setState({
        allclick: true,
        todoclick: false,
        doneclick: false
      })
    } else if (this.state.allclick === true) {
      this.setState({
        allclick: false
      })
    }
  }

  changeClassToDo() {
    if (this.state.todoclick === false) {
      this.setState({
        allclick: false,
        todoclick: true,
        doneclick: false
      })
    } else if (this.state.todoclick === true) {
      this.setState({
        todoclick: false
      })
    }
  }

  changeClassDone() {
    if (this.state.doneclick === false) {
      this.setState({
        allclick: false,
        todoclick: false,
        doneclick: true
      })
    } else if (this.state.doneclick === true) {
      this.setState({
        doneclick: false
      })
    }
  }
}

class Items extends Component {
  constructor() {
    super()
    this.state = {
      done: false
    }
    this.changeClass = this.changeClass.bind(this)
  }
  render() {
    let allState = this.props.allState
    let doneButt = this.state.done === false && allState.doneclick === true
    let toDoButt = this.state.done === true && allState.todoclick === true
    return (
      <div className='ListOfItems'>
        <p><button type='button' id={(doneButt) ? 'hide' : (toDoButt) ? 'hide' : 'none'} className={(this.props.doneState === false) ? 'btn btn-success halfwidth' : 'btn btn-large btn-danger halfwidth'} onClick={this.changeClass}>{this.props.todos}</button></p>
      </div >
    )
  }

  changeClass() {
    if (this.state.done === true) {
      this.setState({
        done: false
      })
    } else if (this.state.done === false) {
      this.setState({
        done: true
      })
    }
    this.props.tDone(this.props.index)
  }
}

export default App
