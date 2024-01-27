import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';

export default function CreateProduct(){
    const [inputs, setInputs] = useState([]);
    const navigate = useNavigate();

    const handleChange = (event) =>{
        const { name, value, files} = event.target;
        const newValue = files ? files[0].name : value;
        setInputs(inputs => ({...inputs, [name]: newValue}));    
    }

    const handleSubmit = async () => {
        try {
        await axios.post('http://localhost/MoonboatGrocery/product/save', inputs).then(function(response){
            console.log(response.data);
            navigate('../components/backend/product');
        });
        } catch (error) {
          console.error("Error submitting data:", error);
        }
    };
    const handleGoBack = () => {
        navigate('/pages/shop');
    };
   
   
    return(
        <div className="block">
            <div className="container">
            <h2>Create New Product</h2>

                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    autoComplete="on"
                    onFinish={handleSubmit}
                    enctype="multipart/form-data"
                >
                    <Form.Item  label="cate_id" name="cate_id" rules={[{
                            required: true,
                            message: 'Please input the product category id!',
                        }]}
                    >
                        <Input name="cate_id" onChange={handleChange} autoComplete='on'/>
                    </Form.Item>
                    <Form.Item label="name" name="name" rules={[{
                            required: true,
                            message: 'Please input the product name!',
                        }]}
                    >
                          <Input name="name" onChange={handleChange} autoComplete='on'/>
                    </Form.Item>
                    <Form.Item label="price" name="price" rules={[{
                            required: true,
                            message: 'Please input product price!',
                        }]}
                    >
                        <Input name="price" onChange={handleChange} autoComplete='on'/>
                    </Form.Item>
                    <Form.Item label="desc" name="desc" rules={[{
                            required: true,
                            message: 'Please input product description!',
                        }]}
                    >
                        <Input name="desc" style={{width: '100%'}} onChange={handleChange} autoComplete='on' />
                    </Form.Item>
                    <Form.Item label="picture" name="img">
                        <Input name= 'img' type='file' style={{width: '100%'}} onChange={handleChange} ></Input>
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
