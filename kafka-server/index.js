var connection =  new require('./Kafka-connection/Connection.js');
const mongoconnection = require('./utils/mongo');
//Importing the services
var test = require('./Services/TestService.js')
var reviews=require('./Services/harsha/reviews')
var report=require('./Services/harsha/reports')
var empProfile=require('./Services/harsha/CompanyProfile')
const userProfile = require('./Services/abhishek/userProfile');
const deleteResume = require('./Services/abhishek/deleteResume')
const appliedJobs = require('./Services/abhishek/appliedJobs');
const UserServices = require('./Services/kamal/userServices');
const userServices = new UserServices();
const CompanyServices = require('./Services/kamal/companyServices');
const companyServices = new CompanyServices();
const PhotoServices = require('./Services/kamal/photoServices');
const photoServices = new PhotoServices();
const JobServices = require('./Services/kamal/jobServices');
const jobServices = new JobServices();
// const ApplicationServices = require('./Services/kamal/applicationServices');
// const applicationServices = new ApplicationServices();
const SaveServices = require('./Services/kamal/saveServices');
const saveServices = new SaveServices();
const companyReview = require('./Services/abhishek/companyReviews');
const companyReviewsTab = require('./Services/abhishek/companyReviewsTabs');
const findSalary = require('./Services/abhishek/findSalary');
const salary = require('./Services/ananya/salary');
const jobs = require('./Services/ananya/jobs');
var file = require('./Services/ananya/files');
var uploads = require('./Services/ananya/uploads');
const application= require('./Services/abhiram/Application')
const employeeJobs = require('./Services/abhiram/EmpJobs')
const messages =require('./Services/harsha/messages')
const adminManageReview = require('./Services/evelyn/manangeReivew');
const adminManagePhoto = require('./Services/evelyn/managePhoto');
const adminCompanyProfile = require('./Services/evelyn/companyProfile');
const adminAnalytics = require('./Services/evelyn/analytics');
const EmployerMessages = require('./Services/abhiram/EmployerMessage')
const Login=require('./Services/harsha/Login')
const viewReviews = require('./Services/abhishek/viewYourReviews');
const getResume = require('./Services/abhishek/getResume');
const savedJobs = require('./Services/abhishek/viewSavedJobs');
//Starting the MongoDB connection
mongoconnection

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname); 
        var data = JSON.parse(message.value);
        fname(data.data, function(err,res){
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0,
                    attributes :1
                }
            ];
            producer.send(payloads, function(err, data){
                console.log('data=>',data);
            });
            return;
        });
        
    });
}

function createTopicConsumer(topic_name, fname) {
  const consumer = connection.getConsumer(topic_name);
  consumer.on('message', (message) => {
    console.log('message received for ' + topic_name +" ", fname); 
    const { data } = JSON.parse(message.value);
    fname(data);
  });
}

//Add Your Topics here
// Kamal
handleTopicRequest("getCompany", companyServices.getCompany)
handleTopicRequest("getPhoto", photoServices.getPhoto)
handleTopicRequest("getJobs", jobServices.getJobs)
handleTopicRequest("getApplication", saveServices.getApplication)
handleTopicRequest("addApplication", saveServices.addApplication)
handleTopicRequest("deleteApplication", saveServices.deleteApplication)
handleTopicRequest("addUser", userServices.addUser)
handleTopicRequest("getCompanyList", companyServices.getCompanyList)

// handleTopicRequest("test",test)
handleTopicRequest("getReviewsTopic",reviews.handle_get_all_reviews)
handleTopicRequest("getEmployeeReport",report.handle_get_employee_reports_2)
handleTopicRequest('getEmployeeProfile',empProfile.handle_get_Employee_Profile)
handleTopicRequest('saveEmployeeProfile',empProfile.handle_save_Employee_Profile)
handleTopicRequest('getCompanyProfile',empProfile.handle_get_Company_Profile)
handleTopicRequest('saveCompanyProfile',empProfile.handle_save_Company_Profile)
//  handleTopicRequest("getphoto",uploads.handle_get_photo);



