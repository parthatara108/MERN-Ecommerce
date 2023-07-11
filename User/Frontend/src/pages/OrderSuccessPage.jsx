import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { resetCartAsync } from "../features/cart/cartSlice"
import { confirmOrderAsync, resetOrder } from "../features/order/orderSlice"

const OrderSuccessPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const currentOrder = useSelector(state => state.orders.currentOrder)

    useEffect(() => {
        dispatch(confirmOrderAsync(currentOrder)).then(() => {
            dispatch(resetOrder())
        })
    }, [])

    useEffect(() => {
        dispatch(resetCartAsync())
    }, [])

    return (
        <main className="grid min-h-full py-52 place-items-center bg-white px-6 sm:py-32 lg:px-8">
            <div className="text-center sm:mt-36">
                <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
                <h1 className="mt-4 max-w-6xl text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl overflow-x-auto">Order Number #{params.id}</h1>
                <p className="mt-6 text-base leading-7 text-gray-600">You can check your order in My Orders </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/home"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back home
                    </Link>
                    <div className=" mb-28 sm:mb-36"></div>
                </div>
            </div>
        </main>
    )
}

export default OrderSuccessPage