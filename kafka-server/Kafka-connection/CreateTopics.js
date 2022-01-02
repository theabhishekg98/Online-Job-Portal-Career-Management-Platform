var Kafka = require('kafka-node'),
    HighLevelProducer = Kafka.HighLevelProducer,
    client = new Kafka.KafkaClient(),
    producer = new HighLevelProducer(client);

let topics=[
    "response_topic","getCompany","getPhoto","getJobs","getApplication","addApplication","deleteApplication",
    "getReviewsTopic","getEmployeeReport","getEmployeeProfile","saveEmployeeProfile","getCompanyProfile","saveCompanyProfile",
    "saveCompanyReview","getChats","getMessages","addMessage",
    "adminGetReviews", "adminUpdateReviewStatus", "adminGetPhotos", "adminUpdatePhotoStatus",
    "adminGetCompaniesByName", "adminGetComapnyClosedReviews", "adminGetCompanyApplicationStatistics", "adminGetMostViewedCompaniesPerDay",
    "adminGetDailyReviewCount", "adminGetTopReviewedCompanies", "adminGetTopRatingCompanies", "adminGetTopJobseekersOnApprovedReviews",
    "adminGetMostViewedCompanies", "adminGetTopRatingCEOs","get_photo","postphoto","postuploads","post_salary","get_jobs","postcoverletter","postapplication",
    "getfiles","get_cover","updateFeaturedReview","addUser","getAverageSalaryForRole","getTopFiveSalariesForRole",
    "adminGetMostViewedCompanies", "adminGetTopRatingCEOs","get_photo","postphoto","postuploads","post_salary","get_jobs","postapplication",
    "getfiles","updateFeaturedReview","addUser","getAverageSalaryForRole","getTopFiveSalariesForRole","test","postcoverletter","getUserProfile","saveUserProfile","PostJob","updateJobStatus",
    "getCompaniesList", "registerNewCompany", "getAllCompanyReviews", "getSearchedCompanyReviews", "getCompanyList","GetJobsEmp","PostMessageEmp",
    "adminGetMostViewedCompanies", "adminGetTopRatingCEOs",
    "updateFeaturedReview","addUser","getAverageSalaryForRole","getTopFiveSalariesForRole","test","getUserProfile","saveUserProfile","PostJob","updateJobStatus",
    "getCompaniesList","registerNewCompany",
    "postuploads","postphoto","get_photo","get_cover","getfiles","post_salary","get_jobs","get_jobcompany","postapplication","postcoverletter",
    "updateFeaturedReview","addUser","getAverageSalaryForRole","getTopFiveSalariesForRole",
    "adminGetMostViewedCompanies", "adminGetTopRatingCEOs", "companyReviewsTab",
    "updateFeaturedReview","addUser","getAverageSalaryForRole","getTopFiveSalariesForRole","test","getUserProfile","saveUserProfile","PostJob","updateJobStatus",
    "getCompaniesList", "registerNewCompany", "getAllCompanyReviews", "getSearchedCompanyReviews", "getCompanyList","CheckChat","login","GetCompanyName",
    "companiesList", "registerNewCompany", "getAllCompanyReviews", "getSearchedCompanyReviews", "getCompanyList","CheckChat","login","viewAppliedJobs","deleteResume","viewYourReviews","getResume","viewSavedJobs"]

producer.on("ready", function () {
    /**
     * Create Dish Topics
     */
    producer.createTopics(topics,false,function (err,data){
        console.log(data)
        console.log(err)
    })

   
})