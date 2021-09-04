import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import AppContext from "../../context/AppContext";
import Link from "next/dist/client/link";
import getStrapiMedia from "../../libs/media";
import Product from "../Product/Product"

function Modal({show, onClose}) {
    const [isBrowser, setIsBrowser] = useState(false)
    const appContext = useContext(AppContext)
    const {categories} = appContext
    const {products} = appContext
    const [targetCat, setTargetCat] = useState(categories[0])
    const [showProduct, setShowProduct] = useState(null)
    

    useEffect(() => {
      setIsBrowser(true)
    }, [categories]);
    
    const setCat = (index) => {
      if(index){
        setTargetCat(categories[index])
      }
    }

    const setProduct = (i) => {
      if(i){
        setShowProduct(products.find(e => {return e.id === i}))
      }
    }

    const handleCloseClick = (e) => {
      e.preventDefault()
      onClose()
    }
    
    const modalContent = show ? (
      <div className="modalContainer" onClick={handleCloseClick}>
          <div className="container-fluid modal-block" onClick={e => e.stopPropagation()}>
              <header className="row modal_header">
                  <h2 className="modal_header__title">Danh mục</h2>
                  <div className="modal_header__search">
                    <select className="search--option" onChange={e => {setCat(e.target.value); setShowProduct(null)}}>
                      <option value="">Tất cả danh mục</option>
                      {categories && categories.map((category, id) => {
                          return(
                              <option value={id}  key={id}>
                                {category.name}
                              </option>
                          )
                      })}
                    </select>
                  </div>
                  <button className="close" onClick={handleCloseClick}>
                    <i className="fas fa-times"></i>
                  </button>
              </header>

              <main className="row modal_content"> 
                      <div className="col-md-4 modal_content__sidebar">
                        <div className="sidebar__list">
                          {categories 
                            && categories.map((category, id) => {
                              return (
                                <div className="sidebar__item" 
                                key={id}
                                onClick={() => {setCat(id); setShowProduct(null)}}
                                >
                                    <div className="category-title">
                                        <i aria-hidden className={category.icon}></i>
                                        <a>{category.name} </a>                  
                                    </div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="col-md-8 modal_content__content">
                          <div className="content__list">
                          {showProduct ? 
                            <Product product={showProduct} />
                            : 
                            <div>
                              <div className="row list__header">
                                  <span>{targetCat.products.length} Sản phẩm</span>
                              </div>
                              {targetCat &&
                                  targetCat.products.map((product) => {
                                      return(               
                                        <div className="row content__item">
                                          <img className="col-md-3" src={getStrapiMedia(product.image)} alt={`${product.title} image`} />
                                          <div className="col-md-7 item__infor">
                                            <h1>{product.title}</h1>
                                            <p>{product.description}</p>
                                            <h4>Chỉ từ........</h4>
                                          </div>
                                          <div className="col-md-2 btn-add">
                                            <button id="btn" className="btn-product-plan" onClick={() => setProduct(product.id)}>
                                              +
                                            </button>
                                          </div>
                                        </div>
                                      )
                              })}
                            </div>
                     
                          }
                          </div>
                      </div>
              </main>
          </div>  
      </div>
      
    ) : null

    if (isBrowser) {
        return createPortal(
            modalContent,
            document.getElementById("modal")
        )
      } else {
        return null;
      }    
  
}

export default Modal;