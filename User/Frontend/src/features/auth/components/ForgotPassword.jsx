import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequestAsync } from "../authSlice";

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const emailStatus = useSelector(state => state.auth.emailSent)
    return (
        <>
            <div className="flex min-h-full flex-col justify-center py-36 lg:px-8 bg-white">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Enter Your Email To Reset Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
                        dispatch(resetPasswordRequestAsync({ email: data.email }))
                    })}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    {...register("email", { required: "Email Is Required", pattern: { value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, message: "Email Is Not Valid" } })}
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <p className=" text-red-600">{errors?.email?.message}</p>
                                {emailStatus && <p className=" text-green-600">Email Sent</p>}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Send Mail
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Want To Signin?{' '}
                        <Link to={'/'} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Signin
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword