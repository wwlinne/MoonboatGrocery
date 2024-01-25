import { Button, Form, Input, Select } from 'antd';
const { Option } = Select;
const { TextArea } = Input;
function AppContact(){
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
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 16,
                    }}
                    style={{
                    maxWidth: 600,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                
                    autoComplete="off"
                    layout='vertical'
                    size='large'
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
                    <Input />
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
                    <Input />
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
                        addonBefore={prefixSelector}
                        style={{
                            width: '100%',
                        }}
                        />
                    </Form.Item>

                    <Form.Item
                     name="message"
                     label="Message"
                     rules={[
                     {
                         required: true,
                         message: 'Please input your message!',
                     },
                     ]}>
                    <TextArea rows={4} />

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