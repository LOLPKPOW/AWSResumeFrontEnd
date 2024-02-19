let callCount = 0; // Variable to track the number of times the function is called

// Import AWS SDK
const AWS = require('aws-sdk');

// Create an instance of the AWS SDK and configure the region
AWS.config.update({ region: 'us-east-2' });

// Create an instance of the SSM
const ssm = new AWS.SSM();

// Function to fetch the API URL from Parameter Store
async function getAPIUrl() {
    try {
        const params = {
            Name: 'ResumeVisitorAPI', // Specify the name of your parameter
        };
        const data = await ssm.getParameter(params).promise();
        return data.Parameter.Value; // Return the API URL
    } catch (error) {
        console.error('Error fetching API URL from Parameter Store:', error);
        throw error; // Throw the error for handling in the caller function
    }
}

// Async function to update visitor count
async function updateVisitorCount() {
    callCount++; // Increment the call count
    console.log(`updateVisitorCount() called ${callCount} time(s)`); // Log the call count
    
    try {
        // Fetch the API URL from Parameter Store
        const apiUrl = await getAPIUrl();
        
        // Fetch visitor count from the backend using the fetched API URL
        const response = await fetch(apiUrl); 
        if (!response.ok) {
            throw new Error('Failed to fetch visitor count');
        }
        const visitorCount = await response.text();
        document.getElementById('visitorCount').textContent = visitorCount;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
        // You can display an error message or handle the error in other ways here
    }
}

// Call the function directly when the page loads
document.addEventListener('DOMContentLoaded', updateVisitorCount);
