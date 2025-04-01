/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate("/");
        }
    },[]);
    

    return (
        <>
        {children}
        </>
    )
}
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProtectedRoute;