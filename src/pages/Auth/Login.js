import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { useAuthContext } from '../Contexts/AuthContext'


const initialState = { userName: "", email: "", password: "" }
export default function Login() {
    const [messageApi, contextHolder] = message.useMessage();
    const { dispatch } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false)
    const [state, setState] = useState(initialState)
    const handleChange = (e) => {
        setState(s => ({ ...s, [e.target.name]: e.target.value }))
    }

    const handleLogin = e => {
        e.preventDefault()
        const { userName, email, password } = state
        if (userName.length < 3) {
            return messageApi.open({
                type: 'error',
                content: 'Add userName again',
            });
        }
        if (!email) {
            return messageApi.open({
                type: 'error',
                content: 'Add email in this formate :  abc@xyz.com',
            });
        }
        if (password.length< 5) {
            return messageApi.open({
                type: 'error',
                content: 'Add password minimum length 5',
            });
        }
            let user = { userName, email, password }
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            localStorage.setItem("user", JSON.stringify(user))
            dispatch({ type: "SET_LOGGED_IN", payload: { user } })
            setState(initialState)
            messageApi.open({
                type: 'success',
                content: 'Login Successfully',
            });
        }, 2000)

    }



    return (
        <>
         {contextHolder}
            <div className="loginPage mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6  m-auto">
                            <div className="card p-4">
                                <h1 className='text-center'>Login</h1>
                                <Form
                                    layout='vertical'
                                >
                                    <Form.Item
                                        label="Username"
                                    >
                                        <Input placeholder='Enter your Full Name' value={state.userName} name='userName' onChange={handleChange} />
                                    </Form.Item>
                                    <Form.Item label="Email">
                                        <Input type='email' placeholder='Enter Email' value={state.email} name='email' onChange={handleChange} />
                                    </Form.Item>

                                    <Form.Item
                                        label="Password"
                                    >
                                        <Input.Password name='password' value={state.password} onChange={handleChange} />
                                    </Form.Item>

                                    <Button type='success' htmlType="submit" loading={isProcessing} onClick={handleLogin} className='w-100 btn btn-success py-0'>
                                        Login
                                    </Button>
                                </Form>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
