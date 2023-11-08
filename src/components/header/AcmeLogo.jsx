import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const AcmeLogo = (props) => {
    const navigate = useNavigate();

    return (
        <Link onClick={() => navigate(`/`)}>
            <img src={props.logo} width="60px" height="27.65px" alt="" srcSet="" />
        </Link>
    );
};
