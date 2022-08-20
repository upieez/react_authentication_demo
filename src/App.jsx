import React, { useState, useEffect } from 'react'
import {
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Homepage from './Homepage.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'

const ProtectedRoute = (props) => {
    const userId = props.userId

    if (userId) {
        return props.children
    } else {
        return <Navigate to="/" replace={true} />
    }
}

const App = () => {
    const [user, setUser] = useState(() => {
        const userId = Cookies.get('userId')
        if (userId) {
            return { userId: userId }
        }
        return { userId: '' }
    })
    const navigate = useNavigate();

    useEffect(() => {
        if (user.userId) {
            axios.get('/verify').then(res => {
                if (res.data.redirect) {
                    navigate(`${res.data.redirect}`, { replace: true })
                }
            });
        }
    }, [navigate])

    return (
        <Box p={4}>
            <Container maxWidth='sm'>
                <Routes>
                    <Route path="login" element={<Login setUser={setUser} />} />
                    <Route path="register" element={<Register setUser={setUser} />} />
                    <Route
                        path="homepage"
                        element={
                            <ProtectedRoute userId={user.userId}>
                                <Homepage />
                            </ProtectedRoute>}
                    />
                </Routes>
            </Container>
        </Box>
    )
}

export default App