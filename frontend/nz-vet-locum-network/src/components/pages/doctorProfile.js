import React from 'react'
import { CustomContext } from '../../context/context'
import { useContext } from 'react'

function DoctorProfile() {

    const { authenticated, setAuthenticated } = useContext(CustomContext)
    const { currentUserInfo, setCurrentUserInfo} = useContext(CustomContext);

    return (
        <div><h1>Your Profile</h1></div>
    )
}

export default DoctorProfile