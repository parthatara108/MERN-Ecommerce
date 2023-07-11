import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from "@material-tailwind/react"; import { Link } from "react-router-dom"

const Product = ({ products }) => {
    return (
        <>
            {products.map((product) => (
                <Card key={product.title} className=" shadow-xl w-52 group relative mt-5 mb-5">
                    <Link to={`/product-details/${product.id}`}>
                        <CardHeader shadow={false} floated={false} className="h-52">
                            <img
                                src={product.thumbnail}
                                className="w-full h-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <div className="flex items-center justify-between mb-2">
                                <Typography color="blue-gray" className=" font-light">
                                    {product.title}
                                </Typography>
                                <Typography color="blue-gray" className="font-medium">
                                    <strong>₹{Math.round(product.price * (1 - product.discountPercentage / 100))}</strong>
                                </Typography>
                            </div>
                        </CardBody>
                    </Link>
                </Card>
            ))}
        </>
    )
}

export default Product