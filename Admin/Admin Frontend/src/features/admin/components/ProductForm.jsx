import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { clearSelectedProduct, createProductsAsync, fetchAllBrandsAsync, fetchAllCategoryAsync, fetchProductByIdAsync, updateProductAsync } from '../../products/productsSlice';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAlert } from 'react-alert';

const ProductForm = () => {
    const brands = useSelector(state => state.product.brands)
    const category = useSelector(state => state.product.category)
    const selectedProduct = useSelector(state => state.product.selectedproduct)
    const dispatch = useDispatch()
    const params = useParams()
    const { register, handleSubmit, setValue, reset } = useForm();
    const alert = useAlert()

    useEffect(() => {
        if (params.id) {
            dispatch(fetchProductByIdAsync(params.id))
        }
        else {
            dispatch(clearSelectedProduct())
        }
    }, [dispatch, params.id])

    useEffect(() => {
        dispatch(fetchAllBrandsAsync())
        dispatch(fetchAllCategoryAsync())
    }, [dispatch])

    useEffect(() => {
        if (selectedProduct && params.id) {
            setValue('title', selectedProduct.title)
            setValue('description', selectedProduct.description)
            setValue('price', selectedProduct.price)
            setValue('rating', selectedProduct.rating)
            setValue('discountPercentage', selectedProduct.discountPercentage)
            setValue('thumbnail', selectedProduct.thumbnail)
            setValue('stock', selectedProduct.stock)
            setValue('image1', selectedProduct?.images?.[0])
            setValue('image2', selectedProduct?.images?.[1])
            setValue('image3', selectedProduct?.images?.[2])
            setValue('brand', selectedProduct.brand)
            setValue('category', selectedProduct.category)
        }
    }, [selectedProduct, setValue, params.id])

    return (
        <form noValidate className="space-y-6 px-4 sm:px-0 sm:mx-auto sm:max-w-lg" onSubmit={handleSubmit((data) => {
            const product = { ...data }
            product.images = [product.image1, product.image2, product.image3]
            product.rating = product.rating || 0
            delete product['image1']
            delete product['image2']
            delete product['image3']
            product.price = +product.price
            product.stock = +product.stock
            product.discountPercentage = +product.discountPercentage

            if (params.id) {
                product.id = params.id
                dispatch(updateProductAsync({ product: product, alert }));
                reset()
            }
            else {
                dispatch(createProductsAsync({ product: product, alert }))
                reset();
            }
        })}>
            <div className="space-y-6 bg-white p-6">
                <div className="border-b border-gray-900/10 pb-6">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">{params.id ? "Edit Product" : "Add Product"}</h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
                            Product Title
                        </label>
                        <div className="mt-1">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                autoComplete="off"
                                required
                                {...register('title')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="brand" className="block text-sm font-medium leading-5 text-gray-700">
                            Brand
                        </label>
                        <div className="mt-1">
                            <select
                                {...register("brand", { required: "Brand Is Required" })}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Select Brand</option>
                                {brands.map((brand, index) => {
                                    return (
                                        <option key={index} value={brand.value}>{brand.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium leading-5 text-gray-700">
                            Product Description
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                required
                                {...register('description')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium leading-5 text-gray-700">
                            Price
                        </label>
                        <div className="mt-1">
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.01"
                                min="0"
                                required
                                {...register('price')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="discountPercentage" className="block text-sm font-medium leading-5 text-gray-700">
                            Discount Percentage
                        </label>
                        <div className="mt-1">
                            <input
                                id="discountPercentage"
                                name="discountPercentage"
                                type="number"
                                min="0"
                                max="100"
                                step="1"
                                {...register('discountPercentage')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium leading-5 text-gray-700">
                            Category
                        </label>
                        <div className="mt-1">
                            <select
                                id="category"
                                name="category"
                                required
                                {...register('category')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            >
                                <option value="">Select Category</option>
                                {category.map((categories, index) => {
                                    return (
                                        <option key={index} value={categories.value}>{categories.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium leading-5 text-gray-700">
                            Stock
                        </label>
                        <div className="mt-1">
                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                required
                                {...register('stock')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* <div>
                        <label htmlFor="rating" className="block text-sm font-medium leading-5 text-gray-700">
                            Rating
                        </label>
                        <div className="mt-1">
                            <input
                                id="rating"
                                name="rating"
                                type="number"
                                min="0"
                                max="5"
                                step="0.1"
                                {...register('rating')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div> */}

                    <div>
                        <label htmlFor="thumbnail" className="block text-sm font-medium leading-5 text-gray-700">
                            Thumbnail URL
                        </label>
                        <div className="mt-1">
                            <input
                                id="thumbnail"
                                name="thumbnail"
                                type="text"
                                autoComplete="off"
                                required
                                {...register('thumbnail')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image1" className="block text-sm font-medium leading-5 text-gray-700">
                            Image 1 URL
                        </label>
                        <div className="mt-1">
                            <input
                                id="image1"
                                name="image1"
                                type="text"
                                autoComplete="off"
                                {...register('image1')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image2" className="block text-sm font-medium leading-5 text-gray-700">
                            Image 2 URL
                        </label>
                        <div className="mt-1">
                            <input
                                id="image2"
                                name="image2"
                                type="text"
                                autoComplete="off"
                                {...register('image2')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image3" className="block text-sm font-medium leading-5 text-gray-700">
                            Image 3 URL
                        </label>
                        <div className="mt-1">
                            <input
                                id="image3"
                                name="image3"
                                type="text"
                                autoComplete="off"
                                {...register('image3')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>

                </div>

                <div className="flex justify-end space-x-4">
                    {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button> */}
                    {/* {params.id && (
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="inline-flex items-center px-4 py-2 border border-red-500 rounded-md shadow-sm text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete
                        </button>
                    )} */}
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {params.id ? "Update" : "Add"}
                    </button>

                </div>
            </div>
        </form >
    );
};

export default ProductForm;
