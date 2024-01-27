import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Route, Routes, NavLink } from "react-router-dom";
import { Button, Row, Col } from 'antd';
import CreateProduct from './createProduct';

export default function ProductList() {
    const navigate = useNavigate();  
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost/MoonboatGrocery/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

        const deleteProduct = (id) => {
            axios.delete(`http://localhost/MoonboatGrocery/product/${id}/delete`).then(function(response){
                console.log(response.data);
                fetchProducts();
            });
        }
        const handleEdit = (productId) => {
            navigate(`${productId}/edit`);
        };
    return (
        <div className="block">
            <div className='container'>
                <h2>Items</h2>
                <Button><NavLink to='../components/backend/product/create'>Create New Product</NavLink></Button>
                <Row gutter={24}>{
                products.map(product =>{
                        return(
                        <Col lg={6} key={product.key}>
                        <div className='content'>
                        <div className='image'>
                        <img src={`/images/${product.img}`} alt={product.name} />
                        </div>
                        <h3 className='exception'>{product.name}</h3>
                        <Button type="primary" style={{marginRight: "10px"}} onClick={() => handleEdit(product.id)}>
                                 Edit</Button>
                    <Button type="primary" onClick={() => deleteProduct(product.id)}>Delete</Button>
                          </div>
                </Col>
                        )
                    })
}
                
            </Row>

            <Routes>
                    <Route path="backend/product/create" element={<CreateProduct />} />

            </Routes>
            </div>
        </div>
    );
}
