import React from 'react'
import PageHeader from '../elements/PageHeader'
import JobBanner from '../../images/job-banner.png'

export default function jobList() {
    return (
        <>
            <PageHeader maoriTitle="Nga rarangi mahi" englishTitle="Job Listings" background={JobBanner} />
        </>
    )
}
