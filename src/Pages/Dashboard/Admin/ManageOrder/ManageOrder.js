import React, { useEffect, useState } from 'react';
import { Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useHistory, useLocation } from 'react-router';

const ManageOrders = () => {

    const location = useLocation();
    const history = useHistory();

    const redirect_url = location.state?.from || '/manageOrders';

    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => setOrders(data));
    }, [])


    const handleDelete = id => {
        const confirmation = window.confirm('Do you want to delete?');

        if (confirmation == true) {
            const url = `http://localhost:5000/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            }, [])
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        alert('Deleted Successfully');
                        history.push(redirect_url);
                        const remaining = orders.filter(order => order._id !== id);
                        setOrders(remaining);
                    }
                })
        }
    }

    return (
        <div className='container'>
            <h2>All Orders{orders.length}</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Serial</th>
                        <th>Product Name</th>
                        <th>Email</th>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {orders?.map((pd, index) => (
                    <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{pd?.productName}</td>
                            <td>{pd?.email}</td>
                            <td>{pd?.customerName}</td>
                            <td>{pd?.address}</td>

                            <Link style={{textDecoration: 'none'}} to={`allOrder/updateStatus/${pd._id}`}>
                                <Button variant='contained'>{pd?.status || 'Pending'}</Button>
                            </Link>

                            <Button onClick={() => handleDelete(pd._id)} underline="none" variant='contained' color='error' sx={{mt:1}}>Delete</Button>

                        </tr>
                    </tbody>
                ))}
            </Table>

        </div>
    );
};

export default ManageOrders;
