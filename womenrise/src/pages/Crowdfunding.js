import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
  Avatar,
  TextField,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Switch,
  Alert,
  Snackbar,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  useTheme,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  TrendingUp,
  AccessTime,
  Group,
  AccountBalanceWallet,
  FilterList,
  ArrowUpward,
  Verified,
  LocalOffer,
  BusinessCenter,
  Timeline,
  Share
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp, orderBy, limit } from 'firebase/firestore';
import web3Service from '../services/web3Service';

const StyledHero = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  color: 'white',
  padding: theme.spacing(12, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url(https://images.pexels.com/photos/7709287/pexels-photo-7709287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  position: 'relative',
  overflow: 'visible',
}));

const CategoryBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  zIndex: 1,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(8px)',
}));

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: 'center',
}));

const FilterBar = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  backgroundColor: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(8px)',
  position: 'sticky',
  top: 64,
  zIndex: 2,
}));

const categories = [
  'All Projects',
  'Technology',
  'Fashion',
  'Food',
  'Art & Craft',
  'Education',
  'Social Impact',
];

const sortOptions = [
  { value: 'trending', label: 'Trending', icon: <TrendingUp /> },
  { value: 'newest', label: 'Newest', icon: <Timeline /> },
  { value: 'mostFunded', label: 'Most Funded', icon: <ArrowUpward /> },
];

