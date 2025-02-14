import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Paper,
  Tabs,
  Tab,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Search,
  PlayCircleOutline,
  Article,
  LocalLibrary,
  Bookmark,
  Share,
  Star,
  AccessTime,
  Language,
  Brush,
  ColorLens,
  Construction,
  Restaurant,
  Store,
  Computer
} from '@mui/icons-material';

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'handicrafts', label: 'Handicrafts', icon: <Brush /> },
  { id: 'textiles', label: 'Textiles & Fashion', icon: <ColorLens /> },
  { id: 'culinary', label: 'Culinary Arts', icon: <Restaurant /> },
  { id: 'business', label: 'Business Skills', icon: <Store /> },
  { id: 'digital', label: 'Digital Skills', icon: <Computer /> },
];

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: alpha(theme.palette.background.paper, 0.9),
  backdropFilter: 'blur(8px)',
}));

const resources = [
  {
    id: 1,
    title: 'Traditional Zardozi Embroidery Masterclass',
    description: 'Learn the royal art of Zardozi embroidery, a traditional Indian technique using gold and silver threads. Perfect for creating luxurious ethnic wear and accessories.',
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/12/368502387/XG/MW/YO/2627819/traditional-zardozi-work-500x500.jpg',
    category: 'handicrafts',
    duration: '8 weeks',
    language: 'Hindi, English',
    rating: 4.8,
    students: 1250,
    type: 'course'
  },
  {
    id: 2,
    title: 'Handloom Weaving: From Basics to Business',
    description: 'Master the art of handloom weaving and learn how to turn your skills into a successful business. Covers traditional patterns, modern designs, and market strategies.',
    image: 'https://soojidaara.in/cdn/shop/articles/handloom.jpg?v=1722429989',
    category: 'textiles',
    duration: '12 weeks',
    language: 'Hindi, English, Tamil',
    rating: 4.9,
    students: 890,
    type: 'course'
  },
  {
    id: 3,
    title: 'Modern Block Printing Workshop',
    description: 'Combine traditional Indian block printing techniques with contemporary designs. Learn fabric preparation, color mixing, and pattern creation.',
    image: 'https://media.craftmaestros.com/media/magefan_blog/what_is_block_printing.png',
    category: 'textiles',
    duration: '6 weeks',
    language: 'Hindi, English',
    rating: 4.7,
    students: 750,
    type: 'course'
  },
  {
    id: 4,
    title: 'Regional Indian Cuisine Mastery',
    description: 'Explore the diverse culinary traditions of India. Learn authentic recipes, spice blending, and food presentation for catering and restaurant businesses.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_26NFN793LXBqiFa_mkRazfvNqJi3kClNw&s',
    category: 'culinary',
    duration: '10 weeks',
    language: 'Hindi, English',
    rating: 4.9,
    students: 2100,
    type: 'course'
  },
  {
    id: 5,
    title: 'Digital Marketing for Artisans',
    description: 'Learn how to showcase and sell your handicrafts online. Covers social media marketing, e-commerce platforms, and photography basics.',
    image: 'https://alokya.com/cdn/shop/articles/the-impact-of-digitisation-on-indian-artisans-787072.jpg?v=1727234329&width=2048',
    category: 'digital',
    duration: '4 weeks',
    language: 'Hindi, English',
    rating: 4.6,
    students: 1580,
    type: 'course'
  },
  {
    id: 6,
    title: 'Sustainable Fashion Design',
    description: 'Create eco-friendly fashion using traditional Indian textiles and techniques. Learn about sustainable practices, upcycling, and ethical fashion business.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHcH1QHACkgRZmq_UHE2S0F4M606ONXVtdvw&s',
    category: 'textiles',
    duration: '8 weeks',
    language: 'Hindi, English',
    rating: 4.8,
    students: 920,
    type: 'course'
  },
  {
    id: 7,
    title: 'Business Management for Craftpreneurs',
    description: 'Essential business skills for artisans and crafters. Learn pricing, inventory management, marketing, and financial planning.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1ul6kgsKBfWrkapMaAjYyqfnAJEoQKzvSrg&s',
    category: 'business',
    duration: '6 weeks',
    language: 'Hindi, English',
    rating: 4.7,
    students: 1340,
    type: 'course'
  },
  {
    id: 8,
    title: 'Traditional Jewelry Making',
    description: 'Learn the art of making traditional Indian jewelry using various techniques like Kundan, Meenakari, and Filigree work.',
    image: 'https://zangfai.in/image/catalog/parallax/104.jpg',
    category: 'handicrafts',
    duration: '10 weeks',
    language: 'Hindi, English',
    rating: 4.9,
    students: 670,
    type: 'course'
  }
];

const Resources = () => {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Learn Traditional Skills & Crafts
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Discover courses in traditional Indian handicrafts, textiles, and business skills
        </Typography>
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 4,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
          backdropFilter: 'blur(8px)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search courses and resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.label}
                  icon={category.icon}
                  onClick={() => setSelectedCategory(category.id)}
                  color={selectedCategory === category.id ? 'primary' : 'default'}
                  variant={selectedCategory === category.id ? 'filled' : 'outlined'}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredResources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource.id}>
            <StyledCard>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={resource.image}
                  alt={resource.title}
                />
                <CategoryChip
                  label={categories.find(cat => cat.id === resource.category)?.label}
                  icon={categories.find(cat => cat.id === resource.category)?.icon}
                />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {resource.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {resource.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTime sx={{ fontSize: 20, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {resource.duration}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Language sx={{ fontSize: 20, mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {resource.language}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ color: theme.palette.warning.main, mr: 0.5 }} />
                    <Typography variant="body2" fontWeight="bold">
                      {resource.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({resource.students} students)
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<PlayCircleOutline />}
                  >
                    Start Learning
                  </Button>
                  <IconButton size="small" sx={{ border: 1, borderColor: 'divider' }}>
                    <Bookmark />
                  </IconButton>
                  <IconButton size="small" sx={{ border: 1, borderColor: 'divider' }}>
                    <Share />
                  </IconButton>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Resources;
