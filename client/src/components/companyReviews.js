import React, { Component } from 'react';
import axios from 'axios';
import serverroute from '../webconfig';
import { Card, Button,Row,Col,Modal } from 'react-bootstrap';
import {Rating } from '@mui/material'
import CompanyNavbar from "./companyNavbar";
import UserNavbar from './userNavbar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Constants from '../utils/constants';
import Utils from '../utils/utils';
import Pagination from "@material-ui/lab/Pagination";
import { Box } from "@material-ui/core";
import { ErrorMessage, Field, Form, Formik } from "formik";


const C = new Constants();
const utils = new Utils();

class companyRevies extends React.Component {
    constructor(props){
        super(props)
        this.setState({
            showModal: false,
            variant :"primary",
            ratvariant:"primary",
            datvariant:"primary"
          });
          this.state=({
            itemsPerPage: 5,
            page: 1,
            noOfPages: 0,
        })
      
          this.openModal = this.openModal.bind(this);
          this.onClickSort = this.onClickSort.bind(this);
          this.onClickRating = this.onClickRating.bind(this);
          this.onClose = this.onClose.bind(this);
    }
    cprofIntialValues={
        compId:'',
        userId:'',
        overallRating:'',
        reviewSummary:'',
        review:'',
        pros:'',
        cons:'',
        ceoApproval:'',
        howToInterviewPrep:'',
    }

    componentDidMount = async () => {
        await this._getUrlParams();
         this.apiGetCompany();
         this.getReviews();
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


    apiGetCompany = async () => {
        var params = { 'id': this.companyId };
        console.log("idd",this.companyId)
        var response = await axios.post(`${C.Server_URL}/k/getCompany`, params);
        console.log(response.data);
        this.setState({ company: response.data });
    }

       getReviews=()=>{
           this.setState({
               variant : "primary"
           })
           console.log()
           
        var data = this.companyId; //send companyId
        axios.get(`${serverroute}/an/companyReviews/${data}`).then(response=>{
            console.log("responsedata"+JSON.stringify(response));
            this.setState({
                reviewdata :response.data,
                sorteddata : response.data,
                noOfPages: Math.ceil(response.data.length / this.state.itemsPerPage)

            })
        }).catch(err=>{
            console.log("err"+err);
        })
    }
  
    OnChangeNoOfPages = (e) => {
        this.setState({
            itemsPerPage: e.target.value
        })
        this.setState({
            noOfPages: Math.ceil(this.state.filteredjobs.length / e.target.value)
        })
    }
    handlePageChange = (e,value)=>
    {
        this.setState({
                page:value
        })
    }

    onChangeform = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
        console.log("god please help me"+e.target.value);
    }

     handleClick=(id,e)=>{
        console.log("helo"+this.state.ans+"id"+id);
        var data = {
            ishelp : this.state.ans,
            id : id,
            nohelpcount:this.state.nohelpcount,
            helpcount:this.state.helpcount
        }
        console.log("hellp"+JSON.stringify(data));
        axios.post(`${serverroute}/an/companyReviews/`,data).then(response=>{
            console.log("submitted"+JSON.stringify(response));
            this.getReviews();

        }).catch(err=>{
            console.log(err);
        })
     }
     openModal = () => {
        this.setState({
          showModal: true
        });
      };
      onClose = (e) => {
        this.setState({
          showModal: false,
        });
      }

