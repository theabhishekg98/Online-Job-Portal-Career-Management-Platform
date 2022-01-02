import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Icon, IconButton, Rating, Typography } from '@mui/material'
import React, { Component } from 'react'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import serverroute from '../../webconfig';
var axios = require('axios').default
export class ReviewItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: 0,
            isFeatured: this.props.featureList.includes(this.props.review._id),
            alert: false
        }
    }
    handleBookMark = () => {
        // To check if review is featured then remove it as featured and update the count in parent component
        // if (this.props.count === 5) {
        //     console.log("Max limit")
        //     this.setState({alert:true})
        // } else {
        let url = `${serverroute}/ha/employer/review`
        if (this.state.isFeatured) {
            axios.put(url, {
                reviewId: this.props.review._id,
                isFeatured: false
            }).then(res => {
                this.setState((prevState) => ({
                    isFeatured: !prevState.isFeatured
                }), this.props.addOrRemoveFeatureCount('remove',this.props.review._id))
            })
        } else {
            if (this.props.count === 5) {
                console.log("Max limit")
                this.setState({ alert: true })
            } else {
                axios.put(url, {
                    reviewId: this.props.review._id,
                    isFeatured: true
                }).then(res => {
                    this.setState((prevState) => ({
                        isFeatured: !prevState.isFeatured
                    }), this.props.addOrRemoveFeatureCount('add',this.props.review._id))
                })
            }
        }
        // }
    }
    handleClose = () => {
        this.setState({ alert: false })
    }
    render() {
        console.log(this.props)
        return (
            <div className="mt-2">
                <Card>
                    <IconButton fontSize="large" onClick={this.handleBookMark}><BookmarksIcon color={this.state.isFeatured ? 'error' : 'disabled'}></BookmarksIcon></IconButton>
                    <CardContent>
                        <div className="row">
                            <Typography className="col-sm-8" gutterBottom variant="h6" component="div">{this.props.review.reviewSummary} </Typography>
                            <Rating className="col-sm-2" name="Overall" value={(this.props.review.overallRating)} readOnly style={{ justifyContent: "end", alignItems: 'flex-start' }} />
                        </div>
                        <Typography paragraph={true}>
                            {this.props.review.fullReview}
                        </Typography>
                        <Typography paragraph={true}>
                            {this.props.review?.pros?.length > 0 ? `Pros :${this.props.review.pros}` : ""}
                        </Typography>
                        <Typography paragraph={true}>
                            {this.props.review?.cons?.length > 0 ? `Cons :${this.props.review.cons}` : ""}
                        </Typography>
                        <Typography paragraph={true}>
                            {this.props.review?.ceoApproval?.length > 0 ? `Ceo Approval: ${this.props.review.ceoApproval}` : ""}
                        </Typography>
                    </CardContent>
                </Card>
                <Dialog
                    open={this.state.alert}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth="true">
                    <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
                    <DialogContent>"To Add "{this.props.review.reviewSummary}" as featured please remove another review from featured list. You can only add upto 5 featured reviews"</DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ReviewItem
