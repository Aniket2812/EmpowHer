import React, { useEffect } from 'react';
import { Container, Grid, Typography, Box, Button, Card, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Engineering, Healing, AccountBalance, Groups2, Business, School, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../contexts/AuthContext';

const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  padding: theme.spacing(15, 0),
  textAlign: 'center',
  borderRadius: theme.spacing(0, 0, 4, 4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url(https://images.pexels.com/photos/7709291/pexels-photo-7709291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
  },
}));

const InitiativeCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4),
  transition: 'all 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(255, 77, 141, 0.15)',
  },
}));

const TeamCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(4),
  textAlign: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(255, 77, 141, 0.15)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
}));

const About = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const initiatives = [
    {
      icon: <Engineering sx={{ fontSize: 40 }} />,
      title: 'Skill Development Programs',
      description: 'Training in areas like stitching, handicrafts, digital literacy, and entrepreneurship to help women build sustainable livelihoods.',
    },
    {
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      title: 'Marketplace',
      description: 'Discover authentic handcrafted products created by talented rural women artisans across India, from traditional textiles and handicrafts to organic products and sustainable goods.',
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      title: 'Financial Literacy',
      description: 'Teaching women about savings, budgeting, microfinance, and government schemes to promote economic independence.',
    },
    {
      icon: <Groups2 sx={{ fontSize: 40 }} />,
      title: 'Community Building',
      description: 'Connecting rural women through local meetups, online forums, and mentorship programs to foster collaboration and support.',
    },
    {
      icon: <Business sx={{ fontSize: 40 }} />,
      title: 'Entrepreneurship Support',
      description: 'Guiding women to start and grow their own businesses by providing training, funding connections, and market linkages.',
    }
  ];

  const teamMembers = [
    {
      name: 'Aniket Yadav',
      role: 'Team Member',
      image: 'https://picsum.photos/200/300',
    },
    {
      name: 'Vansh',
      role: 'Team Member',
      image: 'https://picsum.photos/200/301',
    },
    {
      name: 'Kshitij Pal',
      role: 'Team Member',
      image: 'https://picsum.photos/200/302',
    },
    {
      name: 'Punay Kukreja',
      role: 'Team Member',
      image: 'https://picsum.photos/200/303',
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <Box>
      <HeroSection>
        <Container>
          <Box data-aos="fade-up">
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2.5rem', md: '4rem' },
                mb: 2,
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              About EmpowHer
            </Typography>
            <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
              Empowering rural women of India to thrive and lead self-reliant lives
            </Typography>
          </Box>
        </Container>
      </HeroSection>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} data-aos="fade-right">
            <Typography variant="h3" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              At EmpowHer, we are committed to bridging the gap between urban progress and rural potential. Rural women in India are the backbone of their families and communities, yet they often face significant challenges such as limited access to education, healthcare, and financial independence.
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to empower these women by providing them with the tools, skills, and platforms they need to unlock their full potential and lead self-reliant, fulfilling lives.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} data-aos="fade-left">
            <Box
              component="img"
              src="https://www.villagesquare.in/wp-content/uploads/2023/08/Lead-01-_DSC0950.jpg"
              alt="EmpowHer Community"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Box textAlign="center" mb={6} data-aos="fade-up">
          <Typography variant="h3" gutterBottom>
            What We Do
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            Making impact through actionable, grassroots-level initiatives
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {initiatives.map((initiative, index) => (
            <Grid item xs={12} md={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <InitiativeCard elevation={2}>
                <IconWrapper>
                  {initiative.icon}
                </IconWrapper>
                <Typography variant="h5" gutterBottom>
                  {initiative.title}
                </Typography>
                <Typography color="textSecondary">
                  {initiative.description}
                </Typography>
              </InitiativeCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Box textAlign="center" mb={6} data-aos="fade-up">
          <Typography variant="h3" gutterBottom>
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            We envision a future where every rural woman in India has the confidence, capability, and opportunity to shape her destiny. A future where she is celebrated for her strength and contributions, and where her empowerment becomes the foundation for stronger families, healthier communities, and a more equitable society.
          </Typography>
        </Box>
      </Container>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Box textAlign="center" mb={6} data-aos="fade-up">
          <Typography variant="h3" gutterBottom>
            Meet Our Team
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            The passionate individuals behind EmpowHer
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <TeamCard elevation={2}>
                <Avatar
                  src={member.image}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h5" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.role}
                </Typography>
              </TeamCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }} data-aos="fade-up">
          <Typography variant="h3" gutterBottom>
            Join the Movement
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            If you're passionate about empowering rural women and want to be part of something transformative, welcome to EmpowHer. Let's work hand-in-hand to rewrite the story of rural India—one empowered woman at a time.
          </Typography>
          {!currentUser && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                textTransform: 'none',
                boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  boxShadow: '0 6px 20px rgba(0,118,255,0.39)',
                },
              }}
            >
              Start Your Journey
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default About;