handleTopicRequest('saveCompanyReview',companyReview.handle_save_Company_Review)
handleTopicRequest('getAverageSalaryForRole', findSalary.handle_getAverageSalaryForRole)
handleTopicRequest('getTopFiveSalariesForRole', findSalary.handle_getTopFiveSalariesForRole)
handleTopicRequest('getUserProfile', userProfile.handle_getUserProfile)
handleTopicRequest('saveUserProfile', userProfile.handle_saveUserProfile)
handleTopicRequest('getAllCompanyReviews', companyReviewsTab.handle_getAllCompanyReviews)
handleTopicRequest('getSearchedCompanyReviews', companyReviewsTab.handle_getSearchedCompanyReviews)
handleTopicRequest("deleteResume", deleteResume.handle_deleteResume);
handleTopicRequest("getResume", getResume.handle_getResume);
handleTopicRequest("viewAppliedJobs", appliedJobs.handle_viewAppliedJobs);
handleTopicRequest("viewYourReviews", viewReviews.handle_viewYourReviews);
handleTopicRequest("viewSavedJobs", savedJobs.handle_viewSavedJobs);

// handleTopicRequest('getAverageSalaryForCompany', findSalary.handle_getAverageSalaryForCompany)

// Ananya topics
handleTopicRequest("getfiles",file.handle_get_files);
handleTopicRequest("get_cover",file.handle_get_cover);
handleTopicRequest("post_salary",salary.handle_post_salary);
handleTopicRequest("get_jobs",jobs.handle_get_jobs);
handleTopicRequest("get_jobcompany",jobs.handle_get_job);
handleTopicRequest("postapplication",jobs.handle_application);
handleTopicRequest("postuploads",uploads.handle_post_uploads);
handleTopicRequest("postphoto",uploads.handle_post_photo);
handleTopicRequest("get_photo",uploads.handle_get_photo);
handleTopicRequest("postcoverletter",uploads.handle_post_cover);


handleTopicRequest("getReviewsTopic",reviews.handle_get_all_reviews)
handleTopicRequest("updateFeaturedReview",reviews.handle_updateFeaturedReview)
// handleTopicRequest("getEmployeeReport",report.handle_get_Employee_reports)
handleTopicRequest('getEmployeeProfile',empProfile.handle_get_Employee_Profile)
handleTopicRequest('saveEmployeeProfile',empProfile.handle_save_Employee_Profile)
handleTopicRequest('getCompanyProfile',empProfile.handle_get_Company_Profile)
handleTopicRequest('saveCompanyProfile',empProfile.handle_save_Company_Profile)

handleTopicRequest('getChats',messages.handle_get_All_Chats)
handleTopicRequest('addMessage',messages.handle_add_message)

handleTopicRequest('adminGetReviews', adminManageReview.getReviews);
handleTopicRequest('adminUpdateReviewStatus', adminManageReview.updateReviewStatus);
handleTopicRequest('adminGetPhotos', adminManagePhoto.getPhotos);
handleTopicRequest('adminUpdatePhotoStatus', adminManagePhoto.updatePhotoStatus);
handleTopicRequest('adminGetCompaniesByName', adminCompanyProfile.getCompaniesByName);
handleTopicRequest('adminGetComapnyClosedReviews', adminCompanyProfile.getCompanyClosedReviews);
handleTopicRequest('adminGetCompanyApplicationStatistics', adminCompanyProfile.getCompanyApplicationStatistics);
handleTopicRequest('adminGetDailyReviewCount', adminAnalytics.getDailyReviewCount);
handleTopicRequest('adminGetTopReviewedCompanies', adminAnalytics.getTopReviewedCompanies);
handleTopicRequest('adminGetTopRatingCompanies', adminAnalytics.getTopRatingCompanies);
handleTopicRequest('adminGetTopJobseekersOnApprovedReviews', adminAnalytics.getTopJobseekersOnApprovedReviews);
handleTopicRequest('adminGetMostViewedCompanies', adminAnalytics.getMostViewedCompanies);
handleTopicRequest('adminGetMostViewedCompaniesPerDay', adminAnalytics.getMostViewedCompaniesPerDay);
handleTopicRequest('adminGetTopRatingCEOs', adminAnalytics.getTopRatingCEOs);
createTopicConsumer('getCompany', adminAnalytics.countOneViewToCompany);

handleTopicRequest('GetJobsEmp',employeeJobs.GetJobs)
handleTopicRequest('updateJobStatus',application.handlepdateApplication)
handleTopicRequest('PostJob',employeeJobs.EmployeePostJob);
handleTopicRequest('companiesList',empProfile.handle_get_all_companiesList)
handleTopicRequest('registerNewCompany',empProfile.handle_save_new_company)

handleTopicRequest('PostMessageEmp',EmployerMessages.PostMessage)
handleTopicRequest('CheckChat',EmployerMessages.checkMessages)
handleTopicRequest('login',Login.handle_login)
handleTopicRequest('GetCompanyName',employeeJobs.GetCompanyName)