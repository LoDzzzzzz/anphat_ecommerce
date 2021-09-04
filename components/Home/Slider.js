import React, { useContext, useEffect, useState } from 'react'
import { CategoryContext, GlobalContext, MenuContext } from '../../pages/_app'
import getStrapiMedia from '../../libs/media'
import Link from 'next/link';
import AppContext from '../../context/AppContext';

export default function Slider({banner}) {
    const appContext = useContext(AppContext)
    const global = appContext.global
    const menus = appContext.menus
    const categories = appContext.categories

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const lastIndex = banner.image.length -1;
        if(index < 0) {
        setIndex(lastIndex)
        }
        if(index > lastIndex) {
        setIndex(0)
        }
    }, [index, banner]);

    useEffect(() => {
        let slider = setInterval(() => {
        setIndex(index + 1)
        },5000);
        return () => clearInterval(slider);
    }, [index])

    return (
        <section id="slider">
            <div className="container">
                <div className="row">
                    <div className="col-md-3 navbar__main">
                        <div className="navbar__menu">
                            <div className="menu__list">
                                {menus && menus.map((menu, key) => {
                                    return (     
                                        <div className="menu__item" style={{height: `${400/menus.length}px`}} key={key}>
                                
                                            <a><i aria-hidden className={menu.icon}></i> {menu.name} </a>
                            
                                            <div className="sub-menu">
                                                <div className="sub-menu__list">
                                                    {menu.categories.length > 0 
                                                        && menu.categories.map((category_menu) => {
                                                        return(
                                                            categories.filter(e => {return e.id === category_menu.id}).map((category, key_id) => {
                                                                return(
                                                                    <div className="sub-menu__item--category" key={key_id}>
                                                                        <div className="category-title">
                                                                            <i aria-hidden className={category.icon}></i>
                                                                            <Link href={{
                                                                                pathname: '/[category]',
                                                                                query: { category: `${category.slug}` },
                                                                            }}>
                                                                                <a>{category.name} </a>
                                                                            </Link>
                                                                        </div>
                                                                        <div className="category-products">
                                                                            {category.products 
                                                                                && category.products.map((product, key_idx) => {
                                                                                    return(
                                                                                        <Link href={{
                                                                                            pathname: '/[category]/[product]',
                                                                                            query:{ category: `${category.slug}`, product: `${product.slug}`}
                                                                                        }} 
                                                                                        key={key_idx}>
                                                                                            <a>
                                                                                                <p>{product.title}</p>
                                                                                            </a>
                                                                                        </Link>
                                                                                    )
                                                                                })}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })                         
                                                        )                     
                                                    })}
                                                </div>
                                            </div>
                                        </div>                                   
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9 banner">
                        {banner && banner.image.map((image, imageIndex) => {
                            let position = 'nextSlide';
                
                            if(imageIndex === index) {
                            position = 'activeSlide'
                            }
                
                            if(imageIndex === index - 1 || (index === 0 && imageIndex === image.length - 1)) {
                            position = 'lastSlide';
                            }
                
                            return(
                                <article className={position} key={image.id}>
                                    <img src={getStrapiMedia(image)} alt="banner" className={`person-img ${position}`} />
                                </article>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
