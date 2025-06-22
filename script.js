// TEMP CHANGE TO FORCE UPDATE 2025-06-22 - This comment helps verify latest code
// Get references to the HTML elements
const connectButton = document.getElementById('connect');
const accountDisplay = document.getElementById('account');

// Add an event listener to the "Connect Wallet" button
connectButton.addEventListener('click', async () => {
    // Check if MetaMask (or another Ethereum provider) is available in the browser
    if (window.ethereum) {
        try {
            // Request that the user connects their MetaMask accounts
            // This will open the MetaMask pop-up for the user to confirm
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            // If connection is successful, accounts array will contain the user's addresses
            const connectedAccount = accounts[0]; // Get the first connected account

            // Display the connected account on the webpage
            accountDisplay.innerHTML = Connected Account: ${connectedAccount};
            console.log('Wallet connected:', connectedAccount); // Log to browser console

            // Optional: Listen for account changes
            // If the user changes their account in MetaMask, update the display
            window.ethereum.on('accountsChanged', (newAccounts) => {
                if (newAccounts.length > 0) {
                    accountDisplay.innerHTML = Connected Account: ${newAccounts[0]};
                    console.log('Account changed to:', newAccounts[0]);
                } else {
                    // User disconnected all accounts
                    accountDisplay.innerHTML = 'No account connected.';
                    console.log('Wallet disconnected.');
                }
            });

        } catch (error) {
            // Handle errors (e.g., user declines connection)
            console.error("User denied account access or other error:", error);
            accountDisplay.innerHTML = 'Connection rejected or error occurred.';
        }
    } else {
        // MetaMask is not installed
        alert('MetaMask is not installed. Please install it to connect your wallet.');
        accountDisplay.innerHTML = 'MetaMask not found.';
    }
});