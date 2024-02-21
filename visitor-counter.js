// script.js
document.addEventListener('DOMContentLoaded', async () => {
    async function updateVisitorCount() {
        try {
            const response = await fetch('https://k461om3b4f.execute-api.us-east-2.amazonaws.com/prod/visitor-count', {
                headers: {
                    'x-api-key': 'YOUR_API_KEY' // Replace 'YOUR_API_KEY' with your actual API key
                }
            }); 
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

    updateVisitorCount(); // Call the function when the page loads
});
