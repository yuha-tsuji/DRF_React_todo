//GET

// async function fetchTodoAPI(){
//     const res = await fetch("http://localhost:8000/api/todos/")
//     const todoJson = await res.json()
//     setTodos(todoJson)
// }

// POST

// async function fetchCreateTodo(data){
//     const config = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data)
//     }
//     const res = await fetch(`http://localhost:8000/api/todos/`, config)
//     const todoJson = await res.json()
//     setTodos([...todos, todoJson])
//     setEditTodo({id:'', title:'', content:''})
// }

// //PUT 

// async function fetchUpdateTodo(editTodo) {
//     const config = {
//         method: 'PUT',
//         headers: {
//             "Content-type": "application/json;"
//         },
//         body: JSON.stringify(editTodo)
//     }
//     const res = await fetch(`http://localhost:8000/api/todos/${editTodo.id}/`, config)
//     const resJson = await res.json()
//     setTodos(todos.map(todo=>(todo.id === editTodo.id ? resJson : todo)))
//     setEditTodo({id:'', title:'', content:''})
// }

// // DELETE

// async function fetchDeleteTodo(id) {
//     await fetch(`http://localhost:8000/api/todos/${id}/`, {method: 'DELETE'})
//     setTodos(todos.filter(todo => todo.id !== id))
// }

async function fetchTodoAPI(requestMethod, endpoint, data) {
    let requestData, contentType
    if (data) {
        requestData = {
            id: data.id,
            title: data.title,
            content: data.content
        }
    }
    if (requestMethod === 'POST' || requestMethod === 'PUT') {
        contentType = 'application/json;'
    }
    const config = {
        method: requestMethod,
        body: JSON.stringify(requestData),
        headers: contentType
    }

    const res = await fetch(`http://localhost:8000/api/${endpoint}`, config)
    const resJson = await res.json()

    return resJson
}

export default fetchTodoAPI