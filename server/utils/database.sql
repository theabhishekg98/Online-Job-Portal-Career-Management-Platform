USE indeed;
CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    password VARCHAR(255),
    locationId VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS jobSeeker (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255),
    resumeUrl TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS employer (
    `empId` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) DEFAULT NULL,
  `companyId` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`empId`)
);

CREATE TABLE IF NOT EXISTS admin (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS job (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    companyId VARCHAR(255),
    locationId VARCHAR(255),
    salaryId VARCHAR(255),
    roleName VARCHAR(255),
    description TEXT,
    jobType VARCHAR(255),
    whatYouWillDo TEXT,
    whatYouWillLove TEXT,
    whatYouWillNeed TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS company (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    website VARCHAR(255),
    description TEXT,
    locationId VARCHAR(255),
    whyJoinUs TEXT,
    about TEXT,
    ceo VARCHAR(255),
    foundDate VARCHAR(255),
    companySize VARCHAR(255),
    revenue VARCHAR(255),
    industry VARCHAR(255),
    mission TEXT,
    workCulture TEXT,
    companyValues TEXT,
    headquarters VARCHAR(255),
    logoId VARCHAR(255),
    bannerId VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS salary (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    jobId VARCHAR(255),
    startDate VARCHAR(255),
    endDate VARCHAR(255),
    locationId VARCHAR(255),
    salary VARCHAR(255),
    benifits TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);




-- INSERT INTO company(name, website, description, locationId, whyJoinUs, about, 
-- ceo, foundDate, companySize, revenue, industry, mission, workCulture, companyValues, headquarters)
-- VALUES('Tesla', 'https://www.tesla.com', 'Build the future.', 'e68f2707a91c', 
-- 'Working at Tesla means impacting our entire world to change the way we’ve produced, stored and consumed energy for generations. Here are some of the ways our team members are leaving their mark on the world:', 
-- 'Tesla is accelerating the world’s transition to sustainable energy.', 'Elon Musk', '2003', '10,000', '$5B to $10B', 'Manufacturing',
-- 'Tesla’s mission is to accelerate the world’s transition to sustainable energy.', 'Kick off your career with an internship experience like no other.',
-- 'We work in teams that are agile, efficient and focused on excellence.', 'San Francisco');

-- INSERT INTO job (companyId, locationId, salaryId, roleName, description, jobType, whatYouWillDo, whatYouWillLove, whatYouWillNeed)
-- VALUES ('1', '2', '2', 'Software Engineer', 'To work on backend team for the mobile app.', 'Full-time', 
-- 'Design, develop, test, deploy, maintain and improve large-scale distributed software;', 'Fun place to work', 'BS degree or above in Computer Science or related fields or equivalent practical experience, with 0-3 years of working experience;');

-- INSERT INTO company (name, website, description, locationId, 
-- whyJoinUs, about, 
-- ceo, foundDate, companySize, revenue, industry, mission, 
-- workCulture, companyValues, 
-- headquarters, logoId, bannerId)
-- VALUES ('TikTok', 'https://www.tiktok.com/', 'Our mission is to capture and present the worlds creativity, knowledge, and moments that matter, directly from the mobile phone. TikTok enables everyone to be a creator and encourages users to share their passion and creative expression through their videos.', '2',
-- 'At TikTok, we believe great teams build a great product. Our people and our work environment are our top priority. We believe that with the right culture and the right environment, all of our team members can thrive.', 'TikTok is a destination for short-form mobile videos.', 
-- 'Vanessa Pappas', '2014', '5,000', '200M', 'Media & Communication', 'TikTok has become a marketplace for ideas around the globe, transcending boundaries to create a diverse hub of content.', 
-- 'We enable every creator: we enable our users and employees to be creators, whether it’s through their videos or in their careers.', 'Creating Social Value: Our users spend a lot of time on our platform, we believe that we have a responsibility to ensure that the platform has a positive impact on their lives.', 
-- 'Mountain View', '2', '2');







