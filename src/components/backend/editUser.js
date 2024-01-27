import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;

function EditUser(){

    const [inputs, setInputs] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();}, []);

    function getUser() {
        axios.get(`http://localhost/MoonboatGrocery/user/${id}`).then(function(response) {
            console.log(response.data);
            setInputs(response.data);
        });}

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}
const handleGoBack = () => {
    navigate('/components/backend/user');
};
 const handleSubmit = async (values) => {
    try {
     axios.put(`http://localhost/MoonboatGrocery/user/${id}/edit`, inputs).then(function(response){
        console.log(response.data);
        navigate('/components/backend/user');
    });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
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
            <h2>Update Account</h2>

                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={inputs} 
                    autoComplete="on"
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
                        <Input value={inputs.name} name="name" onChange={handleChange} />
                    </Form.Item>
                    <Form.Item
                        label="email"
                        name="email"
                        rules={[{
                            required: true,
                            message: 'Please input your email!',
                        }]}
                    >
                        <Input value={inputs.email} name="email" onChange={handleChange} />
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
                            Update
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
export default EditUser;