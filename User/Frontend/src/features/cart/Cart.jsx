import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { deleteItemAsync, fetchItemsByUserIdAsync, updateItemAsync } from './cartSlice';
import { useEffect } from 'react';
import CartItem from '../../components/CartItem';
import { Spinner } from '@material-tailwind/react';
import { useAlert } from 'react-alert';

export function Cart() {
  const items = useSelector(state => state.cart.items)
  const status = useSelector(state => state.cart.status)
  const quantityStatus = useSelector(state => state.cart.quantityStatus)
  const dispatch = useDispatch();
  const totalAmount = items.reduce((amount, item) => Math.round(item.product?.price * (1 - item.product?.discountPercentage / 100)) * item.quantity + amount, 0);
  const totalItemCount = items.reduce((total, item) => item.quantity + total, 0);
  const alert = useAlert()

  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync())
  }, [dispatch])

  const handleQuantity = (quantity, product) => {
    dispatch(updateItemAsync({ id: product.id, quantity: quantity }))
  }
  const handleRemove = (id) => {
    dispatch(deleteItemAsync({ id: id, alert }))
  }

  return (
    <>
      {status === 'loading' ?
        <div className='flex justify-center mx-auto my-10'>
          <Spinner className="h-12 w-12" />
        </div> :
        <div className="md:mx-10 my-10 px-4 sm:px-6 bg-white py-5 ">
          <h1 className='font-bold text-2xl mx-24 md:text-4xl'>Cart</h1>
          {items.length ?
            <>
              <div className="mt-5">
                <div className="flow-root">
                  <ul role="list" className="-my-2 divide-y divide-gray-200 md:mx-24">

                    {items?.map(item => <CartItem key={item.product?.id} item={item} handleQuantity={handleQuantity} handleRemove={handleRemove} />)}
                  </ul>
                </div>
              </div>

              {quantityStatus === 'loading' ?
                <div className='flex justify-center'>

                  <Spinner className='w-12 h-12' />
                </div>
                :
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 mx-24">
                  <div className=" text-base font-medium text-gray-900 flex justify-between">
                    <p>Subtotal</p>{'  '}
                    <p>₹{totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Items</p>
                    <p>{totalItemCount}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6 flex justify-center md:mx-72">
                    <Link to="/checkout"
                      className="flex w-44 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                      <Link to={'/home'}>
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
                </div>}
            </>
            :
            <>
              <p className='justify-center text-2xl flex font-bold md:text-4xl'>No Items In Cart</p>
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
            </>
          }
        </div>
      }

    </>
  );
}
