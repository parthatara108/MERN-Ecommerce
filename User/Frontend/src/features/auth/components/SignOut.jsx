import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { signOutAsync } from "../authSlice"
import { useNavigate } from "react-router-dom"

const SignOut = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.loggedInUser);
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