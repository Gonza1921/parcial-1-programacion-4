import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './layout/Layout'
import { CategoriasPage } from './pages/CategoriasPage'
import { ProductosPage } from './pages/ProductosPage'
import { MaterialesPage } from './pages/MaterialesPage'
import { NotFound } from './pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
})

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<CategoriasPage />} />
            <Route path='/productos' element={<ProductosPage />} />
            <Route path='/materiales' element={<MaterialesPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}
