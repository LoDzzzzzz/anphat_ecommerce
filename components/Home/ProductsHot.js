import React, { useContext } from 'react'
import getStrapiMedia from '../../libs/media'
import Link from 'next/dist/client/link'
import AppContext from '../../context/AppContext'

export default function ProductsHot() {
    const appContext = useContext(AppContext)
    const products = appContext.products
    const global = appContext.global

    return (
        <section id="products-hot">
            <div className="container">
                <div className="products-hot--bg">
                    <div className="row products-hot__header">
                        <div className="col-md-4 products-hot__title">
                            <Link href="/hot">
                                <a>
                                    <h2>Top Sản phẩm bán chạy</h2>
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div className="row products-hot__list">
                        {products && 
                            products.filter((e) => {return e.hot === true}).map((product, key) => {
                            if(key < 8)
                            return(                           
                                <div className="col-md-3 products-hot__item" key={key}>
                                    <Link href={{
                                        pathname: '/[category]/[product]',
                                        query: {category: `${product.category.slug}`, product: `${product.slug}`}
                                    }}>
                                        <a>
                                            <div className="item--image">
                                                <img src={getStrapiMedia(product.image)} alt={`image ${product.title}`} className="image" />
                                                <img src={getStrapiMedia(global.tag_hot)} alt="tag hot" className="tag-hot"/>
                                            </div>
                                            <div className="item--content">
                                                <div className="item--code">
                                                    <p>Mã sản phẩm: {product.code}</p>
                                                </div>
                                                <div className="item--title">
                                                    <p>{`${product.category.name} - ${product.title}`}</p>
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
                                            <div className="item--hover">
                                                <div className="hover__header">
                                                    <h3>{`${product.category.name} - ${product.title} - ${product.code}`}</h3>
                                                </div>
                                                <div className="hover__list">
                                                    <div className="hover__item">
                                                        <i aria-hidden className="fas fa-check-circle">
                                                            <span>Hình ảnh chỉ mang tính chất minh hoạ</span>
                                                        </i>
                                                    </div>
                                                    <div className="hover__item">
                                                        <i aria-hidden className="fas fa-check-circle">
                                                            <span>Nhận hàng và thanh toán tại nhà</span>
                                                        </i>
                                                    </div>
                                                    <div className="hover__item">
                                                        <i aria-hidden className="fas fa-check-circle">
                                                            <span>{product.description}</span>
                                                        </i>
                                                    </div>
                                                    <div className="hover__item">
                                                        <i aria-hidden className="fas fa-check-circle">
                                                            <span>{product.status === "published" ? "Còn hàng" : "Hết hàng"}</span>
                                                        </i>
                                                    </div>
                                                </div>
                                                <div className="hover__price-container">
                                                    <div className="hover--old-price">
                                                        <h4>{Math.round((product.price / (1-product.discount))*100)/100}$</h4>
                                                    </div>
                                                    <div className="hover--price">
                                                        <h3>{product.price}$</h3>
                                                    </div>
                                                    <div className="hover--discount">
                                                        <span>-{product.discount*100}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div className="row products-hot__btn">
                        <div className="col-md-3">
                            <Link href="/hot"><a>
                                <button id="btn" className="btn-read-hot">Xem tất cả sản phẩm</button>
                            </a></Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
