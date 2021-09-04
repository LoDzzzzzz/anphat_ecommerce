import React, { useContext } from 'react'
import Carousel from '../Carousel';
import getStrapiMedia from '../../libs/media'
import Link from 'next/dist/client/link';
import AppContext from '../../context/AppContext';


export default function ProductsFeatured() {
    const appContext = useContext(AppContext)
    const categories = appContext.categories
    const global = appContext.global

    return (
        <section id="products-featured">
            <div className="container">
            {categories && 
                categories.filter((e) => {return e.products.length > 3}).map((category, key_idx) => {
                    return(
                        <div className="row products-featured--bg" key={key_idx}>
                            <div className="row products-featured__header">
                                <div className="col-md-4 products-featured__title">
                                    <Link href={{
                                        pathname: '/[category]',
                                        query:{category: `${category.slug}`}
                                    }}>
                                        <a>
                                            <h2>{category.name}</h2>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="row products-featured__list">
                                <Carousel show={4}>
                                
                                {category && category.products.map((product, key) => {
                                    return (           
                                        <div className="col-md-3 products-featured__item" key={key}>
                                            <Link href={{
                                                pathname: '/[category]/[product]',
                                                query: {category: `${category.slug}`, product: `${product.slug}`}
                                            }}>
                                                <a>
                                                    <div className="item--image">
                                                        <img src={getStrapiMedia(product.image)} alt={`image ${product.title}`} />
                                                    </div>
                                                    <div className="item--content">
                                                        <div className="item--code">
                                                            <p>Mã sản phẩm: {product.code}</p>
                                                        </div>
                                                        <div className="item--title">
                                                            <p>{`${category.name} - ${product.title}`}</p>
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
                                })}
                                </Carousel>
                            </div>
                            <hr />
                            <div className="row products-featured__btn">
                                <div className="col-md-3 d-flex justify-content-center">
                                    <Link href={{
                                        pathname: '/[category]',
                                        query: {category: `${category.slug}`}
                                    }}>
                                        <a className="btn-read-featured">Xem tất cả sản phẩm {'>'}{'>'}</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )   
                })}        
            </div>
        </section>
    )
}
