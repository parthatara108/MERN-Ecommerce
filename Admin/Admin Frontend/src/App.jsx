import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import AdminHome from "./pages/AdminHome"
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin"
import Login from "./features/auth/components/Login"
import AdminProductFormPage from "./pages/AdminProductFormPage"
import AdminOrdersPage from "./pages/AdminOrdersPage"
import SignOut from "./features/auth/components/SignOut"
import ErrorPage from "./pages/ErrorPage"
import { useEffect } from "react"
import { fetchAdminAsync } from "./features/user/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { checkAuthAsync } from "./features/auth/authSlice"
import { Spinner } from "@material-tailwind/react"
import AdminCategoryFormPage from "./pages/AdminCategoryFormPage"
import AdminCategoryPage from "./pages/AdminCategoryPage"
import BrandForm from "./features/admin/components/BrandForm"
import AdminBrandPage from "./pages/AdminBrandPage"
import AdminBrandFormPage from "./pages/AdminBrandFormPage"

function App() {
  const user = useSelector(state => state.auth.loggedInAdmin)
  const status = useSelector(state => state.auth.status)
  const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(fetchAdminAsync())
    }
  }, [dispatch, user])

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])



  if (status === 'loading') {
    return (
      <div className="flex justify-center">
        <Spinner className="h-12 w-12" />
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<ProtectedAdmin><AdminHome /></ProtectedAdmin>} />
          <Route path="/admin/product-form" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
          <Route path="/admin/category-form" element={<ProtectedAdmin><AdminCategoryFormPage /></ProtectedAdmin>} />
          <Route path="/admin/brand-form" element={<ProtectedAdmin><AdminBrandFormPage /></ProtectedAdmin>} />
          <Route path="/admin/product-form/edit/:id" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
          <Route path="/admin/orders" element={<ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>} />
          <Route path="/admin/categories" element={<ProtectedAdmin><AdminCategoryPage /></ProtectedAdmin>} />
          <Route path="/admin/brands" element={<ProtectedAdmin><AdminBrandPage /></ProtectedAdmin>} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
