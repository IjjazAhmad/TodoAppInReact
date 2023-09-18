import React, { useEffect, useState } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Divider, Form, Input, Modal, message } from 'antd'
import TextArea from 'antd/es/input/TextArea';

const initialState = {
  title: '',
  description: '',
  date: '',
  id: '',
  dateCreated: '',
  status: ''
}
export default function About() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [state, setState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))||[]
    setTodos(todos)
  }, [])




  const handleOk = (e) => {
    e.preventDefault()
    const { title, description, date } = state

    if (title.length < 3) {
      return messageApi.open({
        type: 'error',
        content: 'Add Title',
      });
    }
    if (description.length < 10) {
      return messageApi.open({
        type: 'error',
        content: 'Add Description',
      });
    }
    if (!date) {
      return messageApi.open({
        type: 'error',
        content: 'Add Date',
      });
    }
    let todo = { ...state, title, description, date }
    todo.dateCreated = new Date();
    const updateTodo = todos.map((oldtodo) => {
      if (oldtodo.id === todo.id)
        return todo
      return oldtodo
    })
    setTodos(updateTodo)
    localStorage.setItem("todos", JSON.stringify(updateTodo))
    messageApi.open({
      type: 'success',
      content: 'Update ToDo Successfully',
    });
    setIsModalOpen(false);

  };

  const handleCancel = () => {
    setIsModalOpen(false);
    messageApi.open({
      type: 'error',
      content: 'You Cancel Update',
    });
  };

  const handleChange = (e) => {
    e.preventDefault()
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }



  const handleDelete = todo => {

    let filteredData = todos.filter((oldTodo) => {
      return oldTodo.id !== todo.id
    })

    setTodos(filteredData)
    localStorage.setItem("todos", JSON.stringify(filteredData))
    messageApi.open({
      type: 'error',
      content: 'Delete ToDo Successfully',
    });
  }

  return (
    <>
    {contextHolder}
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card mt-5">
              <h2 className='text-center py-3'>My ToDos</h2>
              <div className="table-responsive ">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tital</th>
                      <th>Description </th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {
                      todos.map((todo, i) => {
                        return (

                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.date}</td>
                            <td><DeleteOutlined className='text-danger' onClick={() => { handleDelete(todo) }} /> <EditOutlined className='text-info' onClick={() => { setState(todo); setIsModalOpen(true); }} /></td>
                          </tr>


                        )

                      })
                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal title="UpDate ToDo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          layout='vertical'
        >
          <Divider />
          <Form.Item
            label="Title"
          >
            <Input placeholder='Add Title' value={state.title} name='title' onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Description"
          >

            <br />
            <TextArea rows={4} placeholder="Add Description" name='description' value={state.description} onChange={handleChange} />

          </Form.Item>
          <Form.Item label="Date">
            <input type="date" name='date' value={state.date} onChange={handleChange} />
          </Form.Item>


        </Form>

      </Modal>
    </>
  )
}
