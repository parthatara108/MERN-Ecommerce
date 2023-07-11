import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Popup from '../../../components/Popup';
import { Spinner } from '@material-tailwind/react';
import { useAlert } from 'react-alert';

export default function UserProfile() {
  const user = useSelector(state => state.user.userInfo)
  const status = useSelector(state => state.user.status)
  const dispatch = useDispatch()
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1)
  const [addAddressForm, setAddAddressForm] = useState(false)
  const { register, handleSubmit, setValue, reset } = useForm();
  const [showPopUp, setShowPopUp] = useState(null)
  const alert = useAlert()

  const handleEdit = (data, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1, data)
    dispatch(updateUserAsync({ update: newUser, alert }))
    setSelectedEditIndex(-1)
  }
  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] }
    newUser.addresses.splice(index, 1)
    dispatch(updateUserAsync({ update: newUser, alert }))
  }
  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] }
    dispatch(updateUserAsync({ update: newUser, alert }))
    setAddAddressForm(false)
    setShowPopUp(-1)
  }
  const handleEditFrom = (index) => {
    const address = user.addresses[index]
    setValue('name', address.name)
    setValue('email', address.email)
    setValue('phone', address.phone)
    setValue('address', address.address)
    setValue('city', address.city)
    setValue('state', address.state)
    setValue('pincode', address.pincode)
    setSelectedEditIndex(index)
  }

  return (
    <>

      {status === 'loading' ?
        <div className='flex justify-center'>
          <Spinner className='w-12 h-12' />
        </div>
        :
        <div className=' min-h-screen bg-gray-50'>
          <h1 className="mx-10 font-bold text-2xl">My Profile</h1>
          <div className="mx-10 my-10 max-w-5xl shadow-md  px-4 sm:px-6 rounded-xl bg-white py-5">
            <h1 className='font-bold'>Email: {user.email}</h1>

            <div className=" border-gray-200 px-4 py-6 sm:px-6">
              <button
                onClick={() => setAddAddressForm(true)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500 mr-4"
              >
                Add Address
              </button>
              {addAddressForm ? <form className='bg-white px-7 py-7' noValidate onSubmit={handleSubmit((data) => {
                handleAdd(data);
                reset()
              })}>
                <div className="space-y-12">

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                  <div className=" border-gray-900 /10 pb-12">
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={() => setAddAddressForm(false)}
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                </div>


              </form> : null}
              <p className="mt-0.5 text-sm text-gray-500">Your Addresses:</p>
              {user.addresses?.map((address, index) => {
                return (
                  <div key={index} className='mt-5'>

                    {selectedEditIndex === index ? <form className='bg-white px-7 py-7' noValidate onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                    })}>
                      <div className="space-y-12">

                        <div className="border-b border-gray-900/10 pb-12">
                          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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

                        <div className=" border-gray-900 /10 pb-12">
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              onClick={() => { setSelectedEditIndex(-1); reset() }}
                              type="submit"
                              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Edit Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </form> : null}
                    <div className="border px-2">
                      <li className="flex justify-between gap-x-6 py-5">
                        <div className="flex gap-x-4 ">

                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.address}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pincode}</p>
                          </div>
                        </div>
                        <div className=" sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                          <p className="text-sm leading-6 text-gray-900">City: {address.city}</p>
                          <p className="text-sm leading-6 text-gray-900">State: {address.state}</p>
                        </div>
                        <div className=" sm:flex sm:flex-col sm:items-end">
                          <button
                            onClick={() => handleEditFrom(index)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 mr-4"
                          >
                            Edit
                          </button>
                          {showPopUp === index && <Popup title={`Delete Address`} message={'Are You Sure You Want To Delete This Address?'} dangerOption={'Delete'} cancelOption={'Cancel'} dangerAction={(e) => handleRemove(e, index)} showPopup={showPopUp === index} cancelAction={() => setShowPopUp(-1)} />}
                          <button
                            onClick={() => { setShowPopUp(index) }}
                            type="button"
                            className="font-medium text-red-600 hover:text-red-500"
                          >
                            Remove
                          </button>
                        </div>

                      </li>
                    </div>
                  </div>
                )
              })}

            </div >
          </div>
        </div>
      }
    </>
  );
}
