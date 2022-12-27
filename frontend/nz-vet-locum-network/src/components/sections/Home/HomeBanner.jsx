import React from 'react'
import ButtonBlue from '../../elements/ButtonBlue'
import Banner from '../../../video/banner.mp4'
import { useNavigate } from 'react-router-dom'

export default function HomeBanner() {

    const navigate = useNavigate()


    return (

        <div className='Header-container'>
            <div className="Header-overlay"></div>
            <video src={Banner} autoPlay loop muted />
            <div className="Header-content">
                <h1>Join our network to help locums find better job opportunities,
                    better experiences, and better lives for our pets in Aotearoa New Zealand</h1>
                <br></br>
                <ButtonBlue onClick={() => { navigate(`/job-search`) }} name="See Job Listings"></ButtonBlue>
            </div>
        </div>

    )
}

