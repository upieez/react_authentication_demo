import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Homepage from './Homepage.jsx'



const App = () => {
    const [text, setText] = useState()

    return (
        <Box p={4}>
            <Container maxWidth='sm'>
                <Paper>
                    <Box p={2}>
                        {text}
                    </Box>
                </Paper>
                <Stack spacing={2} direction="row" mt={2}>
                    <TextField
                        id="chat-box"
                        label="Enter your text"
                        fullWidth

                    />
                    <Link to='/api'><Button variant='contained'>Send</Button></Link>
                </Stack>
            </Container>
            <Routes>
                <Route path="/api" element={<Homepage />} />
            </Routes>
        </Box>
    )
}

export default App