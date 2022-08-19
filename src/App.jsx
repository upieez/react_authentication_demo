import React, { useState } from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

import Homepage from './Homepage.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import ProtectedRoute from './ProtectedRoute.jsx';
import useAuth from './hooks/useAuth.js';

const App = () => {
    const { user, setUser } = useAuth();

    return (
        <Box p={4}>
            <Container maxWidth='sm'>
                <Routes>
                    <Route path='/login' element={<Login setUser={setUser} />} />
                    <Route path='/register' element={<Register />} />
                    <Route element={<ProtectedRoute user={user} />}>
                        <Route path='/homepage' element={<Homepage />} />
                        <Route path='/people' element={<Homepage />} />
                    </Route>
                </Routes>
            </Container>
        </Box>
    )
}

export default App