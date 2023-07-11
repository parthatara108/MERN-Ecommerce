import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import {
    Navbar,
    Typography,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

export default function Nav() {
    const [openNav, setOpenNav] = useState(false);
    const user = useSelector(state => state.user.userInfo)
    const items = useSelector(state => state.cart.items)
    //const checkUser = useSelector(state => state.auth.checkUser)

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {user?.role === 'user' &&
                <>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/home" className="flex justify-center items-center">
                            Home
                        </Link>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/user-profile" className="flex justify-center items-center">
                            My Profile
                        </Link>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/my-orders" className="flex justify-center items-center">
                            My Orders
                        </Link>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/signout" className="flex justify-center items-center">
                            SignOut
                        </Link>
                    </Typography>
                </>
            }


        </ul>
    );

    return (
        <>
            {/* {!checkUser && <Navigate to={'/'} replace={true}></Navigate>} */}
            <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        E-Commerce
                    </Typography>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>

                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>

                    <div className="hidden md:hidden lg:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <Link to='/my-cart'>
                                {user.role === 'user' && <button
                                    type="button"
                                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                >
                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                </button>}
                            </Link>
                            {user.role === 'user' && items.length > 0 && <span className="inline-flex items-center rounded-3xl mb-5 -ml-3 bg-red-50 px-1.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                {items.length}
                            </span>}
                        </div>
                    </div>
                </div>
                <Collapse open={openNav}>
                    {navList}
                    <div className="ml-4 flex justify-center items-center md:ml-6">
                        <Link to='/my-cart'>
                            {user.role === 'user' && <button
                                type="button"
                                className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            >
                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                            </button>}
                        </Link>
                        {user.role === 'user' && items.length > 0 && <span className="inline-flex items-center rounded-3xl mb-5 -ml-3 bg-red-50 px-1.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {items.length}
                        </span>}
                    </div>
                </Collapse>


            </Navbar>

        </>
    );
}