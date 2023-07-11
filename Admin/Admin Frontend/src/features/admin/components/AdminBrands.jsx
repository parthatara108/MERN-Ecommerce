import { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBrandAsync, fetchAllBrandsAsync } from '../../products/productsSlice'
import { ITEMS_PER_PAGE } from '../../../app/constants'
import Pagination from '../../../components/Pagination'
import Popup from '../../../components/Popup'
import { useAlert } from 'react-alert'
import { Spinner } from '@material-tailwind/react'

export default function AdminBrands() {
    const dispatch = useDispatch()
    const brands = useSelector(state => state.product.brands)
    const status = useSelector(state => state.product.status)
    const [page, setPage] = useState(1)
    const totalItems = useSelector(state => state.product.totalItems)
    const [showPopUp, setShowPopUp] = useState(null)
    const alert = useAlert()

    const handlePage = (page) => {
        setPage(page);
    }

    const handleRemove = (id) => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(deleteBrandAsync({ id: id, alert }))
            .then(() => {
                dispatch(fetchAllBrandsAsync(pagination))
            })
    }

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchAllBrandsAsync(pagination))
    }, [dispatch, page])

    useEffect(() => {
        setPage(1)
    }, [totalItems])

    return (
        <>
            <div className='flex justify-between mx-16 sm:mx-18 lg:mx-52 mt-10'>
                <h1 className='text-black text-2xl font-bold br md:text-4xl'>Brands</h1>
                <Link to={'/admin/brand-form'}>
                    <button type="button" className="text-white w-20 bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <PlusIcon className='w-5 h-5 mr-1' />
                        Add
                    </button>
                </Link>
            </div>
            {brands < 1 ?
                <div className='flex justify-center'>No Brands Available</div>
                :
                status === 'loading' ?
                    <div className='flex justify-center'>
                        <Spinner className='w-12 h-12' />
                    </div>
                    :
                    <div className="relative overflow-x-auto mx-10 shadow-md sm:rounded-lg lg:mx-52">
                        <table className="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Label
                                    </th>
                                    <th scope="col" className="text-center px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands.map((brand, index) => {
                                    return (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                            <td className="px-6 text-center py-4">{brand.label}</td>
                                            <td className="px-6 text-center py-4">
                                                {showPopUp === brand?.id && <Popup title={`Delete ${brand?.label}`} message={'Are You Sure You Want To Delete This Brand?'} dangerOption={'Delete'} cancelOption={'Cancel'} dangerAction={() => handleRemove(brand?.id)} showPopup={showPopUp === brand?.id} cancelAction={() => setShowPopUp(-1)} />}
                                                <button
                                                    type='button'
                                                    onClick={() => { setShowPopUp(brand.id) }}
                                                    className="font-medium text-red-600 dark:text-red-500 cursor:pointer"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Pagination handlePage={handlePage} totalItems={totalItems} page={page} setPage={setPage} />
                    </div>
            }
        </>
    );
}
