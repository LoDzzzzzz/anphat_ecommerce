import React, { useContext } from 'react'
import getStrapiMedia from '../../libs/media'
import Link from 'next/dist/client/link'
import AppContext from '../../context/AppContext'

export default function Category({category}) {
    const appContext = useContext(AppContext)
    const global = appContext.global
    return (
        <div id="category">
            <div className="container">
                <div className="category--bg">
                    <div className="row category__header">
                        <div className="col-md-4 category__title">
                            <h2>{category.name}</h2>
                        </div>
                    </div>
                    <div className="row category__list">
                        {category && 
                            category.products.map((product, key) => {
                            return(                           
                                <div className="col-md-4 category__item" key={key}>
                                    <Link href={{
                                        pathname: '/[category]/[product]',
                                        query: { category: `${category.slug}`, product: `${product.slug}`}
                                    }}>
                                        <a>
                                            <div className="item--image">
                                                <img src={getStrapiMedia(product.image)} alt={`image ${product.title}`} />
                                                {product.hot === true 
                                                    ? <img src={getStrapiMedia(global.tag_hot)} className="tag-hot"/> 
                                                    : <div className="tag-hot"></div>
                                                }
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
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
