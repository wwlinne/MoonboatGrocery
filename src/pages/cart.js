import axios from "axios";
import { useEffect, useState } from "react";
import { Space, Table } from 'antd';

// Function to handle delete action


export default function AppCart() {
    const [items, setItems] = useState([]);
    const columns = [
       
        {
            title: 'Name',
            dataIndex: 'productName',
            key: 'productName',
            render: (text) => <a >{text}</a>
        },
        {
            title: 'Product',
            dataIndex: 'productImage',
            key: 'productImage',
            render: (text) => <img src={`/images/${text}`} alt="Product" style={{ maxWidth: '100px' }} />
        },
        {
            title: 'Quantity',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Prodcut Price',
            dataIndex: 'productPrice',
            key: 'productPrice',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleDelete(record)}>Delete</a> {/* Call handleDelete function with the record */}
                </Space>
            ),
          },
    ];

    useEffect(() => {
        getItems();
    }, []);

    const handleDelete = (item) => {
        axios.delete(`http://localhost/MoonboatGrocery/shopping_cart/${item.id}/delete`)
            .then(response => {
                getItems();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });
    };

    function getItems() {
        axios.get('http://localhost/MoonboatGrocery/shopping_cart')
        .then(function(response) {
            const cartItems = response.data;
            // Extracting product IDs from cart items
            const productIds = cartItems.map(item => item.product_id);
            // Fetch product details for each product ID
            axios.get('http://localhost/MoonboatGrocery/products', {
                params: {
                    ids: productIds.join(',') // Pass product IDs as comma-separated string
                }
            })
            .then(function(productResponse) {
                const productsMap = {};
                // Create a map of product IDs to product details for easy lookup
                productResponse.data.forEach(product => {
                    // Store both name and price separately
                    productsMap[product.id] = {
                        name: product.name,
                        price: product.price,
                        img:product.img // Ensure to retrieve product.img
                    };
                });
                // Update cart items with product names and prices
                const updatedItems = cartItems.map(item => ({
                    ...item,
                    productName: productsMap[item.product_id].name,
                    productPrice: productsMap[item.product_id].price,
                    productImage: productsMap[item.product_id].img
                }));
                setItems(updatedItems);
            })
            .catch(function(error) {
                console.error('Error fetching product details:', error);
            });
        })
        .catch(function(error) {
            console.error('Error fetching items:', error);
        });
    }
    
  
    return (
        <div className="block">
            <div className="container">
                <Table columns={columns} dataSource={items} />
            </div>
        </div>
    );
}
