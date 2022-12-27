import React, { useState, useEffect, useContext } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { CustomContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../elements/PageHeader'
import ProfileBanner from '../../images/profile-banner.png'
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBBreadcrumb,
    MDBBreadcrumbItem,
    MDBProgress,
    MDBProgressBar,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem
} from 'mdb-react-ui-kit';
import ButtonBlue from "../elements/ButtonBlue";
import ButtonBlueOutlined from "../elements/ButtonBlueOutlined";


const theme = createTheme();

export default function DoctorProfile() {

    const navigate = useNavigate()
    const { user, setUser } = useContext(CustomContext)


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }
    }, []);

    console.log(user)

    //alert dialog to notify users that their signout is successful
    // const [open, setOpen] = React.useState(false);
    // const [message, setMessage] = React.useState('');

    // const openAlertDialog = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => { //close dialog box
    //     setOpen(false);
    // };

    // //dialog post form
    // const [openForm, setOpenForm] = React.useState(false);
    // const handleClickOpenForm = () => {
    //     setOpenForm(true);
    // };

    // const handleCloseForm = () => {
    //     setOpenForm(false);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);

    //     const email = data.get('email');
    //     const password = data.get('password');
    //     const first_name = data.get('first_name');
    //     const last_name = data.get('last_name');

    //     try {
    //         fetch(`http://localhost:4000/doctors/update/${user._id}`, {
    //             method: "PUT",
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 email: email,
    //                 password: password,
    //                 first_name: first_name,
    //                 last_name: last_name,
    //             })
    //         }).then(res => {
    //             if (!res.ok) throw new Error(res.status);
    //             else return res.json();
    //         }).then(response => {
    //             let updatedUserInfo = response;
    //             setMessage('Successfully updated your details')
    //             handleCloseForm();
    //             openAlertDialog();
    //         })
    //             .catch(error => {
    //                 console.log(error.message);
    //             });

    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // };


    // if there's a user show their profile
    if (user) {
        return <>
         <PageHeader maoriTitle="Tō Kōtaha" englishTitle="Your Profile" background={ProfileBanner}/>
            <section>
                <MDBContainer className="py-5">

                    <MDBRow>
                        <MDBCol lg="4">
                            <MDBCard className="mb-4">
                                <MDBCardBody className="text-center">
                                    <MDBCardImage
                                        src={`http://localhost:4000/images/${user.imageKey}`}
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: 'auto', height: '150px'}}
                                        fluid />
                                    <h3>Dr. {user.first_name} {user.last_name}</h3>
                                    <p className="text-muted mb-4">{user.city}, New Zealand</p>
                                    
                                </MDBCardBody>
                            </MDBCard>

                            
                        </MDBCol>
                        <MDBCol lg="8">
                            <MDBCard className="mb-4">
                                <MDBCardBody>
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Full Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.first_name} {user.last_name}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.phone}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Specialities</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.specialities}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>License</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.license}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Availability</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.availability}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="3">
                                            <MDBCardText>Work Requirement</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="9">
                                            <MDBCardText className="text-muted">{user.work_requirement}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBCardBody>
                            </MDBCard>
                            <ButtonBlue  name="Edit Details" style={{ marginRight: 30 }} ></ButtonBlue>
                            <ButtonBlueOutlined  name="Delete Profile" style={{ marginRight: 30 }} ></ButtonBlueOutlined>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>


        </>
    }

    // if there's no user, show the login form
    return (
        <div>Please login</div>
    );

}
