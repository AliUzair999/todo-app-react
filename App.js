// import logo from './logo.svg';
import './App.css';
import { useState } from 'react'


function App() {
  const [list, setList] = useState([{
    task: "Picking clothes",
    done: false,
    selected: false
  },
  {
    task: "planning birthday",
    done: false,
    selected: false
  },
  {
    task: "submitting assignment",
    done: false,
    selected: false
  }])
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setinputValue] = useState('')
  const [editIndex, setEditindex] = useState(0)
  const addTodo = () => {
    let newList = [...list]
    // console.log('Todo Added',newList)
    newList.push({ task: inputValue, done: false, selected: false })
    setList(newList)
    setinputValue('')
  }
  const updateTodo = () => {
    // console.log('Todo Updated')
    let newList = list;
    newList[editIndex].task = inputValue;
    setList(newList)
    setEditMode(false)
    setinputValue('')
  }
  const deleteSelected = () => {
    let newList = [...list]
    // let spliceLevel = list.length
    for (var i = list.length - 1; i >= 0; i--) {
      if (list[i].selected) {
        newList.splice(i, 1)
      }
    }
    setList(newList)
  }


  // console.log("list", list)
  return (
    <div className="App">
      <header className="App-header">

        <h1>Uzair's TODO App</h1>
        <div id='todoInput'>
          <input onChange={(event) => {
            setinputValue(event.target.value)
          }}
            value={inputValue} />
          <br />
          {editMode
            ? <button onClick={updateTodo}>Update Task</button>
            : <button onClick={addTodo}>Add Task</button>}
        </div>

        <button onClick={deleteSelected}>Delete selected</button>
        <button onClick={() => { setList([]) }}>Delete All</button>

        <h3>My Tasks;</h3>
        <div id='todoList' style={{ textAlign: 'left' }}>
          {list.map((value, index) => {
            return (<>
              {(value.done)
                ? <>
                  <label style={{ textDecoration: "line-through" }} onClick={() => {
                    let newList = [...list]
                    newList[index].done = (!newList[index].done)
                    setList(newList)
                  }} >
                    {index + 1}. {value.task}
                  </label>
                  <input type={'checkbox'} onClick={() => { value.selected = (!value.selected) }} style={{ marginLeft: '20px' }} />
                  <button onClick={() => {
                    setinputValue(value.task)
                    setEditindex(index)
                    setEditMode(true)
                  }}>Edit</button>
                  <button onClick={(index) => {
                    let newList = [...list]
                    newList.splice(index, 1)
                    setList(newList)
                  }}>Delete</button>
                  <br />
                </>
                : <>
                  <label onClick={() => {
                    let newList = [...list]
                    newList[index].done = (!newList[index].done)
                    setList(newList)
                  }}>
                    {index + 1}. {value.task}
                  </label>
                  <input type={'checkbox'} onClick={() => { value.selected = (!value.selected) }} style={{ marginLeft: '20px' }} />
                  <button onClick={() => {
                    setinputValue(value.task)
                    setEditindex(index)
                    setEditMode(true)
                  }}>Edit</button>
                  <button onClick={(index) => {
                    let newList = [...list]
                    newList.splice(index, 1)
                    setList(newList)
                  }}>Delete</button>
                  <br />
                </>
              }

            </>)
          })}
        </div>









        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}


      </header>
    </div>
  );
}

export default App;
