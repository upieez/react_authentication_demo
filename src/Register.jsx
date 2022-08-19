import React, { useState } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleRegister = async () => {
        console.log('email', email)
        const data = await axios.post('/register', {
            email: email,
            password: password
        }).then(e => console.log('ehh', e))
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
