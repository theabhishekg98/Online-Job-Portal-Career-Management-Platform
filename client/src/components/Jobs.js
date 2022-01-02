import axios from 'axios';
import React, { Component } from 'react';
import serverroute from '../webconfig';
import AWS from 'aws-sdk';
import UserNavbar from './userNavbar'
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import Utils from '../utils/utils';
import Constants from '../utils/constants';
const utils = new Utils();
const C = new Constants();

class Jobs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            S3_BUCKET: '273-indeed',
            REGION: 'us-east-2'
        };
        AWS.config.update({
            accessKeyId: 'AKIA424XFIGBESA3IRUX',
            secretAccessKey: '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'
        })
        this.onimageChange = this.onimageChange.bind(this);
        this.onApply = this.onApply.bind(this);
    }

    getJobdetails =()=>{
        var companydetails = this.jobId+" "+this.companyId;
        console.log("here are the detaiuks"+companydetails)
        axios.get(`${serverroute}/jobs/getjobs/`,companydetails)
        .then(response=>{
            this.setState({
                companydetails : response.data
            })
        .catch(err=>{
            console.log(err);
        })
        })
    }
    componentDidMount = async () => {
        await this._getUrlParams();
       this.apiGetCompany();
       var companydetails = this.jobId+ " " +this.companyId;
      // console.log("hellohello"+companydetails);
       axios.get(`${serverroute}/an/jobs/getjobs/${companydetails}`)
       .then(response => {
           this.setState({
            companydetails : response.data
           });
           console.log("helllooooo123456"+JSON.stringify(this.state.companydetails));
       })
       .catch(err => {
           console.log("Error" + err);
       });

       var data = this.jobId + " " + this.userId//userID'
       console.log("data" + data);
       axios.get(`${serverroute}/an/files/${data}`)
           .then(response => {
            if(response.data.length>0){
               this.setState({
                   filedata: "Choose file",
                   resumeData: response.data[0].resumefilename,
               });
            }
           })
           .catch(err => {
               console.log("Error" + err);
           });
       axios.get(`${serverroute}/an/files/cover/${data}`)
           .then(response => {
              if(response.data.length>0){
               this.setState({
                   filedata: "Choose file",
                   coverdata: response.data[0].coverfilename
               });
            }
           })
           .catch(err => {
               console.log("Error" + err);
           });
    }
    apiGetCompany = async () => {
        var params = { 'id': this.companyId };
        var response = await axios.post(`${C.Server_URL}/k/getCompany`, params);
        console.log(response.data);
        this.setState({ company: response.data });
    }
    _getUrlParams = async () => {
        this.userId = undefined;
        this.jobId = undefined;
        this.companyId = undefined;
        let urlParams = utils.getAllUrlParams();

        if ('userId' in urlParams) {
            this.userId = urlParams.userId;
            console.log("userID"+this.userId)
        }
        if ('jobId' in urlParams) {
            this.jobId = urlParams.jobId;
            console.log("jobid"+this.jobId)
        }
        if ('companyId' in urlParams) {
            this.companyId = urlParams.companyId;
        }
    }


    // componentWillMount() {
    //    // this._getUrlParams();
    // }
    onApply = () => {
        var data = {
            userId: this.userId,//get userid from local storage,
            jobId: this.jobId,
            status: "submitted",
            companyId: this.companyId,
            resumeData: `https://273-indeed.s3.us-east-2.amazonaws.com/${this.state.resumeData}`,
            coverdata: `https://273-indeed.s3.us-east-2.amazonaws.com/${this.state.coverdata}`
        }
        axios.post(`${serverroute}/an/jobs/apply/`, data)
            .then(response => {
                console.log("response" + JSON.stringify(response));
                alert(response.data);
            })
            .catch(err => {
                console.log("Error");
            });
    }
    onimageupload = (file) => {
        var myBucket = new AWS.S3({
            params: { Bucket: this.state.S3_BUCKET },
            region: this.state.REGION,
        })
        console.log("file.name" + file.name)
        let filedata = ({
            filename: 'resume' + "-" + Date.now() + "-" + 1 + file.name,//'resume'+ "-" + Date.now()+"-"+1+".pdf",
            jobId: this.jobId,
            //add uSerid from local storage
            userId: this.userId
        })
        axios.post(`${serverroute}/an/uploads/resume`, filedata)
            .then(response => {
                alert("File uploaded successfully!");
                this.setState({
                    filedata: "Choose file",
                    resumeData: response.data
                });
            })
            .catch(err => {
                console.log("Error");
            });
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: this.state.S3_BUCKET,
            Key: filedata.filename
        };

        myBucket.putObject(params)
            .send((err) => {
                if (err) console.log(err)
            })
    }

    oncoverupload = (file) => {
        var myBucket = new AWS.S3({
            params: { Bucket: this.state.S3_BUCKET },
            region: this.state.REGION,
        })
        let filedata = ({
            filename: 'cover' + "-" + Date.now() + "-" + 1 + file.name,
            jobId: this.jobId,
            //add userid from local storage
            userId: this.userId
        })
        axios.post(`${serverroute}/an/uploads/coverletter`, filedata)
            .then(response => {
                alert("File uploaded successfully!");
                this.setState({
                    filedata: "Choose file",
                    coverdata: response.data
                });
            })
            .catch(err => {
                console.log("Error");
            });
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: this.state.S3_BUCKET,
            Key: filedata.filename
        };

        myBucket.putObject(params)
            .send((err) => {
                if (err) console.log(err)
            })
    }
    onimageChange = (e) => {
        this.setState({
            selectedFile: e.target.files[0]
        });

    }

    oncoverchange = (e) => {
        console.log("valss" + JSON.stringify(e.target.files));
        this.setState({
            selectedletter: e.target.files[0]
        });

    }
    render() {
        // const data = this.props.location.state;
        var fileText = "Choose file";
        var resumeinfo;
        var coverinfo;
        var companyinfo;
        var jobtitle = null;
        var quali=null;
        var resp = null;
        var logo = null;
        var name = null;
        if(this.state && this.state.company){
            logo = this.state.company.logo;
            name = this.state.company.name;
            console.log("hello logo"+logo)
        }

        if (this.state.fileText) {
            fileText = this.state.fileText;
        }
        else {
            fileText = "Choose File";
        }

        if (this.state && this.state.resumeData) {
            resumeinfo = "https://273-indeed.s3.us-east-2.amazonaws.com/" + this.state.resumeData
            console.log("resumeinfo" + this.state.resumeData);
        }
        if (this.state && this.state.coverdata) {
            coverinfo = "https://273-indeed.s3.us-east-2.amazonaws.com/" + this.state.coverdata
            console.log("resumeinfo" + this.state.coverdata);

        }

        if (this.state && this.state.companydetails) {
            companyinfo = this.state.companydetails[0]
            jobtitle=companyinfo.JobTitle;
            quali=companyinfo.qualifications;
            resp=companyinfo.responsibilities;
        }
        return (
            <div>
                <UserNavbar />
                <div className="row align-items-start pt-4">
                        <div className="col-sm-1">
                            <img class="border" style={{ width: "80px",marginLeft:"1rem" }} src={logo} alt="banner" />
                        </div>
                        <div className="col-sm-6">
                            <p class="fs-1">{name}, {jobtitle}</p>
                        </div>
                    </div>
                 {/* <h4 style={{ paddingTop: "1rem", paddingLeft: "1rem" }}>{jobtitle}</h4>  */}
                 {/* <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: .5,
    borderColor : '#000000',
    width:"85%"
}}/> */}
                <h5 style={{paddingTop: "1rem", paddingLeft: "1rem" }}>Qualifications</h5>
                <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: .5,
    borderColor : '#000000',
    width:"85%"
}}/>
               <div style={{paddingTop: "1rem", paddingLeft: "1rem" }}>{quali}</div>
                <h5 style={{paddingTop: "1rem", paddingLeft: "1rem" }}>Requirements</h5>
                <hr  style={{
    color: '#000000',
    backgroundColor: '#000000',
    height: .5,
    borderColor : '#000000',
    width:"85%"
}}/>
                <div style={{paddingTop: "1rem", paddingLeft: "1rem" }}>{resp}</div>
                <Row style={{paddingTop:"1rem",paddingLeft:"3rem"}}>
                    <Card style={{ width: '18rem',margin:"3rem"}}>
                        <Card.Body>
                            <a href={resumeinfo}>Download your resume here</a>
                        </Card.Body>
                        <input type="file" onChange={this.onimageChange} style={{ paddingTop: "1rem", paddingBottom: "1rem", marginLeft: "2rem" }} />
                        <Button type="submit" variant = "primary" style={{ borderRadius: "30px", marginBottom: "1rem" }} onClick={() => this.onimageupload(this.state.selectedFile)}>Upload Resume</Button>
                    </Card>
                    <Card style={{ width: '18rem',margin:"3rem" }}>
                        <Card.Body>
                            <a href={coverinfo}>Download your cover letter here</a>
                        </Card.Body>

                        <input type="file" onChange={this.oncoverchange} style={{ paddingTop: "1rem", paddingBottom: "1rem", marginLeft: "2rem" }} />
                        <Button type="submit" variant = "primary" style={{ borderRadius: "30px", marginBottom: "1rem" }} onClick={() => this.oncoverupload(this.state.selectedletter)}>Upload Cover Letter</Button>
                    </Card>
                </Row>
                <Button variant = "primary" style={{ marginLeft:"5.5rem", borderRadius: "30px", marginBottom: "1rem" }} onClick={this.onApply}>Apply</Button>
            </div>
        )
    }
}


export default Jobs;

