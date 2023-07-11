import { useEffect, useState } from "react"
import { ITEMS_PER_PAGE } from '../../../app/constants'
import { fetchAllOrdersAsync, updateOrderAsync } from "../../order/orderSlice"
import { useDispatch, useSelector } from "react-redux"
import { PencilIcon } from "@heroicons/react/24/outline"
import Pagination from "../../../components/Pagination"
import { Spinner } from "@material-tailwind/react"
import { useAlert } from "react-alert"

const AdminOrders = () => {
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders.orders)
    const status = useSelector(state => state.orders.status)
    const totalOrders = useSelector(state => state.orders.totalOrders)
    const [page, setPage] = useState(1)
    const [editableOrderId, setEditableOrderId] = useState(-1)
    const alert = useAlert()

    const handleEdit = (item) => {
        setEditableOrderId(item.id)
    }

    const handleStatus = (e, order) => {
        const updatedOrder = { ...order, status: e.target.value }
        dispatch(updateOrderAsync({ order: updatedOrder, alert }))
        setEditableOrderId(-1)
    }

    const handlePaymentStatus = (e, order) => {
        const updatedOrder = { ...order, paymentStatus: e.target.value }
        dispatch(updateOrderAsync({ order: updatedOrder, alert }))
        setEditableOrderId(-1)
    }

    const handlePage = (page) => {
        setPage(page)
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchAllOrdersAsync(pagination))
    }

    const handleColor = (status) => {
        switch (status) {
            case "pending":
                return "bg-purple-200 text-purple-600"
            case "dispatched":
                return "bg-yellow-200 text-yellow-600"
            case "delievered":
                return "bg-green-200 text-green-600"
            case "received":
                return "bg-green-200 text-green-600"
            case "cancelled":
                return "bg-red-200 text-red-600"
            default:
                break;
        }
    }

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchAllOrdersAsync(pagination))
    }, [dispatch, page])

    return (
        <div>
            {status === 'loading' ?
                <div className="flex justify-center">
                    <Spinner className="h-12 w-12" />
                </div>
                :
                orders?.length > 0 ?
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-16">
                        <table className="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="text-center">Order Number</th>
                                    <th className="py-3 px-6 text-center">Items</th>
                                    <th className="py-3 px-6 text-center">Total Amount</th>
                                    <th className="py-3 px-6 text-center">Shipping Address</th>
                                    <th className="py-3 px-6 text-center">Status</th>
                                    <th className="py-3 px-6 text-center">Payment Method</th>
                                    <th className="py-3 px-6 text-center">Payment Status</th>
                                    <th className="py-3 px-6 text-center">Order Time</th>
                                    <th className="py-3 px-6 text-center">Last Update</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="px-6 text-center py-4">{order.id}</td>
                                            <td className="px-6 py-4">
                                                {order.items.map((item, index) => {
                                                    return (
                                                        <div key={index} className="flex items-center">
                                                            <span>
                                                                {item.product.title} - {item.quantity}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </td>
                                            <td className="px-6 text-center py-4">₹{order.totalAmount}</td>
                                            <td className="px-6 text-center py-4">
                                                <div>
                                                    <div>
                                                        <strong>{order.selectedAddress?.name}</strong>
                                                    </div>
                                                    <div>{order.selectedAddress?.email}</div>
                                                    <div>{order.selectedAddress?.phone}</div>
                                                    <div>{order.selectedAddress?.address}</div>
                                                    <div>{order.selectedAddress?.city}</div>
                                                    <div>{order.selectedAddress?.state}</div>
                                                    <div>{order.selectedAddress?.pincode}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 text-center py-4">
                                                {order.id === editableOrderId ? (
                                                    <select onChange={(e) => handleStatus(e, order)}>
                                                        <option value={''}>Select Action</option>
                                                        <option value={'pending'}>Pending</option>
                                                        <option value={'dispatched'}>Dispatched</option>
                                                        <option value={'delivered'}>Delivered</option>
                                                        <option value={'cancelled'}>Cancelled</option>
                                                    </select>
                                                ) : (
                                                    <span
                                                        className={`${handleColor(order.status)} py-1 px-3 rounded-full text-xs`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 text-center py-4">{order.paymentMethod}</td>
                                            <td className="px-6 text-center py-4">
                                                {order.id === editableOrderId ? (
                                                    <select onChange={(e) => handlePaymentStatus(e, order)}>
                                                        <option value={''}>Select Action</option>
                                                        <option value={'pending'}>Pending</option>
                                                        <option value={'received'}>Received</option>
                                                    </select>
                                                ) : (
                                                    <span
                                                        className={`${handleColor(order.paymentStatus)} py-1 px-3 rounded-full text-xs`}
                                                    >
                                                        {order.paymentStatus}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 text-center py-4">{order.createdAt ? new Date(order.createdAt).toLocaleString() : null}</td>
                                            <td className="px-6 text-center py-4">{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}</td>
                                            <td className="px-6 text-center py-4">
                                                <div className="flex item-center justify-center">
                                                    <div className="w-8 cursor-pointer transform hover:text-blue-500 hover:scale-110">
                                                        <PencilIcon className="h-6 w-6" onClick={() => handleEdit(order)} />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Pagination handlePage={handlePage} totalItems={totalOrders} page={page} setPage={setPage} />
                    </div>
                    :
                    <div className="flex justify-center">
                        <p>No Orders</p>
                    </div>
            }
        </div>

    )
}

export default AdminOrders