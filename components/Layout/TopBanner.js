import React from 'react'

export default function TopBanner(props){
    return(
        <section id="top-banner">
            <div className="top-banner__img">
                <img src={props.img} alt="banner" />
                <div className="img--layout" />
                <div className="top-banner__title">
                    <h2>{props.title}</h2>
                </div>
            </div>   
        </section>

    )
}
