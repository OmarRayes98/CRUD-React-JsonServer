import { useState,useEffect } from "react";
import { Link, useParams } from "react-router-dom";


const EmpDetails = () =>
{

    const {empid} =useParams();

    const [empdata ,setEmpData]= useState({});

    useEffect(() => {
        fetch("https://employee2-service.onrender.com/employee/"+empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEmpData(resp);
        }).catch((err) => {
            console.log(err.message);
        })
        
    }, [empid])


return (
    <div>
        <div className="card" style={{"textAlign":"center"}}>
            <div className="card-title">
            <h1>Employee Details</h1>
            </div>

            
        {
        empdata &&
        <div>
        <h3 className="hh3" >The Employee Name is : {empdata.name} ({empdata.id})</h3>
        <h4 className="hh4" >Contact Details</h4>
        <h6>Email is :{empdata.email}</h6>
        <h6>Phone is :{empdata.phone}</h6>
        <Link to="/" className="btn btn-danger mb-3">Back to List</Link>

        </div>
        }

        </div>
    </div>
)
}

export default EmpDetails;
