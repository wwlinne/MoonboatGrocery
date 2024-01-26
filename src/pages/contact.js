import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
function AppContact(){

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) =>{
        const { name, value } = event.target;
        setInputs(inputs => ({...inputs, [name]: value}));        
    }
    const handleSubmit = async (values) => {
        try {
          
            const data = {...inputs, type: 'contact'};
        await axios.post('http://localhost/MoonboatGrocery/contact_info/save', data).then(function(response){
            console.log(response.data);
            navigate('/');
        });
        } catch (error) {
          console.error("Error submitting data:", error);
        }
    };
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
          <Select
            style={{
              width: 70,
            }}
          >
            <Option value="1">+1</Option>
          </Select>
        </Form.Item>
      );
    return(
        <div className='block contactPage'>
            <div className='container'>
                <h2>Contact</h2>
                <Form
                    name="basic"
                    labelCol={{span: 8,}}
                    wrapperCol={{span: 16,}}
                    style={{maxWidth: 600,}}
                    initialValues={{remember: true,}}
                    autoComplete="off"
                    layout='vertical'
                    size='large'
                    onFinish={handleSubmit}
                >
                    <Form.Item
                    label="Fullname"
                    name="Fullname"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your full name!',
                        },
                    ]}
                    >
                    <Input name="name" onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                    label="Email"
                    name="Email"
                    rules={[
                        {
                        required: true,
                        type:'email',
                        message: 'Please input your email address!',
                        },
                    ]}
                    >
                    <Input name="email" onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        ]}
                    >
                        <Input
                         name="phone"
                         addonBefore={prefixSelector}
                         style={{width: '100%'}}
                         onChange={handleChange}
                        />
                    </Form.Item>

                    <Form.Item
                     name="message"
                     label="msg"
                     rules={[
                     {
                         required: true,
                         message: 'Please input your message!',
                     },
                     ]}>
                    <TextArea name="msg" rows={4} />

                    </Form.Item>
                    <Form.Item
                 
                    >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
export default AppContact;