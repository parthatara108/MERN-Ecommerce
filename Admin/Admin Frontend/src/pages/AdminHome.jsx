import AdminProductList from "../features/admin/components/AdminProductList"
import AdminNavbar from '../features/admin/components/AdminNavbar'
const AdminHome = () => {
    return (
        <>
            <AdminNavbar></AdminNavbar>
            <AdminProductList />
        </>
    )
}

export default AdminHome