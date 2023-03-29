import {useEffect, useRef, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

const EmpListing = ()=> {

    const effectRun = useRef(false);
    const [empData, setEmpData] = useState();
    const [loading, setLoading] =useState(false);
    const [isDeleted, setDeleted] =useState(false);

    const [errorMsg, setErrorMsg] =useState('');

    const navigate = useNavigate();
    
    const fetchData = async()=>{
            
        setLoading(true);
        try{

            const {data} = await axios.get("https://employee2-service.onrender.com/employee");

        setTimeout(() => {
            setLoading(false);
            setEmpData(data);
            setErrorMsg('');
        }, 500);

        }
        catch(err){
            setLoading(false);
            setErrorMsg(err.message);
            toast.error(err.message);
        }     
}

        useEffect(() => {

            if(effectRun.current === true){

            
            fetchData();
            }

    return () =>{
        console.log("ummounted");
        effectRun.current=true;
    }

}, [])


    const LoadDetails = (e,id)=>{
        e.preventDefault();
        navigate('/employee/details/'+id);
    }

    const LoadEdit = (e,id)=>{
        e.preventDefault();
        navigate('/employeeForm/'+id);
    }

    const DeleteFunction= (e,id)=>{
        e.preventDefault();

        if (window.confirm("Do you want to remove?")) {
        fetch("https://employee2-service.onrender.com/employee/" + id, {
            method: "DELETE",
        })
            .then((res) => {
            toast.success("It has been deleted successfully",{autoClose: 700})
            
            // window.location.reload();
            setDeleted(true);
            fetchData();

            
            })
            .catch((err) => {
            console.log(err.message);
            });
        }


    }


return (
    <div className='container'>
        <div className='card'>
            <div className='card-title'>
                <h2>Employee List</h2>
            </div>

            {loading && isDeleted===false &&
            <div className='d-flex flex-column justify-content-center align-items-center' style={{"height":"200px"}}>
            <ReactLoading  type="spinningBubbles" color="black" height={70} width={70} />
            <h4>Please Waiting ...</h4>
            </div>
            }


            {
            empData &&
            errorMsg ===''?(
                <div className='card-body'>

            
                <div className='float-start'>
                        <Link to="/employeeForm/add" className='btn btn-success my-2'>Add New (+)</Link>
                    </div>
                    <table className='table table-bordered table-striped table-hover table-sm'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        
                        <tbody>
                                {empData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <Link onClick={(e) => {LoadEdit(e,item.id)}} className='btn btn-success'>Edit</Link>
                                            <Link onClick={(e) => {DeleteFunction(e,item.id)}} className='btn mx-2 my-sm-2 btn-danger'>Delete</Link>
                                            <Link onClick={(e) =>LoadDetails(e,item.id)} className='btn btn-primary'>Details</Link>
    
                                        </td>
    
                                    
                                    </tr>
                                ))
                            }
                            
    
    
                        </tbody>
    
                    </table>
    
    
                </div>
            ) : (<h2 className='d-flex justify-content-center align-items-center' style={{"color":"red","height":"200px"}}>{errorMsg}</h2>)
                        }

            


        </div>

    
    </div>
)
}

export default EmpListing;