      sort_by_key=(array, key)=>{
 return array.sort(function(a, b)
 {
  var x = a[key]; var y = b[key];
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
 });
}
sort_by_key_desc=(array, key)=>{
    return array.sort(function(a, b)
    {
     var x = a[key]; var y = b[key];
     return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
   }
      onClickSort=(e,buttonVariant)=>{
          var sortreviews =[];
          sortreviews = this.state.reviewdata;
          if(buttonVariant=="primary" ||buttonVariant==undefined ){
              console.log("1");
              this.setState({
                  variant:"secondary",
                  sorteddata :this.sort_by_key(sortreviews,'nohelpcount')
              })
          }
          else if(buttonVariant=="secondary"){
            this.setState({
                variant:"primary",
                sorteddata : this.sort_by_key_desc(sortreviews,'helpcount')
            })
        }
      }
      onClickRating =(e,buttonVariantrat)=>{
        var sortreviews =[];
        sortreviews = this.state.reviewdata;
        if(buttonVariantrat=="primary" || buttonVariantrat==undefined ){
            this.setState({
                ratvariant:"secondary",
                iconbool: true,
                sorteddata :this.sort_by_key(sortreviews,'overallRating')
            })
        }
        else if(buttonVariantrat=="secondary"){
          this.setState({
            ratvariant:"primary",
              iconbool:false,
              sorteddata : this.sort_by_key_desc(sortreviews,'overallRating')
          })
      }
      }
      onClickDate =(e,buttonVariantdat)=>{
        var sortreviews =[];
        sortreviews = this.state.reviewdata;
        if(buttonVariantdat=="primary" || buttonVariantdat==undefined ){
            this.setState({
                datvariant:"secondary",
                iconbooldat: true,
                sorteddata :this.sort_by_key(sortreviews,'createdAt')
            })
        }
        else if(buttonVariantdat=="secondary"){
          this.setState({
            datvariant:"primary",
            iconbooldat:false,
            sorteddata : this.sort_by_key_desc(sortreviews,'createdAt')
          })
      }
      }

      handleCompanyWriteReview=()=>{
        var data = {
            overallRating: this.state.overallRating,
            reviewSummary: this.state.reviewSummary,
            fullreview: this.state.fullreview,
            pros: this.state.pros,
            cons: this.state.cons,
            ceoApproval: this.state.ceoApproval,
            interviewprep: this.state.interviewprep,
            compId : this.companyId,
            userId : this.userId
          }
          console.log("helloword"+JSON.stringify(data));
          if(this.state && (this.state.overallRating==" "||this.state.overallRating==null)){
            this.setState({
                errmsg:"Please fill this field"
            })
          }
          if(this.state && (this.state.reviewSummary ==" "||this.state.reviewSummary==null)){
            this.setState({
                errmsgover:"Please fill this field"
            })
          }
          else{
        let saveCompanyReview = `${serverroute}/abhishek/company/write/review`
       console.log("datasss"+JSON.stringify(data));
        axios.post(saveCompanyReview,data).then(res=>{
            console.log(JSON.stringify(res));
        }).catch(err=>{
            this.setState({ 
                alert: true,
                alertMessage:'Something went wrong, Please try again later'
             })
        })
        alert("Review Submitted Successfully")
        window.location.reload();
    }
    }

    onValuechange=(e,hcount,nhcount)=>{
        console.log("here we are"+e.target.value);
        this.setState({
            ans: e.target.value,
            helpcount :hcount,
            nohelpcount :nhcount,

        })
        if(e.target.value=="Yes"){
           this.setState({
            helpcount: hcount+1
        })
        }
        else{
            this.setState({
                nohelpcount: nhcount+1
            })
        }
    }
    render() { 
        var dispdata=[];
        let showModal = false;
        var icon=<ArrowDownwardIcon/>;
        var icondat=<ArrowDownwardIcon/>;
       //var downarrow = <ArrowDownwardIcon/>
        if(this.state && this.state.iconbool){
            icon = <ArrowUpwardIcon/>
        }
        if(this.state && this.state.iconbooldat){
            icondat = <ArrowUpwardIcon/>
        }
       let errmessage = null;
       let errrev = null;
        let buttonVariant;
        let buttonVariantrat;
        let buttonVariantdat;
        var banner = null;
        var logo = null;
        var name = null;
        if(this.state && this.state.company){
            banner = this.state.company.banner;
            logo = this.state.company.logo;
            name = this.state.company.name;
        }
        if(this.state && this.state.variant){
            console.log("entered here"+this.state.variant);
            buttonVariant = this.state.variant;
        }
        if(this.state && this.state.ratvariant){
            buttonVariantrat = this.state.ratvariant;
        }
        if(this.state && this.state.datvariant){
            buttonVariantdat = this.state.datvariant;
        }
       // let buttonstyle = {color:"black"}
       // let buttonClick = this.onClickSort;//this.openModal;

        if (this.state &&this.state.showModal) {
            showModal = this.state.showModal;
          }
        if(this.state&&this.state.errmsg){
            errmessage =this.state.errmsg
        }
        if(this.state&&this.state.errmsgover){
            errrev =this.state.errmsgover
        }
        if(this.state && this.state.sorteddata){
            dispdata = this.state.sorteddata.slice((this.state.page - 1) * this.state.itemsPerPage, this.state.page * this.state.itemsPerPage).map((review, key) => {
                var date = review.createdAt.split("T")[0];
                return(
                    <div style={{paddingLeft:"4rem"}}>
                <Card style={{width:"40rem",marginBottom: "2rem"}}>
              
                    <Row>
                    <Col>
                    <Card.Title style={{paddingLeft:"1rem",marginTop:"1rem"}}>{review.reviewSummary}</Card.Title>
                    </Col>
                    <Col>
                   <div style={{paddingLeft:"3rem",fontSize: "2rem",color: "red",fontWeight: "700"}}>{review.overallRating}</div>
                    <Rating className="col-sm-2" name="Overall" value={(review.overallRating)} readOnly />
                    </Col> 
                    </Row>
                    <div style={{paddingLeft:"1rem"}}>
                    {review.usercity}&nbsp; &nbsp;
                    {review.userstate}&nbsp; &nbsp;
                    {date}&nbsp; &nbsp;
                    </div>
                    <Card.Body>{review.fullReview}</Card.Body>
             
                    <div>
                    <p style={{marginLeft:"1rem",fontWeight:"800"}}>Is this review helpful? </p>
                    <input type="radio" id="yes" name="yesno" value="Yes" onChange={(e) => this.onValuechange(e,review.helpcount,review.nohelpcount)} style={{marginLeft:"1rem"}}></input>
                      <label for="yes">Yes  {review.helpcount} </label>
                      <input type="radio" id="no" name="yesno" value="No" onChange={(e) => this.onValuechange(e,review.helpcount,review.nohelpcount)}></input>
                      <label for="no">No  {review.nohelpcount}</label>

                    <Button onClick={(e)=> this.handleClick(review._id,e)} style={{marginLeft:"1.5rem",marginBottom:"1rem"}}>Submit</Button>
                    </div>
                </Card>
                </div>
                )
            })
        }
        return (<div>
             <UserNavbar/>
                <CompanyNavbar/>
                <div className="container">
                <div className="row align-items-start">
                        <div className="col-sm-12">
                            <h3>Reviews</h3>
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
                <Row style={{marginTop:"2rem"}}>
                    <Col>
                <Button onClick={this.openModal}>Add Review</Button>
                </Col>
                <Col>
              <Button variant={buttonVariant} onClick={(e)=>this.onClickSort(e,buttonVariant)} name="help">Helpfulness</Button>&nbsp; &nbsp;
              <Button variant={buttonVariantrat} onClick={(e)=>this.onClickRating(e,buttonVariantrat)} name="rate">Rating {icon}</Button>&nbsp; &nbsp;
              <Button variant={buttonVariantdat} onClick={(e)=>this.onClickDate(e,buttonVariantdat)} name="rate">Date {icondat}</Button>&nbsp; &nbsp;
              </Col>
              <Box component="span" >
                            <Pagination
                            style={{marginTop:"3rem",marginBottom:"2rem"}}
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
                </Row>
                
            



                       <Modal show={showModal} onHide={this.onClose} centered>
          <Modal.Header>
            <center>
              <Modal.Title>Company Reviews</Modal.Title>
            </center>
          </Modal.Header>
          <Modal.Body>
              <Formik>
            <form onSubmit={this.handleCompanyWriteReview}>
                <label className="form-label" >Overall Rating</label>
                <input type="text" name="overallRating"  className="form-control" placeholder="Enter a rating out of 5..." onChange={this.onChangeform} required></input>
                <div style={{color:"red"}}>{errmessage}<br/></div>
                <label className="form-label">Review Summary</label>
                <input type="text" name="reviewSummary"  className="form-control" onChange={this.onChangeform} required></input>
                <div style={{color:"red"}}>{errrev}<br/></div>
                <label className="form-label">Your Review</label>
                <input type="text" name="fullreview"  className="form-control" onChange={this.onChangeform} required></input>
                <label className="form-label">Pros</label>
                <input type="text" name="pros"  className="form-control" onChange={this.onChangeform} required></input>
                <label className="form-label">Cons</label>
                <input type="text" name="cons"  className="form-control" onChange={this.onChangeform} required></input>
                <label className="form-label" >CEO Approval</label>
                <input type="text" name="ceoApproval"  className="form-control" placeholder="Enter a rating out of 5..." onChange={this.onChangeform} required></input>
                <label className="form-label">How to interview prep for this company?</label>
                <input type="text" name="interviewprep"  className="form-control" onChange={this.onChangeform} required></input>
                <div style={{marginTop:"3rem"}}>
                  <center>
                <Button variant="secondary" onClick={this.onClose} style={{marginRight:"2rem"}}>Close</Button>
            <Button variant="primary" onClick={this.handleCompanyWriteReview}>Save changes</Button>
            </center>
            </div>
            </form>
            </Formik>
          </Modal.Body>
        </Modal>

          {dispdata}
          </div>
        </div>)
    }
}
 
export default companyRevies;

