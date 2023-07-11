import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllBrandsAsync, fetchAllCategoryAsync, fetchAllProductsFilterAsync } from '../productsSlice'
import { ITEMS_PER_PAGE } from '../../../app/constants'
import Pagination from '../../../components/Pagination'
import { Spinner } from "@material-tailwind/react";
import Product from '../../../components/Product'
import MobileFilter from '../../../components/MobileFilter'
import DesktopFilter from '../../../components/DesktopFilter'
import SortItems from '../../../components/SortItems'

export function ProductsList() {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  const status = useSelector(state => state.product.status)
  const brands = useSelector(state => state.product.brands)
  const category = useSelector(state => state.product.category)

  const filters = [
    {
      id: 'brand',
      name: 'Brand',
      options: brands,
    },
    {
      id: 'category',
      name: 'Category',
      options: category,
    },
  ]
  const [filter, setFilter] = useState({})
  const [sort, setSort] = useState({})
  const [page, setPage] = useState(1)
  const totalItems = useSelector(state => state.product.totalItems)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleFilterChange = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section.id]) {
        newFilter[section.id].push(option.label);
      } else {
        newFilter[section.id] = [option.label];
      }
    } else {
      const index = newFilter[section.id].findIndex(
        (el) => el === option.label
      );
      newFilter[section.id].splice(index, 1);
    }
    setFilter(newFilter);
  };

  const handleSort = (e, option) => {
    const sort = { _sort: option.sort, _order: option.order };
    setSort(sort);
  };

  const handlePage = (page) => {
    setPage(page);
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
    dispatch(fetchAllProductsFilterAsync({ filter, sort, pagination }))
  }, [dispatch, filter, sort, page])

  useEffect(() => {
    setPage(1)
  }, [totalItems])

  useEffect(() => {
    dispatch(fetchAllBrandsAsync())
    dispatch(fetchAllCategoryAsync())
  }, [dispatch])

  return (
    <>
      <div className=" px-16  mr-20 min-h-screen min-w-full bg-white md:px-36">
        <div>
          {/* Mobile filter dialog */}
          <MobileFilter handleFilterChange={handleFilterChange} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filters={filters} />
          {/* Mobile filter dialog end */}

          <main className=" px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b bg-white border-gray-200 pb-6 pt-14">
              <h1 className="text-1xl font-bold tracking-tight text-gray-900 sm:text-4xl">All Products</h1>

              {/* sort items */}
              <SortItems setMobileFiltersOpen={setMobileFiltersOpen} handleSort={handleSort} />
              {/* sort items end*/}

            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Desktop Filters */}
                <DesktopFilter filters={filters} handleFilterChange={handleFilterChange} />
                {/* Desktop Filters end*/}

                {/* products list */}
                <div className="lg:col-span-3 ">
                  <div className="bg-white">
                    <div className=" max-w-2x sm:px-6 lg:px-8">
                      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        { }
                        {status === 'loading' ?
                          <div className='flex justify-center'>
                            <Spinner className="h-12 w-12" />
                          </div>
                          :
                          <Product products={products} />
                        }
                      </div>
                    </div>
                  </div>
                </div>
                {/* Product end */}
              </div>
            </section>
            {/* pagination */}
            <Pagination handlePage={handlePage} totalItems={totalItems} page={page} setPage={setPage} />
          </main>
        </div>
      </div>
    </>
  );
}

