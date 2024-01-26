    import axios from "axios"
    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { Button } from 'antd';
    import { Space, Table, Tag } from 'antd';

    
    export default function ListUser() {
        const navigate = useNavigate();  
        const [users, setUsers] = useState([]);
        useEffect(() => {
            getUsers();
        }, []);
 
    function getUsers() {
        axios.get('http://localhost/MoonboatGrocery/user').then(function(response) {//the problem is I add an / after 'user'
            console.log(response.data);
            setUsers(response.data);
        });
    }
    const deleteUser = (id) => {
        axios.delete(`http://localhost/MoonboatGrocery/user/${id}/delete`).then(function(response){
            console.log(response.data);
            getUsers();
        });
    }
    const handleEdit = (userId) => {
        navigate(`${userId}/edit`);
    };
    
    return (
        <div className="block">
            <div className="container">
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user, key) =>
                        <tr key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                            <Button type="primary" style={{marginRight: "10px"}} onClick={() => handleEdit(user.id)}>
                                 Edit</Button>
                            <Button type="primary" onClick={() => deleteUser(user.id)}>Delete</Button>
                            
                            </td>
                        </tr>
                    )}
                    
                </tbody>
            </table>
                </div>
        </div>
    );
}

