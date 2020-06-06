import React, {useState, useEffect} from 'react'

const DrfApi = () => {

    const [todos, setTodos] = useState([])

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

    return (
        <div>
            <ul>
                {
                    todos.map(todo => 
                    <li key={todo.id}>{todo.title}: {todo.content}</li>
                    )
                }
            </ul>
        </div>
    )
}

export default DrfApi
