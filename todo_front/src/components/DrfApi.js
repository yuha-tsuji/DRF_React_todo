import React, {useState, useEffect} from 'react'
// import fetchTodoAPI from './asyncFuncton'
import './css/DrfApi.css'

const DrfApi = () => {

    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState({id:'', title:'', content:''})

    useEffect(() => {
        try {
            async function fetchTodoAPI(){
                const config = {method: 'GET'} 
                const res = await fetch("http://localhost:8000/api/todos/", config)
                const todoJson = await res.json()
                const reverseTodo = todoJson.reverse()
                setTodos(reverseTodo)
            }
            fetchTodoAPI()
            // const response = fetchTodoAPI('GET', 'todos/')
            // setTodos(response)
        } catch (e) {
            console.error(e)
        }
    }, [])

    const createNewTodo = (todo) => {
        const data = {
            id: todo.id,
            title: todo.title,
            content: todo.content
        }
        try {
            async function fetchCreateTodo(data){
                const config = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
                const res = await fetch(`http://localhost:8000/api/todos/`, config)
                const todoJson = await res.json()
                setTodos([...todos, todoJson])
                setEditTodo({id:'', title:'', content:''})
            }
            fetchCreateTodo(data)
        } catch(e){
            console.error(e)
        }
    }

    const updateTodo = (editTodo) => {
        const data = {
            id: editTodo.id,
            title: editTodo.title,
            content: editTodo.content
        }
        async function fetchUpdateTodo(editTodo) {
            const config = {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json;"
                },
                body: JSON.stringify(editTodo)
            }
            const res = await fetch(`http://localhost:8000/api/todos/${editTodo.id}/`, config)
            const resJson = await res.json()
            setTodos(todos.map(todo=>(todo.id === editTodo.id ? resJson : todo)))
            setEditTodo({id:'', title:'', content:''})
        }
        fetchUpdateTodo(data)
    }

    const deleteTodo = (id) => {
        alert("ほんとに消しますか？")
        async function fetchDeleteTodo(id) {
            await fetch(`http://localhost:8000/api/todos/${id}/`, {method: 'DELETE'})
            setTodos(todos.filter(todo => todo.id !== id))
        }
        fetchDeleteTodo(id)
    }

    const handleInputChange = () => e => {
        const value=e.target.value;
        const name = e.target.name
        setEditTodo({...editTodo, [name]: value})
    }

    return (
        <div>
            <ul>
                {
                    todos.map(todo => 
                    <li key={todo.id} className='todo_list bg-dark'>{todo.created_at}<br />title: {todo.title}<br /> content: {todo.content}
                    <br />
                    <button onClick={()=>deleteTodo(todo.id)} className='btn btn-primary'>Delete</button>
                    <button onClick={()=>setEditTodo(todo)} className='btn btn-primary'>Update</button>
                    </li>)
                }
            </ul>
            <div className='container'>
                <input className='form-control' type='text' name='title' placeholder='title' value={editTodo.title} onChange={handleInputChange()} required />
                <br />
                <textarea className='form-control' name='content' placeholder='content' value={editTodo.content} onChange={handleInputChange()} required />
                <br /><br />
                { editTodo.id ? 
                <button onClick={()=>updateTodo(editTodo)} className='btn btn-primary'>Update</button> :
                <button onClick={()=>createNewTodo(editTodo)} className='btn btn-primary'>Create</button>
                }
            </div>
        </div>
    )
}

export default DrfApi
