import React, { Component } from 'react'
import serverroute from '../../webconfig';
import EmployerNavBar from './EmployerNavBar'
import TablePagination from '@mui/material/TablePagination';
var axios = require("axios").default;
export class Reports extends Component {
    constructor(props) {
        super(props)
        this.employerDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
             allJobs:[],
             totalApplicantsPerJob:undefined,
             totalAccepted:undefined,
             totalRejected:undefined,
             page: 0,
             rowsPerPage: 5
        }
    }
    componentDidMount(){
        let empId=this.employerDetailsFromStorage.employerId
        // let companyId=3
        let url=`${serverroute}/ha/employer/${empId}/reports/stats`
        axios.get(url).then(res=>{
            this.setState({
                allJobs:res.data.allJobs,
                totalApplicantsPerJob:res.data.totalApplicationsPerJob,
                totalAccepted:res.data.totalAccepted,
                totalRejected:res.data.totalRejected
            })
        })
    }
    handleChangePage = (event, newPage) => {
        // setPage(newPage);
        this.setState({ page: newPage })
    };

    handleChangeRowsPerPage = (event) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        // setPage(0);
        this.setState({
            rowsPerPage: parseInt(event.target.value, 10),
            page: 0
        })
    };
    render() {
        return (
        <React.Fragment>
            <EmployerNavBar></EmployerNavBar>
            <div className="container mt-2">
            <TablePagination
                                    component="div"
                                    count={this.state.allJobs.length}
                                    page={this.state.page}
                                    onPageChange={this.handleChangePage}
                                    rowsPerPage={this.state.rowsPerPage}
                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                    rowsPerPageOptions={[2, 5, 10]}
                                />
                <table class="table table-striped">
                    <thead>
                        <tr>
                            {/* <th scope="col">#</th> */}
                            <th scope="col">Job IDs</th>
                            <th scope="col">Applicants Applied</th>
                            <th scope="col">Applicant Selected</th>
                            <th scope="col">Applicant Rejected</th>
                        </tr>
                    </thead>
                    <tbody>
                    {(this.state.rowsPerPage > 0
                                ? this.state.allJobs.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.allJobs
                            ).map((i, index) => {
                                return <tr key={i}>
                                <td>{i}</td>
                                <td>{this.state.totalApplicantsPerJob[i]!==undefined?this.state.totalApplicantsPerJob[i]:0}</td>
                                <td>{this.state.totalAccepted[i]?this.state.totalAccepted[i]:0}</td>
                                <td>{this.state.totalRejected[i]?this.state.totalRejected[i]:0 }</td>
                            </tr>
                 })}
                        {/* {this.state.allJobs.map(i=>{
                            return <tr key={i}>
                                <td>{i}</td>
                                <td>{this.state.totalApplicantsPerJob[i]!==undefined?this.state.totalApplicantsPerJob[i]:0}</td>
                                <td>{i.acceptedApplications?i.acceptedApplications:0}</td>
                                <td>{i.rejectedApplications?i.rejectedApplications:0 }</td>
                            </tr>
                        })} */}
                        
                    </tbody>
                </table>
            </div>
            </React.Fragment>
        )
    }
}

export default Reports
