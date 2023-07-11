import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { updateUserAsync } from '../features/user/userSlice';
import { useState } from 'react';
import { createOrderAsync } from '../features/order/orderSlice';
import { useAlert } from 'react-alert';

const Checkout = () => {
    const items = useSelector(state => state.cart.items)
    const dispatch = useDispatch();
    const totalAmount = items.reduce((amount, item) => Math.round(item.product.price * (1 - item.product.discountPercentage / 100)) * item.quantity + amount, 0);
    const totalItemCount = items.reduce((total, item) => item.quantity + total, 0);
    const user = useSelector(state => state.user.userInfo)
    const currentOrder = useSelector(state => state.orders.currentOrder)
    const [addAddressForm, setAddAddressForm] = useState(false)
    const alert = useAlert()
    const { register, handleSubmit, reset } = useForm();

    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState('cash')

    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value])
    }
    const handlePaymentMethod = (e) => {
        setPaymentMethod(e.target.value)
    }
    const handleOrder = () => {
        if (selectedAddress && paymentMethod) {
            const order = { items, totalAmount, totalItemCount, user: user.id, paymentMethod, selectedAddress, status: 'pending' }
            dispatch(createOrderAsync(order))
        }
        else {
            alert.error('Enter Address and Payment method');
        }
    }

    return (
        <>
            {currentOrder && currentOrder.paymentMethod === 'cash' && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            {currentOrder && currentOrder.paymentMethod === 'card' && <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>}

            <div className=" shadow-xl mx-6 py-6 mt-28  px-4 sm:px-6 lg:px-8 lg:max-w-2xl lg:mx-80">
                <div className="gap-x-8 gap-y-10 lg:max-w-lg">
                    <div className="">
                        {addAddressForm && <form className='bg-white px-7 py-7' noValidate onSubmit={handleSubmit((data) => {
                            dispatch(updateUserAsync({ ...user, addresses: [...user.addresses, data] }))
                            setAddAddressForm(false)
                            reset()
                        })}>
                            <div className="">
                                <div className=" border-gray-900/10  pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                                    <div className="mt-10 ">
                                        <div className="sm:col-span-4">
                                            <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                                                Full name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', { required: 'Name Is Required' })}
                                                    id="fullname"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', { required: 'Email Is Required' })}
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone:
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register('phone', { required: 'Phone Number Is Required' })}
                                                    id="phone"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Street address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('address', { required: 'Address Is Required' })}
                                                    id="address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2 sm:col-start-1">
                                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                                City
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('city', { required: 'City Is Required' })}

                                                    id="city"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                                                State / Province
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('state', { required: 'State Is Required' })}
                                                    id="state"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                                ZIP / Postal code
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('pincode', { required: 'Pincode Is Required' })}
                                                    id="pincode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <div className="mt-6 flex items-center justify-end gap-x-6">
                                        <button type="button" onClick={() => setAddAddressForm(false)} className="text-sm font-semibold leading-6 text-gray-900">
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>}

                        {/* Existing address */}
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Choose From Existing
                            <button
                                type="submit"
                                onClick={() => setAddAddressForm(true)}
                                className="rounded-md text-indigo-500 px-3 py-2 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Add Address
                            </button>
                        </p>

                        <ul role="list" className="divide-y divide-gray-100">
                            {user.addresses?.map((address, index) => (
                                <li key={index} className="flex  gap-x-6 py-5 justify-between">
                                    <div className="flex gap-x-4 ">
                                        <input
                                            name='address'
                                            onChange={(e) => handleAddress(e)}
                                            value={index}
                                            type="radio"
                                            className="h-4 w-4 mt-7 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <div className="min-w-0 flex-auto">
                                            <p className="text-sm font-semibold leading-6 text-gray-900">{address?.name}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.address}</p>
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address?.pincode}</p>
                                        </div>
                                    </div>
                                    <div className=" sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">Phone: {address?.phone}</p>
                                        <p className="text-sm leading-6 text-gray-900">City: {address?.city}</p>
                                        <p className="text-sm leading-6 text-gray-900">State: {address?.state}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* payment method  */}
                        <div className="mt-10 space-y-10">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Choose One Payment Method</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="cash"
                                            onChange={handlePaymentMethod}
                                            value={'cash'}
                                            name="payments"
                                            checked={paymentMethod === 'cash'}
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                            Cash On Delievery
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="card"
                                            onChange={handlePaymentMethod}
                                            value={'card'}
                                            checked={paymentMethod === 'card'}
                                            name="payments"
                                            type="radio"
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                        <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                            Card
                                        </label>
                                    </div>

                                </div>
                            </fieldset>
                            <div className="mt-6 flex justify-center md:mx-72">
                                <button
                                    type='submit'
                                    onClick={handleOrder}
                                    className="flex w-44 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* {!items.length && <Navigate to={'/home'} replace={true}></Navigate>} */}
                    {/* <div className="lg:col-span-3">
                        <div className="mx-10 max-w-5xl  px-4 sm:px-6 bg-white py-5">
                            <h1 className='font-bold text-2xl'>Cart</h1>
                            <div className="mt-5">
                                <div className="flow-root">
                                    <ul role="list" className="-my-2 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item.product.id} className="flex py-6">
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
                                                        <p className="mt-1 text-sm text-gray-500">{item.product.color}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            Qty
                                                            <select onChange={(e) => handleQuantity(e, item.product)} value={item.product.quantity}>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                                <option value={3}>3</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex">
                                                            <button
                                                                onClick={() => dispatch(deleteItemAsync(item.product.id))}
                                                                type="button"
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Remove
                                                            </button>
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
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total Items In Cart</p>
                                    <p>{totalItemCount} Items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <button
                                        onClick={handleOrder}
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Order Now
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to={'/'}>
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Cart />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Checkout