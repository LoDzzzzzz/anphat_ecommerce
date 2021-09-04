import { createContext, useEffect, useState } from 'react'
import App from 'next/app'
import strapiClient from '../libs/api'
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../context/AppContext";
import { ToastProvider } from 'react-toast-notifications';
import Layout from '../components/Layout/Layout'

import '../styles/globals.scss'
import '../styles/reset.css'
import Head from 'next/head';
import getStrapiMedia from '../libs/media';



MyApp.getInitialProps = async (ctx) => {
  const appProps = await App.getInitialProps(ctx);

  const global = await strapiClient("/global");
  const categories = await strapiClient("/categories")
  const products = await strapiClient("/products")
  const menus = await strapiClient("/menus")
  const color = await strapiClient("/color")

  return { ...appProps, pageProps: { global, menus, categories, products, color } };
};

export default function MyApp({ Component, pageProps }) {
  const { global, menus, categories, products, color } = pageProps;
  const [user, setUser] = useState(null)
  const [userId, setUserId] = useState(0)
  const [cart, setCart] = useState({items: [], total: 0})
  const [notify, setNotify] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    function bodyStyle(){
      var bodyStyles = document.body.style;
      bodyStyles.setProperty('--primary-color', `${color.primary_color}`);  
      bodyStyles.setProperty('--secondary-color', `${color.secondary_color}`);
      bodyStyles.setProperty('--text-color-1', `${color.text_color_1}`);
      bodyStyles.setProperty('--text-color-2', `${color.text_color_2}`);
      bodyStyles.setProperty('--text-color-3', `${color.text_color_3}`);
      bodyStyles.setProperty('--background-color-1',`${color.background_color_1}`);
      bodyStyles.setProperty('--background-color-2',`${color.background_color_2}`); 
    }
    bodyStyle()
  },[color])

  useEffect(() => {
    if(showModal){
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  },[showModal])

  useEffect(() => {   
    const cartCookie = JSON.parse(localStorage.getItem("cart"))
    if (cartCookie) {
      setCart(cartCookie)
    } else {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  },[])

  useEffect(() => {   
    const token = Cookie.get("token")

    if(token){
      fetch(`${process.env.STRAPI_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          setUser(null);
          return null;
        }
        const data = await res.json();
        setUser(data)
      });
    }
  },[userId])
  
  const addItem = (item) => {
    let {items} = cart
    
    const newCart = JSON.stringify({
      items: [...items, item], 
      total: cart.total + parseFloat(item.price)
    })

    setCart({
      items:  [...items, item], 
      total: cart.total + parseFloat(item.price)
    })
  
    localStorage.setItem("cart", newCart)
  }
  
  const removeItem = (currentItem) => {
    let { items } = cart;
    
    const index = items.findIndex((i) => i.id === currentItem.id)
    items.splice(index, 1)
    
    const newCart = JSON.stringify({
      items: items,
      total: cart.total - parseFloat(currentItem.price)
    })
    
    setCart({
          items: items,
          total: cart.total - parseFloat(currentItem.price)
    })
      
    localStorage.setItem("cart", newCart)  
  }
 

  return (
    <>
      <AppContext.Provider value ={{
          global: global,
          user: user,
          isAuthenticated: !!user,
          setUser: setUser,
          products: products,
          categories: categories,
          menus: menus,
          cart: cart,
          addItem: addItem,
          removeItem: removeItem,
          notify: notify,
          showModal: showModal,
          setShowModal: setShowModal,
        }}
      >
          <Head>
              <link rel="icon" type="image/png" href={getStrapiMedia(global.logo_1)}/>
              <title>{global.company}</title>
          </Head>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </AppContext.Provider>
    </>  
  
  )
}
