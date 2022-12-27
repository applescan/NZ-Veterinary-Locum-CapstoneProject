import React from 'react'
import PageHeader from '../elements/PageHeader'
import ClinicBanner from '../../images/clinic-banner.png'

export default function DoctorList() {
    return (
        <PageHeader maoriTitle="Nga Whare Haumanu kua Rehitatia" englishTitle="Registered Clinics" background={ClinicBanner}/>
    )
}

