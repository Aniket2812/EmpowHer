import React, { useEffect, useState, useRef } from 'react';
import { Container, Grid, Typography, Box, Button, Card, CardContent, Avatar, IconButton, Divider, CardMedia, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BusinessCenter, Group, AccountBalance, School, TrendingUp, Security, ArrowBackIos, ArrowForwardIos, Person } from '@mui/icons-material';
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
    background: 'url(https://images.pexels.com/photos/7709287/pexels-photo-7709287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.1,
  },
}));

const FeatureCard = styled(Card)(({ theme }) => ({
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

const StatCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(255, 77, 141, 0.15)',
  },
}));

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
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

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Group sx={{ fontSize: 40 }} />,
      title: 'Exclusive Women Community',
      description: 'Connect with like-minded women entrepreneurs, share experiences, and build lasting professional relationships in a safe, supportive environment.',
    },
    {
      icon: <BusinessCenter sx={{ fontSize: 40 }} />,
      title: 'Business Growth',
      description: 'Access tools, resources, and mentorship to scale your business. Get insights from successful women entrepreneurs who have walked the path.',
    },
    {
      icon: <AccountBalance sx={{ fontSize: 40 }} />,
      title: 'Crowdfunding Platform',
      description: 'Secure funding for your business through our women-focused crowdfunding platform. Connect with investors who believe in women entrepreneurs.',
    },
    {
      icon: <School sx={{ fontSize: 40 }} />,
      title: 'Skill Development',
      description: 'Access curated courses, workshops, and resources designed specifically for women entrepreneurs to enhance their business skills.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      title: 'Market Access',
      description: 'Showcase and sell your products to a wider audience through our marketplace. Connect directly with customers who value authenticity.',
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Safe Environment',
      description: 'A verified women-only platform ensuring safe networking and business opportunities. Your privacy and security are our top priorities.',
    },
  ];

  const statistics = [
    { number: '10,000+', label: 'Active Members' },
    { number: '₹50M+', label: 'Funds Raised' },
    { number: '1,000+', label: 'Success Stories' },
    { number: '500+', label: 'Expert Mentors' },
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      role: 'Founder, EcoHandlooms',
      content: 'EmpowHer helped me transform my small handloom business into a thriving enterprise. The mentorship and community support were invaluable.',
      business: 'Traditional Textiles',
      growth: '300% revenue growth in 1 year',
      image: 'https://www.villagesquare.in/wp-content/uploads/2019/09/Weaver3.jpg',
    },
    {
      name: 'Meera Patel',
      role: 'CEO, TechInnovate',
      content: 'Through EmpowHer\'s crowdfunding platform, I raised enough capital to expand my tech startup. The women-only community made me feel safe and supported.',
      business: 'EdTech Solutions',
      growth: 'Raised ₹50L in funding',
      image: 'https://images.hindustantimes.com/img/2021/08/17/550x309/IMG_8181_1629192510903_1629192518759.jpg',
    },
    {
      name: 'Anjali Singh',
      role: 'Founder, OrganicEats',
      content: 'The business development workshops helped me scale my organic food business from one store to a chain of five outlets.',
      business: 'Organic Food Chain',
      growth: 'Expanded to 5 locations',
      image: 'https://images.yourstory.com/cs/4/8e7cc4102d6c11e9aa979329348d4c3e/Image4cxf-1641368534606.jpg?fm=png&auto=format&blur=500',
    },
    {
      name: 'Ritu Verma',
      role: 'Founder, ArtisanCrafts',
      content: 'The marketplace feature helped me reach customers across India. My handicraft business now supports 50 local artisans.',
      business: 'Handicrafts',
      growth: 'Supporting 50+ artisans',
      image: 'https://wonderwheelstore.com/wp-content/uploads/2021/03/wonderwheelstore-11-Tribe-14-min-500x334.jpg',
    },
    {
      name: 'Deepika Kumar',
      role: 'CEO, WellnessHub',
      content: 'From a home-based yoga studio to a wellness center chain, EmpowHer\'s resources and network made this journey possible.',
      business: 'Wellness Centers',
      growth: '10,000+ clients served',
      image: 'https://amma.org/wp-content/uploads/2018-06-21_yogaday05-dundauttarakhand.jpg',
    },
    {
      name: 'Zara Sheikh',
      role: 'Founder, ZS Fashion',
      content: 'The mentorship program connected me with fashion industry veterans who helped me launch my sustainable clothing line.',
      business: 'Sustainable Fashion',
      growth: 'Featured in Vogue India',
      image: 'https://img.faballey.com/images/Product/RCD00100Z/d3.jpg',
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
              Welcome to EmpowHer
            </Typography>
            <Typography variant="h5" paragraph sx={{ mb: 4, opacity: 0.9 }}>
              Join India's largest women-only business community. Connect, learn, and grow together.
            </Typography>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              {!currentUser && (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    mr: 2,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Join Now
                </Button>
              )}
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => navigate('/community')}
                sx={{
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Explore Community
              </Button>
            </Box>
          </Box>
        </Container>
      </HeroSection>

      <Container sx={{ mt: -5 }}>
        <Grid container spacing={3}>
          {statistics.map((stat, index) => (
            <Grid item xs={6} md={3} key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
              <StatCard elevation={3}>
                <Typography variant="h3" color="primary" gutterBottom>
                  {stat.number}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {stat.label}
                </Typography>
              </StatCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ mt: 8, mb: 8 }}>
        <Box data-aos="fade-up">
          <Typography variant="h3" align="center" gutterBottom>
            How We Help You Grow
          </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
            Everything you need to start, run, and scale your business
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <FeatureCard elevation={2}>
                <IconWrapper>
                  {feature.icon}
                </IconWrapper>
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="textSecondary">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {currentUser ? 'Your Journey Starts Here' : 'Success Stories'}
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            {currentUser 
              ? 'Explore our community, connect with fellow entrepreneurs, and start your success story.'
              : 'Join thousands of women who have transformed their lives through our platform.'
            }
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {successStories.map((story, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={story.image}
                  alt={story.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {story.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {story.content}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    {story.achievement}
                  </Typography>
                </CardContent>
                <CardActions>
                  {currentUser ? (
                    <Button 
                      size="small" 
                      onClick={() => navigate('/community')}
                      startIcon={<Person />}
                    >
                      Connect
                    </Button>
                  ) : (
                    <Button 
                      size="small" 
                      onClick={() => navigate('/signup')}
                    >
                      Learn More
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
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

      <Container sx={{ mt: 8, mb: 8 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }} data-aos="fade-up">
          <Typography variant="h3" gutterBottom>
            Ready to Start Your Enterprise?
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph sx={{ mb: 4 }}>
            Join thousands of women entrepreneurs who are building successful businesses with EmpowHer
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
