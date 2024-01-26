import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

export default function CreateUser(){
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setInputs(inputs => ({...inputs, [name]: value}));        
    }

    const handleSubmit = async (values) => {
        try {
            const data = {...inputs, type: 'user'};

        await axios.post('http://localhost/MoonboatGrocery/user/save', data).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        } catch (error) {
          console.error("Error submitting data:", error);
        }
    };
    const handleGoBack = () => {
        navigate('/');
    };
    const prefixSelector = (
        <span>
            <Form.Item name="prefix" noStyle>
                <Select
                    style={{
                        width: 70,
                    }}
                >
                    <Option value="1">+1</Option>
                </Select>
            </Form.Item>
        </span>
    );
    
    return(
        <div className="block">
            <div className="container">
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Please input your username!',
                        }]}
                    >
                        <Input name="name" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Please input your email!',
                        }]}
                    >
                        <Input name="email" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="phone"
                        name="phone"
                        rules={[{
                            required: true,
                            message: 'Please input your phone!',
                        }]}
                    >
                        <Input
                            name="phone"
                            addonBefore={prefixSelector}
                            style={{width: '100%'}}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{
                            required: true,
                            message: 'Please input your password!',
                        }]}
                    >
                        <Input.Password name="password" onChange={handleChange} />
                    </Form.Item>

                   
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="primary" onClick={handleGoBack}>
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
