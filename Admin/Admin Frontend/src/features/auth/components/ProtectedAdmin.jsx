import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const ProtectedAdmin = ({ children }) => {
    const user = useSelector(state => state.user.adminInfo)

    if (!user) {
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children
}

export default ProtectedAdmin