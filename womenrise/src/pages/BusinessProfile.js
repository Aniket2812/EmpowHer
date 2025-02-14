import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Chip,
  Rating,
} from '@mui/material';
import {
  Store as StoreIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  LocalShipping as ShippingIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BusinessProfile = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [businessProducts, setBusinessProducts] = useState([
    {
      id: 1,
      name: 'Phulkari Dupatta',
      description: 'Traditional Punjabi embroidered dupatta',
      price: 1200,
      image: 'https://i.etsystatic.com/27584116/r/il/9c6e11/2868230045/il_1588xN.2868230045_8m3x.jpg',
      rating: 4.8,
      sales: 145
    },
    {
      id: 2,
      name: 'Bamboo Storage Basket',
      description: 'Eco-friendly handwoven bamboo basket',
      price: 600,
      image: 'https://i.etsystatic.com/31905261/r/il/1b39d5/4081016544/il_1588xN.4081016544_mz5u.jpg',
      rating: 4.6,
      sales: 89
    },
    {
      id: 3,
      name: 'Clay Wind Chimes',
      description: 'Handcrafted terracotta wind chimes',
      price: 450,
      image: 'https://i.etsystatic.com/18461534/r/il/2b8633/4918773570/il_1588xN.4918773570_kr5h.jpg',
      rating: 4.7,
      sales: 112
    },
    {
      id: 4,
      name: 'Madhubani Painting',
      description: 'Traditional Bihar folk art painting',
      price: 1500,
      image: 'https://i.etsystatic.com/16051678/r/il/4019d4/4745130075/il_1588xN.4745130075_9ufs.jpg',
      rating: 4.9,
      sales: 78
    },
    {
      id: 5,
      name: 'Brass Diya Set',
      description: 'Hand-carved brass oil lamps',
      price: 850,
      image: 'https://i.etsystatic.com/27692444/r/il/6eb79d/4326787457/il_1588xN.4326787457_3w7q.jpg',
      rating: 4.8,
      sales: 234
    },
    {
      id: 6,
      name: 'Jute Wall Hanging',
      description: 'Macrame wall art with jute rope',
      price: 750,
      image: 'https://i.etsystatic.com/21655107/r/il/11af49/4938236435/il_1588xN.4938236435_7fx2.jpg',
      rating: 4.5,
      sales: 67
    },
    {
      id: 7,
      name: 'Block Print Stole',
      description: 'Hand block printed cotton stole',
      price: 550,
      image: 'https://i.etsystatic.com/27915506/r/il/c1c82b/4702198836/il_1588xN.4702198836_rr6z.jpg',
      rating: 4.7,
      sales: 156
    },
    {
      id: 8,
      name: 'Copper Water Bottle',
      description: 'Handcrafted engraved copper bottle',
      price: 950,
      image: 'https://i.etsystatic.com/25363174/r/il/e6c75c/4711607142/il_1588xN.4711607142_t0n1.jpg',
      rating: 4.8,
      sales: 198
    },
    {
      id: 9,
      name: 'Wooden Tea Coasters',
      description: 'Hand-painted wooden coaster set',
      price: 400,
      image: 'https://i.etsystatic.com/26718043/r/il/6a5c68/4881308726/il_1588xN.4881308726_b7j8.jpg',
      rating: 4.6,
      sales: 245
    },
    {
      id: 10,
      name: 'Ceramic Planters',
      description: 'Hand-painted ceramic plant pots',
      price: 600,
      image: 'https://i.etsystatic.com/27584116/r/il/9c6e11/2868230045/il_1588xN.2868230045_8m3x.jpg',
      rating: 4.7,
      sales: 167
    },
    {
      id: 11,
      name: 'Beaded Necklace Set',
      description: 'Handcrafted glass beaded jewelry set',
      price: 850,
      image: 'https://i.etsystatic.com/16051678/r/il/4019d4/4745130075/il_1588xN.4745130075_9ufs.jpg',
      rating: 4.9,
      sales: 178
    },
    {
      id: 12,
      name: 'Embroidered Table Runner',
      description: 'Hand-embroidered cotton table runner',
      price: 700,
      image: 'https://i.etsystatic.com/27915506/r/il/c1c82b/4702198836/il_1588xN.4702198836_rr6z.jpg',
      rating: 4.8,
      sales: 134
    }
  ]);
  const [loading, setLoading] = useState(true);

  const businessData = {
    businessName: "Artisanal Treasures",
    ownerName: "Priya Sharma",
    location: "Jaipur, Rajasthan",
    phone: "+91 98765 43210",
    email: "priya.sharma@artisanaltreasures.com",
    description: "Empowering local artisans through traditional handicrafts. We work directly with skilled artisans from Rajasthan to bring their beautiful creations to a global marketplace while ensuring fair trade practices and sustainable livelihoods.",
    expertise: "Traditional Rajasthani Handicrafts",
    yearsInBusiness: 5,
    artisansEmployed: 25,
    rating: 4.8,
    totalReviews: 156,
    categories: ["Handicrafts", "Home Decor", "Traditional Art", "Jewelry"],
    shippingAreas: ["Domestic", "International"],
    certifications: ["Fair Trade Certified", "Artisan Verified", "Quality Assured"],
    achievements: [
      "Best Handicraft Business Award 2024",
      "Featured in Vogue India",
      "Empowering 100+ Rural Women"
    ]
  };

  useEffect(() => {
    setLoading(false);
  }, [currentUser, userData]);

  if (!userData?.isBusinessOwner) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            You need to be registered as a business owner to view this page.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, position: 'relative' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem'
                }}
              >
                {businessData.businessName.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h4" component="h1">
                    {businessData.businessName}
                  </Typography>
                  <VerifiedIcon color="primary" />
                </Box>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  {businessData.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Rating value={businessData.rating} precision={0.1} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    {businessData.rating} ({businessData.totalReviews} reviews)
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate('/business-dashboard')}
              >
                View Dashboard
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Business Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <StoreIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Owner"
                  secondary={businessData.ownerName}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Location"
                  secondary={businessData.location}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Contact"
                  secondary={businessData.phone}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Email"
                  secondary={businessData.email}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AccessTimeIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Years in Business"
                  secondary={`${businessData.yearsInBusiness} years`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <GroupIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Artisans Employed"
                  secondary={businessData.artisansEmployed}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Specializations
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Product Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {businessData.categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    icon={<CategoryIcon />}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Shipping Areas
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {businessData.shippingAreas.map((area) => (
                  <Chip
                    key={area}
                    label={area}
                    icon={<ShippingIcon />}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Certifications
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {businessData.certifications.map((cert) => (
                  <Chip
                    key={cert}
                    label={cert}
                    icon={<VerifiedIcon />}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Achievements
            </Typography>
            <List dense>
              {businessData.achievements.map((achievement, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <VerifiedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={achievement} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">
                Featured Products
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: '#ff4081',
                  borderColor: '#ff4081',
                  '&:hover': {
                    backgroundColor: '#ff4081',
                    color: 'white',
                    borderColor: '#ff4081',
                  },
                }}
              >
                View All Products
              </Button>
            </Box>
            <Grid container spacing={2}>
              {businessProducts.map((product) => (
                <Grid item xs={12} sm={6} lg={3} key={product.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 2
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.image}
                      alt={product.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Typography variant="subtitle2" component="h2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        {product.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold' }}>
                          ₹{product.price}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={product.rating} precision={0.1} size="small" readOnly />
                          <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                            ({product.sales})
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 1, pt: 0 }}>
                      <Button 
                        variant="contained" 
                        fullWidth
                        size="small"
                        sx={{
                          bgcolor: '#ff4081',
                          fontSize: '0.75rem',
                          '&:hover': {
                            bgcolor: '#f50057',
                          },
                        }}
                      >
                        Edit Product
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusinessProfile;
