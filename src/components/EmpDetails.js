import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EmpDetails = () =>
{

    const {empid} =useParams();

    const [empdata ,setEmpData]= useState({});

    useEffect(() => {
        fetch("http://localhost:8000/employee/"+empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEmpData(resp);
        }).catch((err) => {
            console.log(err.message);
        })
        
    }, [empid])


return (
    <div>
        <div className="card" style={{"textAlign":"left"}}>
            <div className="card-title">
            <h2>Employee Deatlis</h2>
            </div>

            <div className="card-body"></div>
            
        {
        empdata &&
        <div>
        <h1>The Employee name is : {empdata.name} ({empdata.id})</h1>
        <h3>Contact Details</h3>
        <h5>Email is :{empdata.email}</h5>
        <h5>Phone is :{empdata.phone}</h5>
        <Link to="/" className="btn btn-danger">Back to List</Link>

        </div>
        }

        </div>
    </div>
)
}

export default EmpDetails;
