import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext';
import formatCash from '../../libs/formatCash';
import { ToastContainer, toast } from 'react-toastify';
import getStrapiMedia from '../../libs/media';
import Link from 'next/link';

export default function Cart() {
    const appContext = useContext(AppContext);
    const router = useRouter();
    
    const { cart, isAuthenticated } = appContext;
    const items = cart.items

    const notify = (item) => toast.success(`Đã xoá sản phẩm ${item.title} khỏi giỏ hàng.`)
    
    return (
        <div id="cart">
            <div className="container cart-bg">
                <div className="row cart__header">
                    <h2 className="col-md-12">Giỏ hàng của bạn</h2>
                </div>
                <div className="row cart__main">
                    <div className="col-md-8 main__content">
                        <div className="content__header">
                            <h3>Tổng cộng ( {items.length} sản phẩm ) {formatCash(cart.total.toString())}VNĐ</h3>
                        </div>
                        <div className="content__list">
                            {items && items.map((item, key) => {
                                    return (
                                        <div className="row content__item" key={key}>
                                            <div className="col-md-3 item--image">
                                                <img src={getStrapiMedia(item.image)} alt="image item" />
                                            </div>
                                            <div className="col-md-9 item--content row">
                                                <div className="col-md-7 item--infor">
                                                    <div className="item--title">
                                                        <h1>{item.title}</h1>
                                                        <span>{item.category.name}</span>
                                                    </div>
                                                    <hr/>
                                                    <div className="item--require">
                                                        <div className="require__title">
                                                            <i className="fas fa-assistive-listening-systems"></i>
                                                            <h4>Yêu cầu sản phẩm</h4>
                                                        </div>
                                                        <ul className="require__list">
                                                            {item.option
                                                                && item.option.map((e, key_id) => {
                                                                    if(e.name !== null){
                                                                        return(
                                                                            <li className="require__item" key={key_id}>
                                                                                <p>{`${e.name}: ${e.choose}`}</p>
                                                                            </li>
                                                                        )
                                                                    }
                                                                })}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-md-5 item--quantity-price">
                                                    <div className="item--quantity">
                                                        <span>Số lượng</span>
                                                        <div className="quantity" name="quantity" id="quantity">
                                                            {item.quantity}
                                                        </div>
                                                    </div>
                                                    <div className="item--price">
                                                        <div className="price">
                                                            <span>{formatCash(item.price.toString())}VNĐ</span>
                                                        </div>
                                                    </div>
                                                    <div className="item--button">
                                                        <button className="remove-btn" onClick={() => {
                                                            notify(item),
                                                            appContext.removeItem(item)     
                                                        }}>
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                        <ToastContainer 
                                                            position="top-right"
                                                            autoClose={2000}
                                                            hideProgressBar={false}
                                                            newestOnTop={false}
                                                            closeOnClick
                                                            rtl={false}
                                                            pauseOnFocusLoss
                                                            draggable
                                                            pauseOnHover
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    )
                            })}
                        </div>
                        <div className="content__button">
                            <Link href="/checkout"><a>
                                <button id="btn" className="btn-cart">Checkout {'>'}{'>'}</button>
                            </a></Link>
                            <button id="btn" className="btn-cart-2">Thêm sản phẩm {'>'}{'>'}</button>
                        </div>
                    </div>
                    <div className="col-md-4 main__sidebar">
                        <div className="col-md-12">
                            <div className="sidebar__header">
                                <Link href="/checkout"><a>
                                    <button id="btn" className="btn-cart-checkout">Checkout {'>'}{'>'}</button>
                                </a></Link>
                            </div>
                            <div className="sidebar__main">
                                <div className="sidebar__main--header">
                                    <h2>Tóm tắt đơn hàng</h2>
                                </div>
                                <div className="sidebar__main--content"> 
                                    <div className="content__price-quantity">
                                        <span className="quantity">
                                            {items.length} Sản phẩm
                                        </span>
                                        <span className="price">
                                            {formatCash(cart.total.toString())}VNĐ
                                        </span>
                                    </div> 
                                    <div className="content__delivery">
                                        <span className="delivery">
                                            Giao hàng
                                        </span>
                                        <span className="delivery-price">
                                            Miễn phí
                                        </span>
                                    </div>
                                </div>
                                <div className="sidebar__main--total">
                                    <span className="total__title">
                                        Tổng
                                    </span>
                                    <span className="total__price">
                                        {formatCash(cart.total.toString())}VNĐ
                                    </span>
                                </div>
                            </div>
                            <div className="sidebar__promotion">
                                <input type="text" 
                                name="promotion" 
                                className="promotion" 
                                placeholder="Nhập mã khuyến mãi của bạn" />
                                <button id="btn" className="btn-promotion-apply">Áp dụng {'>'}{'>'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
