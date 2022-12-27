import React from 'react'
import PageHeader from '../elements/PageHeader'
import DoctorBanner from '../../images/doctor-banner.png'

export default function DoctorList() {
    return (
        <PageHeader maoriTitle="Wātea Locums" englishTitle="Available Locums" background={DoctorBanner}/>
    )
}
