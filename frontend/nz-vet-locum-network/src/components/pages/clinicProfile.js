import React from 'react'
import { CustomContext } from '../../context/Context'
import { useContext } from 'react'

function ClinicProfile() {

    const { authenticatedClinic, setAuthenticatedClinic } = useContext(CustomContext)
    const { currentUserInfoClinic, setCurrentUserInfoClinic } = useContext(CustomContext);

    return (
        <div><h1>Clinic Profile</h1></div>
    )
}

export default ClinicProfile