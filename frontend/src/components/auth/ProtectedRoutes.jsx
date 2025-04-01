/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProtectedRoutes = ({children}) => {
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user === null || user.role !== 'student'){
            navigate("/admin/companies");
        }
    },[]);
    

    return (
        <>
        {children}
        </>
    )
}
ProtectedRoutes.propTypes = {
    children: PropTypes.node.isRequired,
};
export default ProtectedRoutes;