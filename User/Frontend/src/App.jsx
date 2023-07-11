import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/SignUpPage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ProductDetailsPage from './pages/ProductDetailsPage'
import Protected from './features/auth/components/Protected'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice'
import ErrorPage from './pages/ErrorPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import UserOrdersPage from './pages/UserOrdersPage'
import UserProfilePage from './pages/UserProfilePage'
import { fetchLoggedInUserAsync, fetchLoggedInUserOrdersAsync } from './features/user/userSlice'
import SignOut from './features/auth/components/SignOut'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import { checkAuthAsync } from './features/auth/authSlice'
import StripeCheckout from './pages/StripeCheckout'
import ResetPassword from './features/auth/components/ResetPassword'
import { Spinner } from '@material-tailwind/react'
import Login from './features/auth/components/Login'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.loggedInUser)
  const status = useSelector(state => state.auth.status)

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync())
    }
  }, [dispatch, user])

  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync())
      dispatch(fetchLoggedInUserOrdersAsync())
    }
  }, [dispatch, user])

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
          <Route path="/home" element={<Protected><Home /></Protected>} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/my-cart" element={<Protected><CartPage /></Protected>} />
          <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
          <Route path="/product-details/:id" element={<Protected><ProductDetailsPage /></Protected>} />
          <Route path="/order-success/:id" element={<Protected><OrderSuccessPage /></Protected>} />
          <Route path="/my-orders" element={<Protected><UserOrdersPage /></Protected>} />
          <Route path="/user-profile" element={<Protected><UserProfilePage /></Protected>} />
          <Route path="/stripe-checkout" element={<Protected><StripeCheckout /></Protected>} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-user-password" element={<ResetPassword />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
