import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Fuel from './modules/stock/fuel/find/fuelFindController'
import FuelNewController from './modules/stock/fuel/create/fuelNewController'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/fuel" element={<Fuel />} />
      <Route path="/fuel/new" element={<FuelNewController />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
