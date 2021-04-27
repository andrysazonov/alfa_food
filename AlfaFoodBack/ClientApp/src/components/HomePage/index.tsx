import React from 'react'
import { Link } from "react-router-dom";

export default () => {
    return (
        <>
            <div>It's home page</div>
            <Link to={'/statistics'}>hleb</Link>
        </>

    )
}