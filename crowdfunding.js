// Blockchain Integration
let provider;
let signer;

async function connectWallet() {
    try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            const address = await signer.getAddress();
            document.querySelector('.connect-wallet-btn').textContent = 
                `Connected: ${address.substring(0, 6)}...${address.substring(38)}`;
            
            // Enable investment buttons
            enableInvestmentButtons();
        } else {
            alert('Please install MetaMask to use blockchain features!');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}

function enableInvestmentButtons() {
    const investButtons = document.querySelectorAll('.invest-now-btn');
    investButtons.forEach(button => {
        button.disabled = false;
        button.addEventListener('click', handleInvestment);
    });
}

async function handleInvestment(event) {
    const campaignCard = event.target.closest('.campaign-card');
    const campaignTitle = campaignCard.querySelector('h3').textContent;
    const goalAmount = campaignCard.querySelector('.goal').textContent;
    
    try {
        // Here you would typically interact with your smart contract
        // This is a placeholder for the actual blockchain transaction
        const transaction = await signer.sendTransaction({
            to: "YOUR_SMART_CONTRACT_ADDRESS",
            value: ethers.utils.parseEther("0.1") // Example amount
        });
        
        await transaction.wait();
        alert(`Successfully invested in ${campaignTitle}`);
        
        // Update UI to reflect new investment
        updateCampaignProgress(campaignCard);
    } catch (error) {
        console.error('Investment failed:', error);
        alert('Investment failed. Please try again.');
    }
}

function updateCampaignProgress(campaignCard) {
    const progressBar = campaignCard.querySelector('.progress');
    const currentWidth = parseInt(progressBar.style.width);
    progressBar.style.width = `${Math.min(currentWidth + 5, 100)}%`;
}

// Filter Campaigns
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.campaign-filters button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter campaigns (placeholder for actual filtering logic)
            filterCampaigns(button.textContent);
        });
    });
    
    // Connect wallet button
    const connectWalletBtn = document.querySelector('.connect-wallet-btn');
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', connectWallet);
    }
    
    // Pitch form handling
    const pitchBtn = document.querySelector('.pitch-btn');
    if (pitchBtn) {
        pitchBtn.addEventListener('click', openPitchForm);
    }
});

function filterCampaigns(category) {
    const campaigns = document.querySelectorAll('.campaign-card');
    
    campaigns.forEach(campaign => {
        if (category === 'All Projects') {
            campaign.style.display = 'block';
        } else {
            // Add your filtering logic here based on campaign categories
            const campaignCategory = campaign.dataset.category;
            campaign.style.display = campaignCategory === category ? 'block' : 'none';
        }
    });
}

function openPitchForm() {
    // Placeholder for pitch form functionality
    alert('Pitch form will be implemented here. This will allow entrepreneurs to submit their business proposals.');
}

// Schedule pitch functionality
document.querySelector('.schedule-pitch-btn').addEventListener('click', () => {
    // Placeholder for scheduling functionality
    alert('Scheduling system will be implemented here. This will allow entrepreneurs to book pitch sessions with investors.');
});
