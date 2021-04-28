import React from 'react'
import { Link } from "react-router-dom";

export const HomePage= () => {
    // console.log("Home")
    return (
        <>
            <div>It's home page</div>
            <Link to={'/statistics'}>hleb</Link>
        </>

    )
}