import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import CrowdfundingContractABI from '../contracts/CrowdfundingContract.json';

const CONTRACT_ADDRESS = process.env.REACT_APP_CROWDFUNDING_CONTRACT_ADDRESS;

class Web3Service {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.account = null;
  }

  async initialize() {
    try {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        this.web3 = new Web3(provider);
        this.contract = new this.web3.eth.Contract(
          CrowdfundingContractABI,
          CONTRACT_ADDRESS
        );

        const accounts = await this.web3.eth.requestAccounts();
        this.account = accounts[0];
        return true;
      } else {
        console.error('Please install MetaMask!');
        return false;
      }
    } catch (error) {
      console.error('Error initializing Web3:', error);
      return false;
    }
  }

  async createCampaign(businessId, goal, durationDays) {
    try {
      await this.initialize();
      const result = await this.contract.methods
        .createCampaign(businessId, this.web3.utils.toWei(goal.toString(), 'ether'), durationDays)
        .send({ from: this.account });
      return result;
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  async contribute(businessId, amount, anonymous) {
    try {
      await this.initialize();
      const result = await this.contract.methods
        .contribute(businessId, anonymous)
        .send({
          from: this.account,
          value: this.web3.utils.toWei(amount.toString(), 'ether')
        });
      return result;
    } catch (error) {
      console.error('Error contributing to campaign:', error);
      throw error;
    }
  }

  async getCampaignDetails(businessId) {
    try {
      await this.initialize();
      const details = await this.contract.methods
        .getCampaignDetails(businessId)
        .call();
      
      return {
        owner: details[0],
        goal: this.web3.utils.fromWei(details[1], 'ether'),
        deadline: new Date(details[2] * 1000),
        amountRaised: this.web3.utils.fromWei(details[3], 'ether'),
        active: details[4]
      };
    } catch (error) {
      console.error('Error getting campaign details:', error);
      throw error;
    }
  }

  async getContribution(businessId, contributor) {
    try {
      await this.initialize();
      const amount = await this.contract.methods
        .getContribution(businessId, contributor)
        .call();
      return this.web3.utils.fromWei(amount, 'ether');
    } catch (error) {
      console.error('Error getting contribution:', error);
      throw error;
    }
  }
}

export default new Web3Service();
