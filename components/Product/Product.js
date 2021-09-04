import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import formatCash from '../../libs/formatCash'
import getStrapiMedia from '../../libs/media'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product({product}) {
    const [quantity, setQuantity] = useState(0)
    const [priceProduct, setPriceProduct] = useState(0)
    const [option, setOption] = useState([])
    const [newProduct, setNewProduct] = useState(product,{ price: 0, quantity: 0, option: [{name: null, choose: null}]})
    const appContext = useContext(AppContext);
    
    console.log(product)

    const notify = () => {
        appContext.addItem({...newProduct, 
            price:  Math.round
                ((sumPrice() + sumUnitPrice() + parseFloat(priceProduct))/ 10000)*10000,
            quantity: quantity, 
            option: option, 
            id: appContext.cart.items.length})

        toast.success(`Đã thêm sản phẩm ${product.title} vào giỏ hàng thành công.`)
    }

    const handleOption = (name, choose, price, unit_price) => {
        const index = option.findIndex((i) => i.name === name)
        
        if(index === -1){
            setOption([...option, {name: name, choose: choose, price: price, unit_price: unit_price}])     
        } else {  
            const newOption = option.slice()
            newOption[index].price = price
            newOption[index].choose = choose
            newOption[index].unit_price = unit_price
            setOption(newOption)
        }
        sumPrice
        sumUnitPrice
    }
   
    const sumPrice = () => {
        let sum = 0
        option.map((op) => {
            return sum += op.price  
        })
        return sum
    }

    const sumUnitPrice = () => {
        let sumUnit = 0
        option.map((op) => {
            return sumUnit += op.unit_price
        })
        return sumUnit*quantity
    }

    useEffect(()=>{
        setQuantity(product.quantity_price[0].quantity)
        setOption([])
        setPriceProduct(product.quantity_price[0].price)
    },[product])
    
    console.log(product)
    
    return (
        <div id="product">
            <div className="container">
                <div className="row product--bg">
                    <div className="col-md-6 product-image">
                        <img src={getStrapiMedia(product.image)} alt="product image" />
                    </div>
                    <div className="col-md-6 product-infor">
                        <div className="product-infor__header">
                            <h1 className="header--title">{product.title}</h1>
                            <p className="header--description">{product.description}</p>
                        </div>
                        <hr />
                        <div className="product-infor__attributes">
                            <div className="attributes__title">
                                <i className="fas fa-question-circle"></i>  
                                <h2>Thông tin sản phẩm</h2>
                            </div>
                            <ul className="attributes__list">
                                {product.attribute && product.attribute.map((e, key) => {
                                    return(
                                        <li className="attributes__item" key={key}>
                                            <span>{e.name}: {e.content}</span>
                                        </li>
                                    )
                                })}        
                            </ul>
                        </div>
                        <hr />
                        <div className="product-infor__require">
                            <div className="require__title">
                                <i className="fas fa-assistive-listening-systems"></i>
                                <h2>Yêu cầu sản phẩm</h2>       
                            </div>
                            {product.require 
                                && product.require.map((require, key) => {
                                    return(
                                        <form className="require__form" key={key}>
                                            <div className="require-form__title">
                                                <p>{require.name}</p>
                                            </div>
                                            <div className="require-form__list">
                                                {require.option 
                                                    && require.option.map((e, key_id) => {                                   
                                                        return(
                                                            <div className="require-form__item" key={key_id}>
                                                                <input className="item--radio" 
                                                                type="radio" 
                                                                name="radio_name" 
                                                                value={e.content}
                                                                id={e.id}
                                                                defaultChecked={e.content=== "Không"}
                                                                onChange={()  => {
                                                                handleOption(
                                                                    require.name, 
                                                                    e.content, 
                                                                    parseFloat(e.price), 
                                                                    parseFloat(e.unit_price)
                                                                )}}  
                                                                />
                                                                <span>{e.content}</span>
                                                            </div>
                                                        )
                                                    })}
                                            </div>
                                        </form> 
                                    )
                                })}
                            <form className="require__form-2">  
                                <div className="require__quantity">
                                    <p>Số lượng</p>
                                    <select className="quantity" name="quantity" id="quantity" value={quantity} 
                                    onChange={(e) => {
                                        setQuantity(e.target.value), 
                                        product.quantity_price.map((i) => {
                                            if(i.quantity == e.target.value){
                                                setNewProduct({
                                                    ...product,
                                                    price: Math.round
                                                    ((sumPrice() + sumUnitPrice() + parseFloat(priceProduct))/ 10000)*10000,
                                                    quantity: i.quantity, 
                                                    
                                                });
                                                setPriceProduct(i.price)
                                            }
                                        })
                                    }}
                                    >
                                        {product.quantity_price 
                                            && product.quantity_price.map((e, key) => {
                                                return(
                                                    <option key={key}>
                                                        {e.quantity}
                                                    </option>            
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="require__deadline">
                                    <p>Thời gian hoàn thành</p>
                                    <span>{product.deadline} Ngày</span>
                                </div>
                            </form>
                        </div>
                        <div className="product-infor__price">
                            <div className="price-title">
                                <i className="fas fa-dollar-sign"></i>
                                <h2>Thành tiền</h2>
                            </div>             
                            <div className="price-content">
                                <div className="old-price">
                                    <h4> {formatCash((Math.round((sumPrice() + sumUnitPrice() + parseFloat(priceProduct)) / (1 - product.discount / 100) / 10000)*10000).toString())}VNĐ</h4>
                                </div>
                                <div className="price">
                                    <h3>
                                    {formatCash((
                                        Math.round
                                        ((sumPrice() + sumUnitPrice() + parseFloat(priceProduct))/ 10000)*10000
                                        ).toString())}
                                        VNĐ
                                    </h3>
                                </div>
                                <div className="discount">
                                    <span>Giảm {product.discount}%</span>
                                </div>
                            </div>                 
                        </div>
                        <div className="product-infor__order">
                            <button id="btn" className="btn-order" 
                            onClick={notify}> Đặt hàng ngay </button>
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
                <div className="row"></div>
                <div className="row"></div>
            </div>
        </div>
    )
}
