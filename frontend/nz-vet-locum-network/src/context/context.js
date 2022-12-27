import React, { createContext, useState } from 'react';

export const CustomContext = createContext();

const Context = ({ children }) => {

    const [authenticated, setAuthenticated] = useState(false); //context for checking if user is authenticated
    const [currentUserInfo, setCurrentUserInfo] = useState({}); //context for current signed in users data


    const [authenticatedClinic, setAuthenticatedClinic] = useState(false); //context for checking if clinic is authenticated
    const [currentUserInfoClinic, setCurrentUserInfoClinic] = useState({}); //context for current signed in users data

    return <CustomContext.Provider value={{
        authenticated, setAuthenticated, currentUserInfo, setCurrentUserInfo,
        authenticatedClinic, setAuthenticatedClinic, currentUserInfoClinic, setCurrentUserInfoClinic
    }}> {children}</CustomContext.Provider>

}

export default Context;