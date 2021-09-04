import React from 'react'
import getStrapiMedia from '../../libs/media'

export default function BannerAd2({bannerAd}) {
    return (
        <section id="banner-ad-2">
            <div className="container">
                <div className="row">
                    {bannerAd.image && bannerAd.image.map((image, key) => {
                        if(key < 3)
                        return(
                            <div className="col-md-6 banner-ad--block" key={key}>
                                <a href="/">
                                    <img src={getStrapiMedia(image)} alt="banner ad" />
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
