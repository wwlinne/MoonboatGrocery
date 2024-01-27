import{ NavLink,Route, Routes  } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import ListUser from "../components/backend/listUser";
import CreateUser from "../components/backend/createUser";
import EditUser from "../components/backend/editUser";



export default function APPAccount(){
    return(
        <div className='block '>
            <div className='container'>
            <h2>Admin Panel</h2>
            <div className='card'>
                <Row gutter={[24,24]}>
                    <Col xs={24 } sm={24} md={12} lg={8}>
                    <Card
                        title="CHECK"
                        bordered={false}
                        style={{width: 300,
                        }}
                    >
                        <p><NavLink to='../components/backend/user'>Check User Accounts</NavLink></p>
                        <p>Manage website user accounts, administrate user profiles and settings with ease, ensuring a seamless user experience.</p>
                    </Card>
                    </Col>
                    <Col xs={8} md={8}>
                    <Card
                        title="CREATE"
                        bordered={false}
                        style={{width: 300,
                        }}
                    >
                        <p><NavLink to='../components/backend/user/create'>Create New Account</NavLink></p>
                        <p>Create a new account to access exclusive features, personalized recommendations, and member-only discounts, enhancing your shopping journey.</p>
                    </Card>
                    </Col>
                    <Col xs={24} md={8}>
                    <Card
                        title="UPDATE"
                        bordered={false}
                        style={{width: 300,
                        }}
                    >
                        <p><NavLink to='../components/backend/user/:id/edit'>Modifiy Existed Account</NavLink></p>
                        <p>Update user address and payment methods to ensure accurate and secure transactions, providing peace of mind while enjoying the shopping experience. </p>
                    </Card>
                    </Col>
                </Row>
           

                <Routes>
                    <Route path="backend/user" element={<ListUser />} />
                    <Route path="backend/user/create" element={<CreateUser />} />
                    <Route path="backend/user/:id/edit" element={<EditUser />} />
                </Routes>
            </div>
        </div>
        </div>
        
    )
}