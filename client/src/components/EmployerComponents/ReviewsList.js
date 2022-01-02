import React, { Component } from 'react'
import ReviewItem from './ReviewItem'
import TablePagination from '@mui/material/TablePagination';
import EmployerNavBar from './EmployerNavBar'
import serverroute from '../../webconfig';
var axios=require('axios').default
export class ReviewsList extends Component {
    constructor(props) {
        super(props)
        this.employerDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
        this.state = {
             reviewList:[],
             featureList:[],
             featuredCount:0,
             page: 0,
             rowsPerPage: 5
        }
    }
    componentDidMount(){
        //to-do make api call to get reviews
        let compId=this.employerDetailsFromStorage.companyId
        let url=`${serverroute}/ha/employer/${compId}/reviews`
        axios.get(url).then(res=>{
            console.log(res.data)
            let newList=res.data.filter(i=>i.isFeatured==true).map(i=>i._id)
            this.setState({
                reviewList:res.data,
                featureList:newList,
                featuredCount:newList.length
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
    handleFeaturedCount=(type,id)=>{
        if(type=='add'){
            console.log("add")
            if(this.state.featuredCount===5)
                return;
        this.setState((prevState) => ({
            featuredCount: prevState.featuredCount + 1,
            featureList: [...prevState.featureList,id]
          }));
        }else if(type=='remove'){
            console.log("remove")
            if(this.state.featuredCount===0)
                return;
            let newList=this.state.featureList.filter(i=>i!=id)
            this.setState((prevState) => ({
                featuredCount: prevState.featuredCount - 1,
                featureList:newList
              }));
        }
    }
    render() {
        console.log("featured Count", this.state.featureList)
        return (
            <React.Fragment>
                <EmployerNavBar></EmployerNavBar>
            <div className="container">
                   <TablePagination
                                    component="div"
                                    count={this.state.reviewList.length}
                                    page={this.state.page}
                                    onPageChange={this.handleChangePage}
                                    rowsPerPage={this.state.rowsPerPage}
                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                    rowsPerPageOptions={[2, 5, 10]}
                                />
                {(this.state.rowsPerPage > 0
                                ? this.state.reviewList.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.reviewList
                            ).map((review, index) => {
                                return <ReviewItem review={review} key={review._id} addOrRemoveFeatureCount={this.handleFeaturedCount} count={this.state.featuredCount} featureList={this.state.featureList}></ReviewItem>
                 })}
{/* 
                {this.state.reviewList.map(review=>{
                   return <ReviewItem review={review} key={review} addOrRemoveFeatureCount={this.handleFeaturedCount} count={this.state.featuredCount}></ReviewItem>
                })} */}
            </div>
            </React.Fragment>
        )
    }
}

export default ReviewsList
