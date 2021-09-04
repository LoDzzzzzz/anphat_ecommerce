import BannerAd from "../components/Home/BannerAd";
import ProductsHot from "../components/Home/ProductsHot";
import BannerAd2 from "../components/Home/BannerAd2";
import ProductsFeatured from "../components/Home/ProductsFeatured";
import Slider from "../components/Home/Slider";
import strapiClient from '../libs/api'
import Head from "next/head";
import { useContext } from "react";
import { GlobalContext } from "./_app";
import getStrapiMedia from "../libs/media";

export const getServerSideProps = async () => {
  const data = await strapiClient('/home')

  return {
    props: {
      home: data
    }
  }
}

export default function Home({home}) {
  return (  
    <>
      <Head>
        
      </Head>
      <main>
        <Slider banner={home.banner} />
        <BannerAd bannerAd={home.banner_ad} />
        <ProductsHot />
        <BannerAd2 bannerAd={home.banner_ad_2} />
        <ProductsFeatured />
      </main>
    </>
  )
}
