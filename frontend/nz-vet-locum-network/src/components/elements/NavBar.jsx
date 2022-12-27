import React, { useState, useEffect, useContext } from "react";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBCollapse
} from 'mdb-react-ui-kit';
import Logo from '../../images/logo.png'
import Toggle from '../../images/toggle.png'
import ButtonBlue from './ButtonBlue'
import ButtonBlueOutlined from './ButtonBlueOutlined';
import { useNavigate } from 'react-router-dom'
import { CustomContext } from '../../context/Context';


export default function NavBar() {

    const [showNav, setShowNav] = useState(false);
    const { user, setUser } = useContext(CustomContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear(); //clear user data on sign-out 
        navigate('/')
        window.location.reload()
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }
    }, []);

    console.log(user)

    if (user) {
        return <div className='nav-shadow'>
            <MDBNavbar sticky expand='lg' light style={{ backgroundColor: '#F3F9FF' }} >
                <MDBContainer fluid >
                    <MDBNavbarBrand href='/'>
                        <img
                            src={Logo}
                            height='70'
                            alt=''
                            loading='lazy'
                        />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        type='button'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNav(!showNav)}
                    >
                        <img
                            src={Toggle}
                            height='40'
                            alt='toggle icon'
                            loading='lazy'
                        />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav style={{ margin: 20 }}>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/job-search' >
                                    Job Search
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/doctors' >
                                    Doctors
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/clinics' >
                                    Clinics
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/about' >
                                    About Us
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/doctor-profile'>
                                    Your Profile
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <div className='nav-button'>
                            <ButtonBlue onClick={handleLogout} name="Logout" style={{ marginRight: 30 }} ></ButtonBlue>

                        </div>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    }

    return (
        <div className='nav-shadow'>
            <MDBNavbar sticky expand='lg' light style={{ backgroundColor: '#F3F9FF' }} >
                <MDBContainer fluid >
                    <MDBNavbarBrand href='/'>
                        <img
                            src={Logo}
                            height='70'
                            alt=''
                            loading='lazy'
                        />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler
                        type='button'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setShowNav(!showNav)}
                    >
                        <img
                            src={Toggle}
                            height='40'
                            alt='toggle icon'
                            loading='lazy'
                        />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar show={showNav}>
                        <MDBNavbarNav style={{ margin: 20 }}>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/job-search'>
                                    Job Search
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/doctors' >
                                    Doctors
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/clinics'>
                                    Clinics
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                            <MDBNavbarItem>
                                <MDBNavbarLink href='/about'>
                                    About Us
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                        <div className='nav-button'>
                            <ButtonBlueOutlined onClick={() => { navigate(`/sign-in`) }} name="Login" style={{ marginRight: 30 }} ></ButtonBlueOutlined>
                            <ButtonBlue onClick={() => { navigate(`/sign-up`) }} name="Register" style={{ marginRight: 30 }}></ButtonBlue>
                        </div>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>
        </div>
    );
}
