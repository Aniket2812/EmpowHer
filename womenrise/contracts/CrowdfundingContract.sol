// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdfundingContract {
    struct Campaign {
        address payable owner;
        string businessId;
        uint256 goal;
        uint256 deadline;
        uint256 amountRaised;
        bool active;
        mapping(address => uint256) contributions;
    }

    mapping(string => Campaign) public campaigns;
    mapping(string => bool) public campaignExists;

    event CampaignCreated(string businessId, address owner, uint256 goal, uint256 deadline);
    event ContributionMade(string businessId, address indexed contributor, uint256 amount, bool isAnonymous);
    event GoalReached(string businessId, uint256 amount);

    modifier campaignActive(string memory businessId) {
        require(campaignExists[businessId], "Campaign does not exist");
        require(campaigns[businessId].active, "Campaign is not active");
        require(block.timestamp < campaigns[businessId].deadline, "Campaign has ended");
        _;
    }

    function createCampaign(string memory businessId, uint256 goal, uint256 durationDays) external {
        require(!campaignExists[businessId], "Campaign already exists");
        require(goal > 0, "Goal must be greater than 0");

        Campaign storage newCampaign = campaigns[businessId];
        newCampaign.owner = payable(msg.sender);
        newCampaign.businessId = businessId;
        newCampaign.goal = goal;
        newCampaign.deadline = block.timestamp + (durationDays * 1 days);
        newCampaign.active = true;
        newCampaign.amountRaised = 0;

        campaignExists[businessId] = true;

        emit CampaignCreated(businessId, msg.sender, goal, newCampaign.deadline);
    }

    function contribute(string memory businessId, bool isAnonymous) external payable campaignActive(businessId) {
        require(msg.value > 0, "Contribution must be greater than 0");

        Campaign storage campaign = campaigns[businessId];
        campaign.contributions[msg.sender] += msg.value;
        campaign.amountRaised += msg.value;

        emit ContributionMade(businessId, isAnonymous ? address(0) : msg.sender, msg.value, isAnonymous);

        if (campaign.amountRaised >= campaign.goal) {
            campaign.active = false;
            emit GoalReached(businessId, campaign.amountRaised);
            campaign.owner.transfer(campaign.amountRaised);
        }
    }

    function getCampaignDetails(string memory businessId) external view returns (
        address owner,
        uint256 goal,
        uint256 deadline,
        uint256 amountRaised,
        bool active
    ) {
        require(campaignExists[businessId], "Campaign does not exist");
        Campaign storage campaign = campaigns[businessId];
        return (
            campaign.owner,
            campaign.goal,
            campaign.deadline,
            campaign.amountRaised,
            campaign.active
        );
    }

    function getContribution(string memory businessId, address contributor) external view returns (uint256) {
        require(campaignExists[businessId], "Campaign does not exist");
        return campaigns[businessId].contributions[contributor];
    }
}
