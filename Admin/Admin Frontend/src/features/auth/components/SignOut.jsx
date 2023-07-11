import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { signOutAsync } from "../authSlice"
import { useNavigate } from "react-router-dom"

const SignOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(signOutAsync())
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Sign-out error:', error);
            });
    }, [dispatch, navigate]);

    return (
        <>
            {/* {user === null && navigate("/signin")} */}
        </>
    );

}

export default SignOut