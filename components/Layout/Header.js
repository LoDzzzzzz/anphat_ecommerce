import React, { useContext, useEffect, useState } from 'react'
import getStrapiMedia from '../../libs/media'
import Link from 'next/link';
import AppContext from '../../context/AppContext';
import { logout } from '../../libs/auth';
import Modal from './Modal';


export default function Header() {
    const appContext = useContext(AppContext)
    const global = appContext.global
    const menus = appContext.menus
    const categories = appContext.categories
    const { user, setUser } = appContext
    const [isTop, setIsTop] = useState(true)
    const {showModal, setShowModal} = appContext
   
    const handleScroll = () => {
        const top = window.scrollY < 200
            if(top !== isTop){
                setIsTop(top)
            }
    }
    
    useEffect(() => {
        document.addEventListener("scroll", handleScroll)
        return () => document.removeEventListener("scroll", handleScroll)
    },[isTop])

    const NavBar = () => {
        return(
            <div className="navbar">
                <div className="container">
                    <div className="col-md-3 navbar__main">
                        <a className="navbar__menu-title"><i aria-hidden className="fas fa-list"></i> DANH MỤC SẢN PHẨM</a>
                        <div className="navbar__menu">
                            <div className="menu__list">
                                {menus && menus.map((menu, key) => {
                                    return (     
                                        <div className="menu__item" style={{height: `${400/menus.length}px`}} key={key}>
                                            <Link passHref href="/">
                                                <a><i aria-hidden className={menu.icon}></i> {menu.name} </a>
                                            </Link>
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
                                                                            <Link passHref href={{
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
                                                                                        <Link passHref href={{
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
                </div>
            </div>
        )
    }

    const NavBarSticky = () => {
        return(
            <div className="col-md-6 navbar-sticky__main">
                <a className="navbar-sticky__menu-title"><i aria-hidden className="fas fa-list"></i> DANH MỤC SẢN PHẨM</a>
                <div className="navbar-sticky__menu">
                    <div className="menu__list">
                        {menus && menus.map((menu, key) => {
                            return (     
                                <div className="menu__item" style={{height: `${400/menus.length}px`}} key={key}>
                                    <Link passHref href="/">
                                        <a><i aria-hidden className={menu.icon}></i> {menu.name} </a>
                                    </Link>
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
                                                                    <Link passHref href={{
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
                                                                                <Link passHref href={{
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
        )
    }

    const NavBarList = () => {
        return(
            <div className="col-md-5 main-header__list">
                <div className="main-header__item">
                    <a>
                        <i aria-hidden className="fas fa-phone-alt"></i>
                        <div>Mua hàng online <p><strong style={{fontSize: "1.4rem"}}>{global.hotline_1}</strong></p></div>
                    </a>
                </div>
                <div className="main-header__item">
                        <a onClick={() => setShowModal(true)}>
                            <i aria-hidden className="fas fa-edit"></i>
                            <div>Xây dựng <p><strong>Kế hoạch in</strong></p></div>   
                        </a>
                        <Modal
                        onClose={() => setShowModal(false)}
                        show={showModal}
                        >
                        </Modal>
                </div>
                <div className="main-header__item">
                    <a>
                        <i aria-hidden className="fas fa-user-friends"></i>

                        {user ? (
                            <div>
                                <a className="username"><strong>{user.username}</strong></a>
                                <a className="logout" onClick={() => {
                                    logout();
                                    setUser(null);
                                    history.go(0);
                                    }}>Logout
                                </a>
                            </div>
                        ) : (
                            <div>
                                <Link passHref href="register">
                                    <a className="register">Đăng ký</a>
                                </Link>
                                <Link passHref href="login">
                                    <a className="login">Đăng nhập</a>
                                </Link>
                            </div>
                        )}
                        
                    </a>
                </div>
                <div className="main-header__item">
                    <Link passHref href="/cart">
                        <a>
                            <i aria-hidden className="fas fa-shopping-cart">
                            <span className="number_item">{appContext.cart.items.length}</span>
                            </i>
                        </a>
                    </Link>
                </div>
            </div>
        )
    }

    const NavBarSearch = () => {
        return(
            <div className="col-md-5 main-header__search">
                <select className="search--option">
                    <option value>Tất cả danh mục</option>
                    {menus && menus.map((menu, key) => {
                        return(
                            <option value={menu.id} key={key}>{menu.name}</option>
                        )
                    })}
                </select>
                <div className="search--input">
                    <input type="text" id="js-search" className="text_search" name="q" placeholder="Tìm kiếm sản phẩm..."  />
                </div>
                <div className="search--button">
                    <button type="submit" className="btn_search">
                        <i aria-hidden className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        )
    }
    return (
        <header id="header">
            {isTop ?
            <div className="top-header">
                <div className="container">
                    <div className="row top-header__main">
                        <div className="top-header__address col-md-6">
                            <p>{global.address_1} - {global.address_2}</p>
                        </div>
                        <div className="top-header__list col-md-6">
                            <div className="top-header__item">
                                <a><i aria-hidden className="fas fa-map-marker-alt"></i> Hệ Thống Showroom</a>
                            </div>
                            <div className="top-header__item">
                                <a><i aria-hidden className="fas fa-play-circle"></i> Video</a>
                            </div>
                            <div className="top-header__item">
                                <a><i aria-hidden className="fas fa-newspaper"></i> Tin Tức</a>
                            </div>
                            <div className="top-header__item">
                                <a><i aria-hidden className="fas fa-print"></i> In Hoá Đơn Điện Tử</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : null }
            
            <div className={isTop ? "main-header" : "navbar-sticky"}>
                <div className="container">
                    <div className="row main-header__main">

                        {isTop ? 
                        <div className="col-md-2 main-header__logo">
                            <Link passHref href="/">
                                <a>
                                    <img src={getStrapiMedia(global.logo_2_white)} alt="" />
                                </a>
                            </Link>
                        </div>
                        : 
                        <div className="col-md-1 navbar-sticky__logo">
                            <Link passHref href="/">
                                <a>
                                    <img src={getStrapiMedia(global.logo_1_white)} alt="" />
                                </a>
                            </Link>
                        </div>
                        }

                        {isTop ? 
                        <NavBarSearch />
                        : 
                        <NavBarSticky />
                        }
                        <NavBarList />
                        
                    </div>
                </div>
            </div>
            {isTop ? 
            <NavBar />
            : null }
        </header>
    )
}
