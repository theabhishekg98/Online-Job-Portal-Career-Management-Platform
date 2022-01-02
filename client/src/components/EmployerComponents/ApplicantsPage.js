import React, { Component } from 'react'
import JobList from './JobTestList'
import ApplicantSubComponent from './ApplicantSubComponent'
import axios from 'axios'
import Constants from '../../utils/constants';
import EmployerNavBar from './EmployerNavBar'
import Pagination from "@material-ui/lab/Pagination";
import { Box } from "@material-ui/core";
import Typography from '@mui/material/Typography';
const C = new Constants();


export default class ApplicantsPage extends Component {

    constructor(props) {
        super(props)
        this.employerDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {

            jobList: [],
            itemsPerPage: 5,
            page: 1,
            noOfPages: 0,
            empId:this.employerDetailsFromStorage.employerId
        }
    }


    componentDidMount(props) {
        // let empId = 3

        // console.log(this.props.location.state.empId)

        axios.get(`${C.Server_URL}/abhi/GetJobs/${this.state.empId}`).
            then(res => {
                console.log(res.data)
                this.setState(
                    {
                        jobList: res.data,
                        noOfPages: Math.ceil(res.data.length / this.state.itemsPerPage)
                    })
                console.log(res.data)

            }
            )



    }

    OnChangeNoOfPages = (e) => {
      
        this.setState({

            itemsPerPage: e.target.value

        })
        this.setState({
            noOfPages: Math.ceil(this.state.jobList.length / e.target.value)
        })


    }

    handlePageChange = (e,value)=>
    {
        this.setState(
            {
                page:value
            }
        )

    }



    render() {
        console.log(this.state)
        return (
            <div className="container-fluid" style={{ padding: "0px", margin: "0px" }}>
                <div className="row" style={{ padding: "0px", margin: "0px" }}>
                    <div className="container-fluid" style={{ padding: "0px", margin: "0px" }}>
                        <EmployerNavBar />
                        <div className="row" style={{ padding: "0px", margin: "0px" }}>
                            <center> <Typography >Jobs Posted</Typography></center>
                        </div>
                                          {/* slice((this.state.page - 1) * this.state.itemsPerPage, this.state.page * this.state.itemsPerPage) */}
                        {this.state.jobList.slice((this.state.page - 1) * this.state.itemsPerPage, this.state.page * this.state.itemsPerPage).map((job, key) => {
                            return <ApplicantSubComponent key={job.id} job={job} empId={this.state.empId} applicants={job.Applicants} Job_Title={job.JobTitle} Jobtype={job.jobType}  ></ApplicantSubComponent>
                        })}
                        {/* napplicants={job.Applicants.length} */}
                    <div className="row" style={{ padding: "0px", margin: "0px" }}>
                        <div className="col-md-4">
                            </div>
                    <div className="col-md-5" style={{marginLeft:"90px"}}>
                       
                        <Box component="span" >
                            <Pagination
                                count={this.state.noOfPages}
                                page={this.state.page}
                                onChange={this.handlePageChange}
                                defaultPage={1}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                            />
                        </Box>                    
                    </div>
                    <div className="col-md-3">
                    </div> 
                    <div>
                    

                        </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
