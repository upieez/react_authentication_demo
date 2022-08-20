import React from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Homepage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios
            .post('/logout')
            .then(res => {
                navigate(`${res.data.redirect}`);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>This is homepage</h1>
            <div>
                <Button variant='contained' color='error' onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}
