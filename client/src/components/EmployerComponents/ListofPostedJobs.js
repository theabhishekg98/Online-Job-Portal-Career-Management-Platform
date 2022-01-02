import React, { Component } from 'react'
import JobList from './JobTestList'
export default class ListofPostedJobs extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }


    componentDidMount(props) {

    }



    render() {
        return (
            <div>
                <div className="container-fluid" style={{ padding: "0px", margin: "0px" }}>
                    <div className="row" style={{ padding: "0px", margin: "0px" }}>
                        <nav class="navbar navbar-expand-lg navbar-light bg-light">
                            <a className="navbar-brand" href="#">DummyNavbar</a>
                        </nav>
                    </div>
                    <div className="row" style={{ padding: "0px", margin: "0px" }}>
                       <center> <h5 style={{fontFamily:"-webkit-pictograph"}}>Posted jobs</h5></center>
                    </div>
                       
                        {JobList.map((job, key) =>{return <div className="row" style={{ padding: "0px", marginLeft: "0px", marginRight: "0px", marginTop: "10px"}}>
                     
                            <div className="col-md-2">
                              
                            </div>
                            <div className="col-md-8">
                                <div class="list-group">
                                    <a href="#" class="list-group-item list-group-item-action flex-column align-items-start ">
                                        <div class="d-flex w-100 justify-content-between">
                                            <h5 class="mb-1">{job.Job_Title}</h5>
                                            {/* <small>3 days ago</small> */}
                                        </div>
                                        <p class="mb-1">{job.Industry}</p>
                                        <small>{job.Jobtype}</small>
                                        <small>{job.job_mode}</small>
                                        <small>{job.city}</small>
                                    </a>
                               
                                </div>
                            </div>
                            <div className="col-md-2">
                            
                            </div>
                       
                        </div>
                        })
                        }
                    
                </div>
            </div>
        )
    }
}
