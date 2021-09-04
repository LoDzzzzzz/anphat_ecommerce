import React from 'react'
import getStrapiMedia from '../../libs/media'

export default function BannerAd({bannerAd}) {
    return (
        <section id="banner-ad">
            <div className="container">
                <div className="row">
                    {bannerAd.image.length === 3 && bannerAd.image.map((image, key) => {
                        return(
                            <div className="col-md-4 banner-ad--block" key={key}>
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
