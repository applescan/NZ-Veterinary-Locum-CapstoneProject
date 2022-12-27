import React from 'react'
import PageHeader from '../elements/PageHeader'
import AboutBanner from '../../images/about-banner.png'

export default function About() {

    return (
        <div>
            <PageHeader maoriTitle="Ko wai mātou" englishTitle="About Us" background={AboutBanner}/>
        </div>
    )
}
