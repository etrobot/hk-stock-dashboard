import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MainLayout } from './app/components/main-layout.tsx'
import './app/globals.css'
import React from 'react'
// import React from 'react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  </StrictMode>,
)