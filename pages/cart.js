import Head from 'next/head'
import React from 'react'
import Cart from '../components/Cart/Cart'
import BreadCrumb from '../components/Layout/Breadcrumb'

export default function cart() {
    return (
        <div>
            <Head>
                <title>Cart</title>
            </Head>
            <main>
                <BreadCrumb />
                <Cart />
            </main>
        </div>
    )
}
