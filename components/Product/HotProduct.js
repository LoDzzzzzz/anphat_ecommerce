import Link from 'next/link'
import React, { useContext } from 'react'
import AppContext from '../../context/AppContext'
import getStrapiMedia from '../../libs/media'

export default function HotProduct() {
    const appContext = useContext(AppContext)
    const products = appContext.products
    const global = appContext.global
    return (
        <div id="category">
            <div className="container">
                <div className="category--bg">
                    <div className="row category__header">
                        <div className="col-md-4 category__title">
                            <h2>Top sản phẩm bán chạy</h2>
                        </div>
                    </div>
                    <div className="row category__list">
                        {products && 
                            products.map((product, key) => {
                            if(product.hot === true){
                                return(                           
                                    <div className="col-md-4 category__item" key={key}>
                                        <Link href={{
                                            pathname: '/[category]/[product]',
                                            query: { category: `${product.category.slug}`, product: `${product.slug}`}
                                        }}>
                                            <a>
                                                <div className="item--image">
                                                    <img src={getStrapiMedia(product.image)} alt={`image ${product.title}`} />
                                                    
                                                    <img src={getStrapiMedia(global.tag_hot)} className="tag-hot"/>    
                                                </div>
                                                <div className="item--content">
                                                    <div className="item--code">
                                                        <p>Mã sản phẩm: {product.code}</p>
                                                    </div>
                                                    <div className="item--title">
                                                        <p>{product.title}</p>
                                                    </div>
                                                    <div className="item--old-price">
                                                        <h4>{Math.round((product.price / (1-product.discount))*100)/100}$</h4>
                                                    </div>
                                                    <div className="item--price">
                                                        <h3>{product.price}$</h3>
                                                    </div>
                                                    <div className="item--discount">
                                                        <span>-{product.discount*100}%</span>
                                                    </div>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
