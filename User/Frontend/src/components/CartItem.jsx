import { useState } from "react"
import Popup from "./Popup"
import { PlusIcon } from "@heroicons/react/24/outline"
import { MinusIcon } from "@heroicons/react/20/solid"
import { useAlert } from "react-alert"
import { useSelector } from "react-redux"
import { Spinner } from "@material-tailwind/react"

const CartItem = ({ item, handleQuantity, handleRemove }) => {
    const [showPopUp, setShowPopUp] = useState(null)
    const [quantity, setQuantity] = useState(item.quantity)
    const quantityStatus = useSelector(state => state.cart.quantityStatus)
    const alert = useAlert()
    return (
        <>
            <li key={item.product?.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                        src={item.product?.thumbnail}
                        alt={item.product?.title}
                        className="h-full w-full object-cover object-center"
                    />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                                <p>{item.product?.title}</p>
                            </h3>
                            <p className="ml-4">₹{Math.round(item.product?.price * (1 - item.product?.discountPercentage / 100))}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.product?.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-900 flex">
                            Qty
                            <div className="flex">
                                <MinusIcon onClick={() => { quantity > 1 && setQuantity(prev => prev - 1); quantity > 1 ? handleQuantity(quantity - 1, item) : alert.error('Minimum 1 Quantity Required') }} className=" cursor-pointer w-6" />
                                {quantityStatus === 'loading' ? <Spinner className="w-6 h-6" /> : <p className="text-xl">{item.quantity}</p>}
                                <PlusIcon onClick={() => { quantity < item.product.stock && setQuantity(prev => prev + 1); quantity < item.product.stock ? handleQuantity(quantity + 1, item) : alert.error(`Item Stock Is ${item.product.stock}`) }} className=" cursor-pointer w-6" />
                            </div>
                        </div>

                        <div className="flex">
                            {showPopUp === item?.id && <Popup title={`Delete ${item.product?.title}`} message={'Are You Sure You Want To Delete This Cart Item'} dangerOption={'Delete'} cancelOption={'Cancel'} dangerAction={() => handleRemove(item?.id)} showPopup={showPopUp === item?.id} cancelAction={() => setShowPopUp(-1)} />}
                            <button
                                onClick={() => { setShowPopUp(item.id) }}
                                type="button"
                                className="font-medium text-red-600 hover:text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </>
    )
}

export default CartItem