import Todo from './Todo'

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/controller/getTodos')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Todos() {
  const data = await getData()

  return (
    <div>
      {data?.map((todo: any) => (
        <Todo
          key={todo.id}
          id={todo.id}
          name={todo.User.name}
          avatar={todo.User.image}
          content={todo.content}
          status={todo.status}
        />
      ))}
    </div>
  )
}
