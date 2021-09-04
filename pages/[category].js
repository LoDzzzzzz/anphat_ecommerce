import React, { Component, useContext, useEffect } from 'react'
import Category from '../components/Product/Category'
import Breadcrump from '../components/Layout/Breadcrumb'
import TopBanner from '../components/Layout/TopBanner' 
import strapiClient from '../libs/api'
import getStrapiMedia from '../libs/media'

export async function getStaticPaths() {
    const categories = await strapiClient("/categories")
   
    const paths = categories.map((category) => ({
        params: { 
            category: category.slug,
        },
      }))
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { 
        paths , 
        fallback: false }
  }

export const getStaticProps = async ({params}) => {
    const data = await strapiClient(`/categories?slug=${params.category}`)
    
    return {
        props: {
            category: data[0],
        }
    }
}

const category = ({category}) => {
    
    return (
        <div>
            <TopBanner img={getStrapiMedia(category.image)} title={category.name} />
            <Breadcrump />
            <Category category={category} />
        </div>
    )
}

export default category
