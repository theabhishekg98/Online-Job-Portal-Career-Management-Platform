import React, { Component } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Redirect } from "react-router";
// import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import { TabPanel } from "../EmployerComponents/TabPanel";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import serverroute from "../../webconfig";
import * as yup from "yup";
import Utils from "../../utils/utils";
const utils = new Utils();

var axios = require("axios").default;
export class WriteReviews extends Component {
  constructor(props) {
    super(props);
    this.userDetailsFromStorage=JSON.parse(sessionStorage.getItem('authenticateDetails'))
    this.state = {
      value: 0,
      alert: false,
      redirect: false,
    };
  }

  cprofIntialValues = {
    compId: "",
    userId: "",
    overallRating: "",
    reviewSummary: "",
    review: "",
    pros: "",
    cons: "",
    ceoApproval: "",
    howToInterviewPrep: "",
  };

  componentDidMount = async () => {
    // await this._getUrlParams();
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  // _getUrlParams = async () => {
  //   this.companyId = undefined;
  //   this.userId = undefined;
  //   // let urlParams = utils.getAllUrlParams();
  //   console.log(urlParams);
  //   if ("companyId" in urlParams) {
  //     this.companyId = urlParams.companyId;
  //   }
  //   if ("userId" in urlParams) {
  //     this.userId = urlParams.userId;
  //   }
  // };
  /**
   * Handle on Submit event, triggered when company review form is submitted
   * @param {*} values
   */

  handleCompanyWriteReview = (values) => {
    console.log("Company Review values", values);
    // values.compId = this.state.companyId;
    // values.userId = this.state.userId;
    values.compId = 4;
    values.userId = 1;
    // console.log(values);
    let saveCompanyReview = `${serverroute}/abhishek/company/write/review`;

    axios
      .post(saveCompanyReview, values)
      .then((res) => {
        this.setState({
          alert: true,
          alertMessage: "Company Review Added",
          cprofIntialValues: values,
          redirect: true,
        });
      })
      .catch((err) => {
        this.setState({
          alert: true,
          redirect: true,
          alertMessage: "Something went wrong, Please try again later",
        });
      });
  };

  companyReviewSchema = yup.object({
    compId: yup.string(),
    userId: yup.string(),
    overallRating: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(1, "Must be excatly 1")
      .max(1, "Must be excatly 1"),
    reviewSummary: yup.string(),
    review: yup.string(),
    pros: yup.string(),
    cons: yup.string(),
    ceoApproval: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(1, "Must be greater than 0")
      .max(2, "Must be less than 100"),
    howToInterviewPrep: yup.string(),
  });

  /**
   * Company Review JSX
   */
  CompanyWriteReview = (
    <div className="container">
      <Formik
        initialValues={this.cprofIntialValues}
        onSubmit={this.handleCompanyWriteReview}
        validationSchema={this.companyReviewSchema}
      >
        <Form>
          <label className="form-label">Overall Rating</label>
          <Field
            type="text"
            name="overallRating"
            className="form-control"
            placeholder="Enter a rating out of 5..."
          ></Field>
          <ErrorMessage
            name="overallRating"
            className="text-danger"
            component="div"
          ></ErrorMessage>
          <label className="form-label">Review Summary</label>
          <Field
            type="text"
            name="reviewSummary"
            className="form-control"
          ></Field>
          <label className="form-label">Your Review</label>
          <Field type="text" name="yourReview" className="form-control"></Field>
          <label className="form-label">Pros</label>
          <Field type="text" name="pros" className="form-control"></Field>
          <label className="form-label">Cons</label>
          <Field type="text" name="cons" className="form-control"></Field>
          <label className="form-label">CEO Approval</label>
          <Field
            type="text"
            name="ceoApproval"
            className="form-control"
            placeholder="Enter a rating out of 5..."
          ></Field>
          <ErrorMessage
            name="ceoApproval"
            className="text-danger"
            component="div"
          ></ErrorMessage>
          <label className="form-label">
            How to interview prep for this company?
          </label>
          <Field
            type="text"
            name="interviewprep"
            className="form-control"
          ></Field>
          <button className="mt-2 btn btn-primary" type="submit">
            Save
          </button>
        </Form>
      </Formik>
    </div>
  );
  /**
   * To close the dialog box
   */
  handleClose = () => {
    this.setState({ alert: false });
  };
  render() {
    if (this.state.redirect == true) {
      console.log("redirecting back to company reviews tab.....");
      return (
        <div>
          <Redirect to={`/company/reviewsTab`} />
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Company Review" />
            </Tabs>
          </Box>
          <TabPanel value={this.state.value} index={0}>
            {this.CompanyWriteReview}
          </TabPanel>

          <Dialog
            open={this.state.alert}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth="true"
          >
            <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
            <DialogContent>{"Company Review Added!"}</DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
}

export default WriteReviews;
