import { useEffect } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProductByIdAsync } from '../productsSlice'
import { addItemAsync } from '../../cart/cartSlice'
import { useAlert } from "react-alert";
import { ColorRing } from 'react-loader-spinner'
import { Spinner } from '@material-tailwind/react'


const colors = [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const alert = useAlert()
    const dispatch = useDispatch()
    const product = useSelector(state => state.product.selectedproduct)
    const status = useSelector(state => state.product.status)
    const items = useSelector(state => state.cart.items)
    const addStatus = useSelector(state => state.cart.addStatus)
    const params = useParams()

    useEffect(() => {
        dispatch(fetchProductByIdAsync(params.id))
    }, [dispatch, params])

    const handleCart = (e) => {
        e.preventDefault();
        if (items.findIndex((item) => item.product?.id === product?.id) < 0) {
            const newItem = { product: product.id, quantity: 1 }
            dispatch(addItemAsync({ item: newItem, alert }))
        }
        else {
            alert.error("Item Is Already In Cart");
        }
    }
    return (
        <div className="bg-white">
            {status === 'loading' ?
                <div className='flex justify-center'>
                    <Spinner className='w-12 h-12' />
                </div> :
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                            <li className="text-sm">
                                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {product.title}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                            <img
                                src={product.thumbnail}
                                alt={''}
                                className="h-6xl w-full object-cover object-center"
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={product.images?.[0]}
                                    alt={''}
                                    className="h-6xl w-full object-cover object-center"
                                />
                            </div>
                            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                <img
                                    src={product.images?.[1]}
                                    alt={''}
                                    className="h-6xl w-full object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                            <img
                                src={product.images?.[2]}
                                alt={''}
                                className="h-4xl w-full object-cover object-center"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl tracking-tight text-gray-900">₹{Math.round(product.price * (1 - product.discountPercentage / 100))}</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">

                                        <StarIcon
                                            className={
                                                // product.rating > rating ? 
                                                'text-gray-900 h-5 w-5 flex-shrink-0'
                                                //  : 'text-gray-200',

                                            }
                                            aria-hidden="true"
                                        />
                                        {product.rating}
                                    </div>
                                    <p className="sr-only">{product.rating}</p>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Colors */}
                                {/* <div>
                                    <h3 className="text-sm font-medium text-gray-900">Color</h3>

                                    <RadioGroup className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            active && checked ? 'ring ring-offset-1' : '',
                                                            !active && checked ? 'ring-2' : '',
                                                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div> */}


                                {product.stock > 0 ?
                                    <button
                                        onClick={handleCart}
                                        type="submit"
                                        className="mt-10 flex w-full items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        {addStatus === 'loading' ? <Spinner color='white' /> : 'Add to Cart'}
                                    </button> :
                                    <p
                                        type=''
                                        aria-disabled
                                        className="mt-10 flex w-full items-center cursor-pointer justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                    >
                                        Out Of Stock
                                    </p>
                                }

                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
