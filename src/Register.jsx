import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Register({ setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleRegister = () => {
        axios.post('/register', { email: email, password: password }).then(res => {
            setUser({ userId: res.data.userId })
            navigate('/homepage');
        });
    }

    return (
        <Stack gap={3}>
            <Typography variant='h4' component='h1' textAlign='center'>Register for an account</Typography>
            <TextField
                id="email"
                label="Enter your email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                id="password"
                label="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant='contained' onClick={handleRegister}>Register</Button>
            <Link href="/login">Already have an account? Click here</Link>
        </Stack>
    )
}
