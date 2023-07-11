import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux'
import { createCategoryAsync } from '../../products/productsSlice';
import { useAlert } from 'react-alert';

const CategoryForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();
    const alert = useAlert()

    return (
        <form noValidate className="space-y-6 px-4 sm:px-0 sm:mx-auto sm:max-w-lg" onSubmit={handleSubmit((data) => {
            const label = { ...data }
            dispatch(createCategoryAsync({ category: label, alert }));
            reset();
        })}>
            <div className="space-y-6 bg-white p-6">
                <div className=" border-gray-900/10 pb-6">
                    <h2 className="text-xl font-semibold leading-7 text-gray-900">Add Category</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
                            Category Label
                        </label>
                        <div className="mt-1">
                            <input
                                id="label"
                                name="label"
                                type="text"
                                required
                                {...register('label')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-start ml-24 space-x-4">
                    <button
                        type="submit"
                        className=" items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Add
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CategoryForm;
