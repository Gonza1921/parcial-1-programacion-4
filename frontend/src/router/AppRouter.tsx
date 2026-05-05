import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Layout } from '../layout/Layout'
import { CategoriasPage } from '../pages/CategoriasPage'
import { IngredientesPage } from '../pages/IngredientesPage'
import { ProductosPage } from '../pages/ProductosPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/categorias" replace /> },
      { path: 'categorias', element: <CategoriasPage /> },
      { path: 'ingredientes', element: <IngredientesPage /> },
      { path: 'productos', element: <ProductosPage /> },
    ],
  },
])

export const AppRouter = () => <RouterProvider router={router} />
