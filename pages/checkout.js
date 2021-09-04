import Head from 'next/head'
import React from 'react'
import Checkout from '../components/Cart/Checkout'
import Breadcrumbs from '../components/Layout/Breadcrumb'

export default function checkout() {
    return (
        <div>
            <Head>
                <title>Checkout</title>
            </Head>
            <main>
                <Breadcrumbs />
                <Checkout />
            </main>
        </div>
    )
}
