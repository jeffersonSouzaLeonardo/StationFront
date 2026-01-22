import React from 'react'
import Box from '@mui/material/Box'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <AppRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  )
}
