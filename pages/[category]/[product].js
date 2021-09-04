import React, { Component, useContext, useEffect } from 'react'
import Breadcrump from '../../components/Layout/Breadcrumb'
import strapiClient from '../../libs/api'
import Product from '../../components/Product/Product'
import Head from 'next/head'

export async function getStaticPaths() {
    const products = await strapiClient("/products")
   
    const paths = products.map((product) => ({
        params: { 
            product: product.slug,
            category: product.category.slug
        },
      }))
    
    return { 
        paths , 
        fallback: false }
  }

export const getStaticProps = async ({params}) => {
    const data = await strapiClient(`/products?slug=${params.product}`)
    
    return {
        props: {
            product: data[0],
        }
    }
}

const product = ({product}) => {  
    return (
        <div>
            <Head>
                <title>{product.title}</title>
            </Head>
            <main>
                <Breadcrump />
                <Product product={product}/>
            </main>
        </div>
    )
}

export default product
