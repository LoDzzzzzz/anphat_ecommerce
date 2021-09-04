import React, { useContext } from 'react'
import Link from 'next/dist/client/link'
import AppContext from '../../context/AppContext'

export default function Footer() {
    const appContext = useContext(AppContext)
    const global = appContext.global
    return (
        <footer id="footer">
            <hr/>
            <div className="top-footer">
                <div className="container">
                    <div className="row top-footer__list">      
                        <div className="top-footer__item col-md-3">
                            <i aria-hidden className="fas fa-truck"></i>
                            <div>
                                <strong>Chính sách giao hàng</strong>
                                <p>Nhận hàng và thanh toán tại nhà</p>
                            </div>
                        </div>
                        <div className="top-footer__item col-md-3">
                            <i aria-hidden className="fas fa-sync"></i>
                            <div>
                                <strong>Đổi trả dễ dàng</strong>
                                <p>Dùng thử trong vòng 3 ngày</p>
                            </div>
                        </div>
                        <div className="top-footer__item col-md-3">
                            <i aria-hidden className="fas fa-credit-card"></i>
                            <div>
                                <strong>Thanh toán tiện lợi</strong>
                                <p>Trả tiền mặt, chuyển khoản</p>
                            </div>
                        </div>
                        <div className="top-footer__item col-md-3">
                            <i aria-hidden className="fas fa-comments"></i>
                            <div>
                                <strong>Hỗ trợ nhiệt tình</strong>
                                <p>Tư vấn, giải đáp mọi thắc mắc</p>
                            </div>
                        </div>             
                    </div>
                </div>
            </div>
            <hr/>
            <div className="main-footer">
                <div className="container">
                    <div className="row main-footer__list">
                        <div className="main-footer__item col-md-3">
                            <div className="item--title">
                                <h4>Thông tin chung</h4>
                            </div>
                            <div className="item--content">
                                <div className="content__list">
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Giới thiệu về An Phát</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Tin tức</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Liên hệ - Góp ý</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Khách hàng doanh nghiệp</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Xây dựng cấu hình PC</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-footer__item col-md-3">
                            <div className="item--title">
                                <h4>Hỗ trợ khách hàng</h4>
                            </div>
                            <div className="item--content">
                                <div className="content__list">
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Hướng dẫn mua trực tuyến</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Hướng dẫn thanh toán</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Hướng dẫn mua hàng trả góp</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>In hoá đơn điện tử</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-footer__item col-md-3">
                            <div className="item--title">
                                <h4>Chính sách chung</h4>
                            </div>
                            <div className="item--content">
                                <div className="content__list">
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Chính sách vận chuyển</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Chính sách bảo hành</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Chính sách đổi trả và hoàn tiền</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Chính sách cho doanh nghiệp</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Chính sách hàng chính hãng</a>
                                        </Link>
                                    </div>
                                    <div className="content__item">
                                        <Link href="/">
                                            <a>Bảo mật thông tin khách hàng</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="main-footer__item col-md-3">
                            <div className="item--title">
                                <h4>Tổng đài hỗ trợ</h4>
                            </div>
                            <div className="item--content">
                                <div className="content__list">
                                    <div className="content__item">
                                        <i aria-hidden className="fas fa-phone-alt"></i>
                                        <strong>Hotline 1: </strong>
                                        <p>{global.hotline_1}</p>
                                    </div>
                                    <div className="content__item">
                                        <i aria-hidden className="fas fa-phone-alt"></i>
                                        <strong>Hotline 2: </strong>
                                        <p>{global.hotline_2}</p>
                                    </div>
                                    <div className="content__item">
                                        <i aria-hidden className="fas fa-envelope"></i>
                                        <strong>Email 1: </strong>
                                        <p>{global.email_1}</p>
                                    </div>
                                    <div className="content__item">
                                        <i aria-hidden className="fas fa-envelope"></i>
                                        <strong>Email 2: </strong>
                                        <p>{global.email_2}</p>
                                    </div>
                                    <div className="content__item">
                                        <i aria-hidden className="fas fa-map-marker-alt"></i>
                                        <strong>Địa chỉ 1: </strong>
                                        <p>{global.address_1}</p>
                                    </div>
                                    <div className="content__item">
                                        <i aria-hidden className="fas fa-map-marker-alt"></i>
                                        <strong>Địa chỉ 2: </strong>
                                        <p>{global.address_2}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
