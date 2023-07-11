import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Protected = ({ children }) => {
    const user = useSelector(state => state.user.userInfo)

    if (!user) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children
}

export default Protected