const Crowdfunding = () => {
  const theme = useTheme();
  const { currentUser, userData } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState('trending');
  const [trendingProjects, setTrendingProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    goal: '',
    duration: 30,
    category: '',
    image: ''
  });

  useEffect(() => {
    fetchProjects();
    fetchTrendingProjects();
  }, [selectedCategory]);

  // Sample crowdfunding projects
  const sampleProjects = [
    {
      id: 'sample1',
      title: 'EcoFashion Revolution',
      description: 'Creating sustainable fashion using recycled materials and traditional handloom techniques. Our mission is to combine environmental consciousness with ethnic fashion, providing employment to local artisans.',
      image: 'https://geneticliteracyproject.org/wp-content/uploads/elementor/thumbs/png-sri-lanka-tea-work-plantation-qk5f64tgbx3b4hkxhan8a5onn6wjc6necn8jcvja8k.png',
      category: 'Fashion',
      goal: 250000,
      raised: 175000,
      deadline: Timestamp.fromDate(new Date('2025-04-15')),
      backers: 145,
      creatorName: 'Priya Sharma',
      creatorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3',
      verified: true,
      useBlockchain: true
    },
    {
      id: 'sample2',
      title: 'Tech Education for Rural Girls',
      description: 'Bringing coding education and digital literacy to rural areas through mobile learning centers. Our program focuses on teaching programming, web development, and digital skills to young girls.',
      image: 'https://i0.wp.com/gokulamseekias.com/wp-content/uploads/2024/01/photo_2024-01-18_11-26-30.jpg',
      category: 'Education',
      goal: 180000,
      raised: 90000,
      deadline: Timestamp.fromDate(new Date('2025-05-01')),
      backers: 89,
      creatorName: 'Anjali Gupta',
      creatorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3',
      verified: true,
      useBlockchain: false
    },
    {
      id: 'sample3',
      title: 'Organic Food Collective',
      description: 'A women-led cooperative connecting organic farmers directly with urban consumers. We\'re building a sustainable food ecosystem while empowering rural women farmers.',
      image: 'https://www.csrmandate.org/wp-content/uploads/2022/02/Women-in-Chikballapur-working-on-hand-embroidering-fabric-for-%E2%80%98Stitch-in-Time-1.jpeg',
      category: 'Food',
      goal: 50000,
      raised: 20000,
      deadline: Timestamp.fromDate(new Date('2025-03-30')),
      backers: 234,
      creatorName: 'Meera Patel',
      creatorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3',
      verified: true,
      useBlockchain: true
    },
    {
      id: 'sample4',
      title: 'Artisanal Jewelry Studio',
      description: 'Reviving traditional metalwork and gemstone crafting techniques through modern jewelry design. Training and employing women artisans to preserve our cultural heritage.',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3',
      category: 'Art & Craft',
      goal: 100000,
      raised: 35000,
      deadline: Timestamp.fromDate(new Date('2025-06-15')),
      backers: 67,
      creatorName: 'Ritu Verma',
      creatorAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3',
      verified: false,
      useBlockchain: true
    },
    {
      id: 'sample5',
      title: 'WomenTech Solutions',
      description: 'Developing AI-powered software solutions for women\'s safety and healthcare. Our first product is a mobile app that uses machine learning for early detection of health issues.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe2WXRxcfK1JYLkOmBzMwyjVntgXIOSEHK7g&s',
      category: 'Technology',
      goal: 300000,
      raised: 210000,
      deadline: Timestamp.fromDate(new Date('2025-04-30')),
      backers: 178,
      creatorName: 'Dr. Sarah Khan',
      creatorAvatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3',
      verified: true,
      useBlockchain: true
    },
    {
      id: 'sample6',
      title: 'Sustainable Beauty Brand',
      description: 'Creating natural, chemical-free beauty products using traditional Ayurvedic recipes. Our products are environmentally conscious and empower local herb farmers.',
      image: 'https://odishabytes.com/wp-content/uploads/2021/12/3-2.jpeg',
      category: 'Social Impact',
      goal: 45000,
      raised: 8000,
      deadline: Timestamp.fromDate(new Date('2025-05-15')),
      backers: 112,
      creatorName: 'Maya Reddy',
      creatorAvatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3',
      verified: false,
      useBlockchain: true
    }
  ];

  // Modify fetchProjects to use sample data
  const fetchProjects = async () => {
    setLoading(true);
    try {
      let filteredProjects = [...sampleProjects];
      if (selectedCategory !== 'All Projects') {
        filteredProjects = sampleProjects.filter(project => project.category === selectedCategory);
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'trending':
          filteredProjects.sort((a, b) => b.backers - a.backers);
          break;
        case 'newest':
          filteredProjects.sort((a, b) => b.deadline.seconds - a.deadline.seconds);
          break;
        case 'mostFunded':
          filteredProjects.sort((a, b) => (b.raised / b.goal) - (a.raised / a.goal));
          break;
        default:
          break;
      }
      
      setProjects(filteredProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setSnackbar({
        open: true,
        message: 'Error fetching projects. Please try again.',
        severity: 'error'
      });
    }
    setLoading(false);
  };

  // Modify fetchTrendingProjects to use sample data
  const fetchTrendingProjects = async () => {
    try {
      const trending = [...sampleProjects]
        .sort((a, b) => b.backers - a.backers)
        .slice(0, 3);
      setTrendingProjects(trending);
    } catch (error) {
      console.error('Error fetching trending projects:', error);
    }
  };

  const handleInvest = async () => {
    try {
      if (!selectedProject) return;

      if (selectedProject.useBlockchain) {
        await web3Service.contribute(selectedProject.id, investmentAmount, isAnonymous);
      } else {
        const investmentRef = collection(db, 'investments');
        await addDoc(investmentRef, {
          projectId: selectedProject.id,
          investorId: isAnonymous ? null : currentUser.uid,
          amount: parseFloat(investmentAmount),
          timestamp: Timestamp.now(),
          anonymous: isAnonymous
        });

        const projectRef = doc(db, 'projects', selectedProject.id);
        await updateDoc(projectRef, {
          raised: selectedProject.raised + parseFloat(investmentAmount)
        });
      }

      setSnackbar({
        open: true,
        message: 'Investment successful!',
        severity: 'success'
      });
      
      setInvestDialogOpen(false);
      setInvestmentAmount('');
      setIsAnonymous(false);
      fetchProjects();
    } catch (error) {
      console.error('Error making investment:', error);
      setSnackbar({
        open: true,
        message: 'Error making investment. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCreateProject = async () => {
    try {
      const projectRef = collection(db, 'projects');
      const projectData = {
        ...newProject,
        creatorId: currentUser.uid,
        creatorName: userData?.businessName || 'Artisanal Treasures',
        raised: 0,
        backers: 0,
        createdAt: Timestamp.now(),
        deadline: Timestamp.fromDate(new Date(Date.now() + newProject.duration * 24 * 60 * 60 * 1000))
      };

      const docRef = await addDoc(projectRef, projectData);

      if (projectData.useBlockchain) {
        await web3Service.createCampaign(
          docRef.id,
          parseFloat(newProject.goal),
          newProject.duration
        );
      }

      setSnackbar({
        open: true,
        message: 'Project created successfully!',
        severity: 'success'
      });
      
      setCreateDialogOpen(false);
      setNewProject({
        title: '',
        description: '',
        goal: '',
        duration: 30,
        category: '',
        image: ''
      });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      setSnackbar({
        open: true,
        message: 'Error creating project. Please try again.',
        severity: 'error'
      });
    }
  };

  const getTimeLeft = (deadline) => {
    const now = new Date();
    const end = deadline.toDate();
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : 'Ended';
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return theme.palette.success.main;
    if (progress >= 75) return theme.palette.warning.main;
    return theme.palette.primary.main;
  };

  return (
    <>
      <StyledHero>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Fund the Future of Women Entrepreneurship
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Join us in empowering women-led businesses and innovations that are shaping tomorrow.
              </Typography>
              {currentUser && userData?.isBusinessOwner && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => setCreateDialogOpen(true)}
                  startIcon={<BusinessCenter />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    boxShadow: theme.shadows[4],
                  }}
                >
                  Start Your Campaign
                </Button>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Trending Projects
                  </Typography>
                  {trendingProjects.map((project, index) => (
                    <Box key={project.id} sx={{ mb: index !== trendingProjects.length - 1 ? 2 : 0 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={project.image} variant="rounded" />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {project.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {project.raised.toLocaleString()} raised of {project.goal.toLocaleString()} goal
                          </Typography>
                        </Box>
                      </Box>
                      {index !== trendingProjects.length - 1 && <Divider sx={{ mt: 2 }} />}
                    </Box>
                  ))}
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </StyledHero>

      <Container maxWidth="lg" sx={{ mt: -4, position: 'relative', zIndex: 2, pb: 8 }}>
        <FilterBar elevation={2}>
          <TextField
            placeholder="Search projects..."
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              startAdornment={<FilterList sx={{ mr: 1 }} />}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {option.icon}
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterBar>

        <Grid container spacing={3}>
          {loading ? (
            <Grid item xs={12} sx={{ textAlign: 'center', py: 5 }}>
              <CircularProgress />
            </Grid>
          ) : (
            projects
              .filter(project =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((project) => (
                <Grid item xs={12} md={6} lg={4} key={project.id}>
                  <StyledCard>
                    <CategoryBadge
                      label={project.category}
                      icon={<LocalOffer sx={{ fontSize: 16 }} />}
                    />
                    <CardMedia
                      component="img"
                      height="240"
                      image={project.image}
                      alt={project.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Avatar src={project.creatorAvatar} />
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {project.creatorName}
                            {project.verified && (
                              <Tooltip title="Verified Business">
                                <Verified sx={{ ml: 1, fontSize: 16, color: 'primary.main' }} />
                              </Tooltip>
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {getTimeLeft(project.deadline)}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="h6" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {project.description}
                      </Typography>

                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {((project.raised / project.goal) * 100).toFixed(1)}%
                          </Typography>
                        </Box>
                        <ProgressBar
                          variant="determinate"
                          value={(project.raised / project.goal) * 100}
                          sx={{
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: getProgressColor((project.raised / project.goal) * 100),
                            },
                          }}
                        />
                      </Box>

                      <StatsContainer>
                        <StatItem>
                          <Typography variant="h6" color="primary">
                            ₹{project.raised.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Raised
                          </Typography>
                        </StatItem>
                        <Divider orientation="vertical" flexItem />
                        <StatItem>
                          <Typography variant="h6">
                            {project.backers}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Backers
                          </Typography>
                        </StatItem>
                        <Divider orientation="vertical" flexItem />
                        <StatItem>
                          <Typography variant="h6">
                            {getTimeLeft(project.deadline)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Remaining
                          </Typography>
                        </StatItem>
                      </StatsContainer>

                      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                        {currentUser && (
                          <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              setSelectedProject(project);
                              setInvestDialogOpen(true);
                            }}
                            startIcon={project.useBlockchain ? <AccountBalanceWallet /> : null}
                          >
                            Invest Now
                          </Button>
                        )}
                        <IconButton
                          color="primary"
                          size="small"
                          sx={{ border: 1, borderColor: 'divider' }}
                        >
                          <Share />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))
          )}
        </Grid>
      </Container>

      {/* Investment Dialog */}
      <Dialog open={investDialogOpen} onClose={() => setInvestDialogOpen(false)}>
        <DialogTitle>Invest in {selectedProject?.title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Investment Amount (₹)"
            type="number"
            fullWidth
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
          />
          <FormControlLabel
            control={
              <Switch
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
            }
            label="Make Anonymous Investment"
          />
          {selectedProject?.useBlockchain && (
            <Alert severity="info" sx={{ mt: 2 }}>
              This project accepts blockchain-based investments. Make sure you have MetaMask installed and connected.
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvestDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleInvest} variant="contained" color="primary">
            Invest
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Project Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Project Title"
            fullWidth
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Funding Goal (₹)"
            type="number"
            fullWidth
            value={newProject.goal}
            onChange={(e) => setNewProject({ ...newProject, goal: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Duration (Days)"
            type="number"
            fullWidth
            value={newProject.duration}
            onChange={(e) => setNewProject({ ...newProject, duration: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={newProject.category}
              label="Category"
              onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
            >
              {categories.filter(cat => cat !== 'All Projects').map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Image URL"
            fullWidth
            value={newProject.image}
            onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
          />
          <FormControlLabel
            control={
              <Switch
                checked={newProject.useBlockchain}
                onChange={(e) => setNewProject({ ...newProject, useBlockchain: e.target.checked })}
              />
            }
            label="Enable Blockchain-based Funding"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateProject} variant="contained" color="primary">
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Crowdfunding;
