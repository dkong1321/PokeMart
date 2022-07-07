import {Link} from "react-router-dom"

const AllProductsCard = ({product}) => {
    const avgRating = (product) => {
        const reviews = Object.values(product.reviews)
        const length = reviews.length
        if(reviews.length===0){
            return 0
        }
        let totalRating = 0
        reviews.forEach((review)=>{
            totalRating+=review.rating
        })
        return Math.round(totalRating/length*2)/2
    }

    return (

            <div className="product__card">
                <Link to={`/products/${product.id}`} key={product.id} className="product__link__to__single" >
                    <div key={product.id} >
                        <div className="all__products__image__container">
                            <img className="product__image" src={product.product_image_url} alt="product_name"></img>
                        </div>
                        <div>
                            <div className="product__name">{product.product_name}</div>
                            <div className="product__price__cart__container">
                                <div className="product__price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}</div>
                            </div>
                            <div className="product__link__to__single">
                                {!product.reviews.length ? <></>:
                                    <div className="products__display__reviews">
                                        <span className="all__products__stars" style={{ "--ratingValue": `${avgRating(product)}` }}></span>
                                        <span>{Object.values(product.reviews).length} Reviews</span>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </Link>
            </div>


        )
}

export default AllProductsCard
