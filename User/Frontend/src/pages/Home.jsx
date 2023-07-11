import Nav from "../components/Navbar"
import { ProductsList } from "../features/products/components/ProductsList"

const Home = () => {
    return (
        <>
            <Nav></Nav>
            <ProductsList />
        </>
    )
}

export default Home