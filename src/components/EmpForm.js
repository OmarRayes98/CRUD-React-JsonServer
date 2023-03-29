import { useState,useEffect } from 'react';
import { Link,useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmpCreate = () =>
{

    const [id,setID] =useState("");
    const [name , setName] =useState("");
    const [email , setEmail] =useState("");
    const [phone , setPhone] =useState("");
    const [active , setActive] =useState(true);
    const [validation , setValidation] =useState(false);

    const navigate =useNavigate();
    const {empid} =useParams();

    let checkTwice =true;

    const toastClosed = ()=>{
    
        checkTwice =!checkTwice;
        checkTwice && navigate('/',{ replace: true }) ;
    }


        useEffect(() => {
            if(empid !=="add"){

            fetch("http://localhost:8000/employee/"+empid).then((res) => {
                return res.json();
            }).then((resp) => {
    
                setID(resp.id);
                setName(resp.name);
                setEmail(resp.email);
                setPhone(resp.phone);
                setActive(resp.active);
    
    
            }).catch((err) => {
                console.log(err.message);
            })

        }
            
        }, [empid]);


    

    const handleSubmit = (e)=>{
        e.preventDefault();
        const empdata = {name,email,phone,active};
        
        if(empid==="add"){
            
        fetch("http://localhost:8000/employee",
        { 
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(empdata)
        }
        ).then((res)=>{

            toast.success('It has been added successfully', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                onClose: ()=> toastClosed()
            });
        }).catch((err)=>{
            console.log(err.message);
        });

        }else{
            fetch("http://localhost:8000/employee/"+empid,
        { 
            method:"PUT",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(empdata)
        }
        ).then((res)=>{
            toast.success('It has been edited successfully', {
                position: "bottom-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                onClose: ()=> toastClosed()
            });
            

        }).catch((err)=>{
            console.log(err.message);
        });

        }

    }


return (
    <div>
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="conatiner" onSubmit={handleSubmit}>
                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Employee {empid==="add"?"Add" :"Edit"}</h2>
                        </div>

                        <div className="card-body">

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="form-control"/>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e => setValidation(true)} onChange={e => setName(e.target.value)} className="form-control"/>
                                    {name.length===0 && validation&& <span className='text-danger'>Enter your name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e => setPhone(e.target.value)} className="form-control"/>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-check">
                                    <input checked={active} onChange={e => setActive(e.target.checked)} type="checkbox" className="form-check-input"/>
                                        <label className="form-check-label">Is Active</label>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-groub">
                                        <button className="btn btn-success" type="submit">{empid==="add"?"Add":"Edite"}</button>
                                        <Link to="/" className="btn btn-danger m-2">Back</Link>

                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>

                </form>
            </div>

        </div>
    
    </div>
)
}

export default EmpCreate;
