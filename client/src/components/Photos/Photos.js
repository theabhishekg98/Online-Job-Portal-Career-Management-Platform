import React, { Component } from 'react';
import axios from 'axios';
import serverroute from '../../webconfig';
import AWS from 'aws-sdk';
import CompanyNavbar from "../companyNavbar";
import UserNavbar from '../userNavbar'
import { Container, Col, Row, Form, Button, ButtonGroup, Card } from 'react-bootstrap';
import Constants from '../../utils/constants';
import Utils from '../../utils/utils';
const C = new Constants();
const utils = new Utils();

class Photos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            S3_BUCKET :'273-indeed',
            REGION :'us-east-2',
            selectedFile : [],
            imagesdata :[]
        };
        AWS.config.update({
            accessKeyId: 'AKIA424XFIGBESA3IRUX',
            secretAccessKey: '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'
        }) 
      //  this._getUrlParams();
        this.onimageChange = this.onimageChange.bind(this);
        this.onimageupload = this.onimageupload.bind(this);


    }
    componentDidMount = async () => {
        await this._getUrlParams();
        this.apiGetCompany();
        let data =  this.companyId//give company id
        axios.get(`${serverroute}/an/uploads/photo/${data}`)
        .then(response=>{
            console.log("response"+JSON.stringify(response));
            this.setState({
                imagesdata : response.data
            })

        })
        .catch(error=>{
            console.log("error"+error);
        })
       
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
            console.log("comp"+this.companyId)
        }
    }
    
    apiGetCompany = async () => {
        var params = { 'id': this.companyId };
        var response = await axios.post(`${C.Server_URL}/k/getCompany`, params);
        console.log(response.data);
        this.setState({ company: response.data });
    }

    onimageupload = (file) => {
        
        var myBucket = new AWS.S3({
            params: { Bucket: this.state.S3_BUCKET},
            region: this.state.REGION,
        }) 

       for(var i =0;i<file.length;i++){
            // console.log("files are"+JSON.stringify(file.name[i]));
            let filedata = ({
                //add company id for classID and status also
                classId : this.companyId,
                url : "UserPhoto"+Date.now(),
                createdAt : Date.now()
            })
            console.log("hello the image is"+filedata.url)
            
        axios.post(`${serverroute}/an/uploads/photo`, filedata)
            .then(response => {
                console.log("response"+JSON.stringify(response));
                this.setState({
                    filedata: "Choose file",
                   // url: response.data.url //response.data.url
                });
            })
            .catch(err => {
                console.log("Error"+err);
            });

            const params = {
                ACL: 'public-read',
                Body: file[i],
                Bucket: this.state.S3_BUCKET,
                Key: filedata.url
            };
    
            myBucket.putObject(params)
                .send((err) => {
                    if (err) console.log("err1234"+err);
                })

           }
          
            alert("File Uploaded Successfully!");
            window.location.reload();
           
           // window.location.reload()
            
    }

    onimageChange = (e)=>{
        this.setState({ selectedFile: [...this.state.selectedFile, ...e.target.files] })
    }
    render() { 
        const data = this.props.location.state;
        var fileText="Choose file..";
        var photoinfo;
        var output = [];
        var banner = null;
        var logo = null;
            var name = null;
            if(this.state && this.state.company){
                banner = this.state.company.banner;
                logo = this.state.company.logo;
                name = this.state.company.name;
            }
        if(this.state.fileText){
            fileText = this.state.fileText;
        }
        else{
            fileText =  "Choose File";
        }
       
        // if(this.state && this.state.url){
        //     photoinfo = `https://273-indeed.s3.us-east-2.amazonaws.com/${this.state.url}`
        //     console.log("this.state.url"+ photoinfo);
            // imagearray.push({
            //     url : this.state.url})
        
        //     console.log("this.state.imagesdata"+JSON.stringify(imagearray));
        // }
        // if( this.state && this.state.imagesdata.length>0){
        //     for(var i=0;i<this.state.imagesdata.length;i++){
        //         if(this.state.imagesdata[i].url.includes("UserPhoto"))
        //         imagearray.push({
        //             url : this.state.imagesdata[i].url})
        //     }
        //     console.log("this.newneewn.imagesdata"+JSON.stringify(imagearray));
          
        // }
        // if( imagearray.length>0){
        //     output = imagearray.map(imgdata =>{
        //         console.log("imgdata"+JSON.stringify(imgdata));
        //             var imgurl = `https://273-indeed.s3.us-east-2.amazonaws.com/${imgdata.url}`;
        //             return(
        //                 <Col sm={3}>
        //                 <Card style={{ width: '18rem' }}>
        //                 <Card.Body>
        //                  <Card.Img variant="top" src={imgurl} />
        //                 </Card.Body>
        //             </Card> 
        //             </Col>
        //             );
        //     });
        // }
        // if(this.state && this.state.url){
        //     console.log("this.state.url"+ this.state.url);
        //     photoinfo = `https://273-indeed.s3.us-east-2.amazonaws.com/${this.state.url}`
        // }

        if( this.state && this.state.imagesdata.length>0){
            output = this.state.imagesdata.map(imgdata =>{
                if(imgdata.url.includes("UserPhoto")){
                 var imgurl = imgdata.url //`https://273-indeed.s3.us-east-2.amazonaws.com/${imgdata.url}`
                return(
                    <Col sm={3}>
                    <Card style={{ width: '18rem',height:'18rem',borderRadius :'1rem'}}>
                    <Card.Body>
                     <Card.Img variant="top" src={imgurl} />
                    </Card.Body>
                </Card> 
                </Col>
                );
            }
            });
        }
        return <div>
                <UserNavbar/>
                <CompanyNavbar/>
                <div className="container">
                <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Photos</h3>
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-12">
                            <img class="border" style={{ width: "100%" }} src={banner} alt="banner" />
                        </div>
                    </div>
                    <div className="row align-items-start pt-4">
                        <div className="col-sm-1">
                            <img class="border" style={{ width: "100px" }} src={logo} alt="banner" />
                        </div>
                        <div className="col-sm-11">
                            <p class="fs-1">{name}</p>
                        </div>
                    </div>
                <Card style={{ width: '18rem',marginTop:"2rem" , marginBottom:"2rem"}}>
                                    <Card.Body>
                                    </Card.Body>
                                    <form>
                                    <input type="file" onChange={this.onimageChange} style={{paddingTop: "1rem",paddingBottom: "1rem",marginLeft: "2rem"}} multiple="multiple" required/>
                                    <center>
                                    <Button variant = "primary" style={{marginBottom:"1rem"}} onClick={() => this.onimageupload(this.state.selectedFile)}>Upload</Button>
                                    </center>
                                    </form>
                                </Card> 
                                <Row>
                                {output}
                                </Row>
                                </div>
                </div>;
    }
}
 
export default Photos;


