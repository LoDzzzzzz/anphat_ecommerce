import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import AppContext from '../../context/AppContext';
import formatCash from '../../libs/formatCash';

export default function Checkout() {
    const appContext = useContext(AppContext);
    const router = useRouter();
    
    const { cart, isAuthenticated } = appContext;
    const items = cart.items
    return (
        <div id="checkout">
            <div className="container checkout-bg">
                <div className="row checkout__header">
                    <h2 className="col-md-12">Checkout</h2>
                </div>
                <div className="row checkout__main">
                    <div className="col-md-8 main__content">
                        <div className="form">
                            <div className="content__header">
                                1. Thông tin khách hàng
                            </div>
                            <div className="content__form">
                                <form>
                                    <div className="form-group">
                                        <label for="exampleInputName">Họ Tên</label>
                                        <input type="text" className="form-control" id="exampleInputName" placeholder="Enter name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputEmail">Email</label>
                                        <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputPhoneNumber">Số điện thoại</label>
                                        <input type="text" className="form-control" id="exampleInputPhoneNumber" placeholder="Enter phone number" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputAddress">Địa chỉ</label>
                                        <textarea text-aria className="form-control" id="exampleInputAddress" placeholder="Enter address" />
                                    </div>
                                    <div className="form-group">
                                        <label for="exampleInputNote">Ghi chú</label>
                                        <textarea className="form-control" id="exampleInputNote" placeholder="Enter note" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="form">
                            <div className="content__header">
                                2. Hình thức thanh toán
                            </div>
                            <div className="content__form">
                                <form>
                                    <div className="form-group">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                            <label class="form-check-label" for="exampleRadios1">
                                            Thanh toán chuyển khoản
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" disabled/>
                                            <label class="form-check-label" for="exampleRadios2">
                                            Thanh toán qua thẻ visa/credit card
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="form">
                            <div className="content__header">
                                3. Hình thức vận chuyển
                            </div>
                            <div className="content__form">
                                <form>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                            <label className="form-check-label" for="exampleRadios1">
                                            Vận chuyển nhà xe/ nội thành
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                            <label className="form-check-label" for="exampleRadios2">
                                            Vận chuyển qua các đơn vị vận chuyển trung gian
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                                            <label className="form-check-label" for="exampleRadios3">
                                            Khách hàng qua lấy hàng trực tiếp
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="content__button">
                            <button id="btn" className="btn-cart">Checkout {'>'}{'>'}</button>
                            <button id="btn" className="btn-cart-2">Thêm sản phẩm {'>'}{'>'}</button>
                        </div>
                    </div>
                    <div className="col-md-4 main__sidebar">
                        <div className="col-md-12">
                            <div className="sidebar__header">
                                <button id="btn" className="btn-cart-checkout">Checkout {'>'}{'>'}</button>
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
