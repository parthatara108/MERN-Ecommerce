import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchLoggedInUserOrdersAsync } from "../userSlice"
import { Link } from "react-router-dom"
import { Spinner } from "@material-tailwind/react"

const UserOrders = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.user.userInfo?.orders)
    const status = useSelector(state => state.user.status)

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync())
    }, [dispatch])

    return (
        <div className="min-h-screen bg-gray-50">
            <h1 className="mx-10 font-bold text-2xl">My Orders</h1>
            {
                status === 'loading' ?
                    <div className="flex justify-center"><Spinner className="w-12 h-12" /></div>
                    :
                    orders?.length > 0 ? orders?.map((order, index) => {
                        return (
                            <div key={index}>
                                <div className="mx-10 my-10 max-w-5xl bg-white  px-4 sm:px-6 shadow-md rounded-xl py-5">
                                    <h1 className='font-bold text-sm' >Order #{order.id}</h1>
                                    <h1 className='font-bold'>Order Status: {order.status}</h1>

                                    <div className="mt-5">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-2 divide-y divide-gray-200">
                                                {order.items.map((item) => (
                                                    <li key={item.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={item.product.thumbnail}
                                                                alt={item.product.title}
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <p>{item.product.title}</p>
                                                                    </h3>
                                                                    <p className="ml-4">₹{Math.round(item.product.price * (1 - item.product.discountPercentage / 100))}</p>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="text-gray-500">
                                                                    Qty:{item.quantity}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>₹{order.totalAmount}</p>
                                        </div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Total Items</p>
                                            <p>{order.items?.length} Items</p>
                                        </div><br />
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping Address:</p>
                                        <div className="border px-2">
                                            <li className="flex justify-between gap-x-6 py-5">
                                                <div className="flex gap-x-4 ">

                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectedAddress?.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress?.address}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectedAddress?.pincode}</p>
                                                    </div>
                                                </div>
                                                <div className=" sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900">Phone: {order.selectedAddress?.phone}</p>
                                                    <p className="text-sm leading-6 text-gray-900">City: {order.selectedAddress?.city}</p>
                                                    <p className="text-sm leading-6 text-gray-900">State: {order.selectedAddress?.state}</p>
                                                </div>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                        : <>
                            <p className='justify-center flex font-bold text-5xl'>No Orders</p>
                            <div className='flex justify-center mt-5'>
                                <Link to={'/home'}>
                                    <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </Link>
                            </div>
                        </>}
        </div>
    )
}

export default UserOrders