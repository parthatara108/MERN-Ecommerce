import {
    Navbar,
    Typography,
    IconButton,
    Collapse
} from "@material-tailwind/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AdminNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const user = useSelector(state => state.user?.adminInfo)

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {user?.role === 'admin' &&
                <>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/admin" className="flex justify-center items-center">
                            Products
                        </Link>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/admin/categories" className="flex justify-center items-center">
                            Categories
                        </Link>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/admin/brands" className="flex justify-center items-center">
                            Brands
                        </Link>
                    </Typography>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-normal"
                    >
                        <Link to="/admin/orders" className="flex justify-center items-center">
                            Orders
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
            <Navbar className="sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        className="mr-4 cursor-pointer py-1.5 font-medium"
                    >
                        E-Commerce Admin
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


                </div>
                <Collapse open={openNav}>
                    {navList}
                </Collapse>
            </Navbar>

        </>
    );
}