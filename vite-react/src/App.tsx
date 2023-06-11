import React, { ButtonHTMLAttributes, useState } from 'react'

type Props = {}
interface item {
  id:number,
  name:string,
  lastname: string,
  status:number
}
export default function App({}: Props) {

  const [todos,setTodos] = useState<item[]>([]);

  var [todosFind,setTodosFind] = useState<item[]>([])
  
  const [name,setName] = useState<string>("");

  const [lastname,setLastName] = useState<string>("");

  const [editname,setEditname] = useState<string>("");
  const [editLastname,setEditLastname] = useState<string>("");

  const [value,setValue] = useState<string>("");


  const addperson = (a) => {

    const newTodo: item = {
      id: + new Date(),
      name: name,
      lastname: lastname,
      status:1
    }
    setTodos([...todos, newTodo]);
    setName("");
    setLastName("");
    a.preventDefault()
  }

  const editPerson = (index:number) => {
    todos[index].status = 8;
    setEditname(todos[index].name);
    setEditLastname(todos[index].lastname);
    setTodos([...todos]);
  }

  const savePerson = (index:number) => {
    todos[index].name = editname;
    todos[index].lastname = editLastname;
    todos[index].status = 1;
    setTodos([...todos]);
  }

  const removePerson = (index:number)=> {
    todos.splice(index,1);
    setTodos([...todos]);
  }

  const backEdit = (index:number) => {
    todos[index].status = 1;
    setTodos([...todos])
  }

  const findData = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    var textFind = event.target.value;
    if (textFind.length > 2) { 
      const array = todos.filter((todos)=> todos.name.includes(textFind) || todos.lastname.includes(textFind));
      todosFind = array;
      setTodosFind([...todosFind]);
    }
  } 

  return (
    <div>App to do list

      <ul>
        {
          todos.map((todo:item, index:number)=>{
            if(todo.status == 1) {
              return (
                <li key={todo.id}>
                  ชื่อ: {todo.name} สกุล: {todo.lastname}
                  <button onClick={()=>editPerson(index)}>แก้ไข</button>
                  <button onClick={()=>removePerson(index)}>ลบข้อมูล</button>
                </li>
              )
            }else {
              return (
                <li key={todo.id}>
                  ชื่อ:
                  <input type='text' value={editname} onChange={(e)=>setEditname(e.target.value)}/>
                   สกุล:
                  <input type='text' value={editLastname} onChange={(e)=>setEditLastname(e.target.value)}/>
                  <button onClick={()=>savePerson(index)}>บันทึกข้อมูล</button>
                  <button onClick={()=>backEdit(index)}>ย้อนกลับ</button>
                </li>
              )
            }
          })
        }
      </ul>

      <form action="">
        <label htmlFor="">ชื่อ</label>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="">สกุล</label>
        <input type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
        <button onClick={addperson}>add person</button>
      </form>

      <h3>ค้นหาข้อมูล</h3>
      <input type="text" value={value} onChange={findData} />
      <ul>
        {
          todosFind.map((todo:item)=> {
            return (
              <li>
                ชื่อ: {todo.name} สกุล: {todo.lastname}
              </li>
            )
          })
        }
      </ul>


    </div>
  )
}