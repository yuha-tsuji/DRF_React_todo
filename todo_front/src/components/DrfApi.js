import React, {useState, useEffect} from 'react'

const DrfApi = () => {

    const [todos, setTodos] = useState([])
    const [editTodo, setEditTodo] = useState({id:'', title:'', content:''})

    useEffect(() => {
        try {
            async function fetchTodoAPI(){
                const res = await fetch("http://localhost:8000/api/todos/")
                const todoJson = await res.json()
                setTodos(todoJson)
            }
            fetchTodoAPI()
        } catch (e) {
            console.error(e)
        }
    }, [])

    const createNewTodo = (todo) => {
        const data = {
            title: todo.title,
            content: todo.content
        }
        try {
            async function fetchCreateTodo(data){
                const config = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
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
            <input type='text' name='title' placeholder='title' value={editTodo.title} onChange={handleInputChange()} required />
            <br /><br />
            <textarea name='content' placeholder='content' value={editTodo.content} onChange={handleInputChange()} required />
            <br /><br />
            { editTodo.id ? 
            <button onClick={()=>updateTodo(editTodo)}>Update</button> :
            <button onClick={()=>createNewTodo(editTodo)}>Create</button>
            }
            <ul>
                {
                    todos.map(todo => 
                    <li key={todo.id}>{todo.title}: {todo.content}
                    <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
                    <button onClick={()=>setEditTodo(todo)}>Update</button>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default DrfApi
