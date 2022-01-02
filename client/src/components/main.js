import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CompanyProfile from './EmployerComponents/CompanyProfile';
import UserProfile from './userProfile/profilePage';
import EmployerUserProfile from './userProfile/employerUserProfilePage';
import Snapshot from './company/snapshot';
import WhyJoinUs from './company/whyJoinUs';
import FindJobs from './company/findJobs';
import FindSalaries from './company/findSalaries';
import CompanyReviewsTab from './company/companyReviewsTab';
import SignUp from './auth/signup';
import SignIn from './auth/signin';
import Logout from './auth/logout';
import CompanyWriteReview from './company/writeReviews';
import JobPostingPage from './EmployerComponents/JobPostingPage';
import ListofPostedJobs from './EmployerComponents/ListofPostedJobs';
import ApplicantsPage from './EmployerComponents/ApplicantsPage';
import ReviewsList from './EmployerComponents/ReviewsList';
import ManageReviews from './admin/manageReviews';
import ManagePhotos from './admin/managePhotos';
import AdminCompanyProfile from './admin/companyProfile';
import AdminCompanyReviews from './admin/companyReviews';
import AdminAnalyticsDashboard from './admin/analyticsDashboard';
import Reports from './EmployerComponents/Reports';
import Jobhome from './Jobs/Jobhome';
import Jobs from './Jobs';
import companyReviews from './companyReviews';
import Salaries from './Salary/Salaries';
import Photos from './Photos/Photos';
import Messages from './EmployerComponents/Messages'
import {Messages as UserMessages }from './UserMessage/Messages'
import ViewAppliedJobs from './userProfile/appliedJobs';
import ViewReviews from './userProfile/viewReviews';
import CompanyProtectedRoute from './auth/CompanyProtectedRoute';
import UserProtectedRoute from './auth/UserProtectedRoute';
import AdminProtectedRoute from './auth/AdminProtectedRoute';
import ViewSavedJobs from './userProfile/savedJobs';

class Main extends Component {  
    render() {
        return (
            <div>
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <Route path="/logout" component={Logout} />
                <UserProtectedRoute path="/findJobs" component={FindJobs} />
                <UserProtectedRoute path="/findSalaries" component={FindSalaries} />
                <UserProtectedRoute path="/company/reviewsTab" component={CompanyReviewsTab} />
                <UserProtectedRoute path="/company/snapshot" component={Snapshot} />
                <UserProtectedRoute path="/company/whyJoinUs" component={WhyJoinUs} />
                <CompanyProtectedRoute path = "/JobPostingPage" component={JobPostingPage} />
                <CompanyProtectedRoute path="/company/profile" component={CompanyProfile}/>
                <UserProtectedRoute path="/user/profile/:userId" component={UserProfile}/>
                <CompanyProtectedRoute path="/employer/user/profile" component={EmployerUserProfile}/>
                <UserProtectedRoute path="/user/applied/jobs/:userId" component={ViewAppliedJobs}/>
                <UserProtectedRoute path="/user/saved/jobs/:userId" component={ViewSavedJobs}/>
                <UserProtectedRoute path="/user/view/reviews/:userId" component={ViewReviews}/>
                <CompanyProtectedRoute path = "/JobApplicants" component = {ApplicantsPage} />
                <CompanyProtectedRoute path="/company/reviews" component={ReviewsList}/>
                <CompanyProtectedRoute path="/company/reports" component={Reports}/>
                <UserProtectedRoute path="/company/writeReviews" component ={CompanyWriteReview}/>
                <UserProtectedRoute path="/jobhome" component={Jobhome} />
                <UserProtectedRoute path="/jobs" component={Jobs} />
                <UserProtectedRoute path="/company/salaries" component={Salaries} />
                <UserProtectedRoute path="/photos" component={Photos} />
                <AdminProtectedRoute path="/admin/manage/reviews" component={ManageReviews} />
                <AdminProtectedRoute path="/admin/manage/photos" component={ManagePhotos} />
                <AdminProtectedRoute path="/admin/company/profile" component={AdminCompanyProfile} />
                <AdminProtectedRoute path="/admin/company/:companyId/reviews" component={AdminCompanyReviews} />
                <AdminProtectedRoute path="/admin/analytics" component={AdminAnalyticsDashboard} />
                <CompanyProtectedRoute path="/company/messages" component={Messages}></CompanyProtectedRoute>
                <UserProtectedRoute path="/user/messages" component={UserMessages}></UserProtectedRoute>
                <UserProtectedRoute path="/user/reviews" component={companyReviews}></UserProtectedRoute>
                <Route exact path="/" component={SignIn}></Route>
            </div>
        )
    }
}


export default Main;