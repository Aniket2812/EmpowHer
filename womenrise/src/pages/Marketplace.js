import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Avatar,
  Paper,
  InputBase,
  FormGroup,
  Rating,
  IconButton,
  FormControlLabel,
  Checkbox,
  Slider,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Search, ShoppingCart, Delete } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const productsData = [
  {
    id: '1',
    name: 'Handwoven Silk Saree',
    description: 'Traditional handwoven pure silk saree with intricate zari work and heritage motifs',
    price: 8499,
    image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTQrHw_goC8SahclmRoAe3a0j-RA1tTaWKeT5BrXLBaKbt3ZlBM75qvKa4OWcicIJx-Gva9Ra5Vs_uLLLTm0hJ1VBsLOqg45vw4VMyvJYXeCIPD5VCOX44hPw&usqp=CAE',
    category: 'Textiles',
    region: 'South India',
    rating: 4.8,
    seller: {
      name: 'Kanchipuram Weavers Collective',
      avatar: '/api/placeholder/40/40',
      location: 'Tamil Nadu'
    }
  },
  {
    id: '2',
    name: 'Brass Wall Decor',
    description: 'Handcrafted brass wall hanging with traditional Dhokra art techniques',
    price: 3999,
    image: 'https://m.media-amazon.com/images/I/51n7BjVHJtL.AC_UF894,1000_QL80.jpg',
    category: 'Home Decor',
    region: 'East India',
    rating: 4.6,
    seller: {
      name: 'Bengal Artisan Hub',
      avatar: '/api/placeholder/40/40',
      location: 'West Bengal'
    }
  },
  {
    id: '3',
    name: 'Silver Filigree Earrings',
    description: 'Intricately crafted pure silver filigree earrings with traditional design',
    price: 2499,
    image: 'https://m.media-amazon.com/images/I/61lpprjJ3iL.AC_UY1100.jpg',
    category: 'Jewelry',
    region: 'East India',
    rating: 4.9,
    seller: {
      name: 'Odisha Silver Crafts',
      avatar: '/api/placeholder/40/40',
      location: 'Odisha'
    }
  },
  {
    id: '4',
    name: 'Handloom Cotton Saree',
    description: 'Pure cotton handloom saree with traditional weaving patterns',
    price: 2999,
    image: 'https://m.media-amazon.com/images/I/91l89dvO+wL.AC_UY1100.jpg',
    category: 'Textiles',
    region: 'East India',
    rating: 4.7,
    seller: {
      name: 'Bengali Tantuja',
      avatar: '/api/placeholder/40/40',
      location: 'West Bengal'
    }
  },
  {
    id: '5',
    name: 'Madhubani Painting',
    description: 'Traditional Madhubani painting on handmade paper with natural colors',
    price: 3499,
    image: 'https://m.media-amazon.com/images/I/71FD63Zb3KL.jpg',
    category: 'Art',
    region: 'North India',
    rating: 4.6,
    seller: {
      name: 'Bihar Art Collective',
      avatar: '/api/placeholder/40/40',
      location: 'Bihar'
    }
  },
  {
    id: '6',
    name: 'Block Print Bedsheet',
    description: 'Hand block printed cotton bedsheet with traditional motifs',
    price: 1999,
    image: 'https://m.media-amazon.com/images/I/A1bQRIy6ZEL.jpg',
    category: 'Home Decor',
    region: 'West India',
    rating: 4.8,
    seller: {
      name: 'Desert Crafts',
      avatar: '/api/placeholder/40/40',
      location: 'Rajasthan'
    }
  },
  {
    id: '7',
    name: 'Bamboo Craft Set',
    description: 'Handcrafted bamboo decorative items and utility products',
    price: 1299,
    image: 'https://m.media-amazon.com/images/I/51W-cSgmi-L.AC_UF894,1000_QL80.jpg',
    category: 'Handicrafts',
    region: 'Northeast India',
    rating: 4.9,
    seller: {
      name: 'Northeast Artisans',
      avatar: '/api/placeholder/40/40',
      location: 'Assam'
    }
  },
  {
    id: '8',
    name: 'Chanderi Dupatta',
    description: 'Traditional Chanderi silk-cotton dupatta with zari border',
    price: 1499,
    image: 'https://m.media-amazon.com/images/I/81OkYNOJUnL.AC_UY1100.jpg',
    category: 'Fashion',
    region: 'Central India',
    rating: 4.7,
    seller: {
      name: 'Bundelkhand Weavers',
      avatar: '/api/placeholder/40/40',
      location: 'Madhya Pradesh'
    }
  },
  {
    id: '9',
    name: 'Dokra Art Piece',
    description: 'Traditional metal craft figurine using lost-wax casting technique',
    price: 4999,
    image: 'https://m.media-amazon.com/images/I/81MwEBgAY8L.jpg',
    category: 'Art',
    region: 'East India',
    rating: 4.8,
    seller: {
      name: 'Bastar Art Collective',
      avatar: '/api/placeholder/40/40',
      location: 'Chhattisgarh'
    }
  },
  {
    id: '10',
    name: 'Pashmina Shawl',
    description: 'Pure Pashmina wool shawl with traditional Kashmiri embroidery',
    price: 7999,
    image: 'https://m.media-amazon.com/images/I/71Wg5Hg0cEL.AC_UF894,1000_QL80.jpg',
    category: 'Fashion',
    region: 'North India',
    rating: 4.9,
    seller: {
      name: 'Kashmir Craft House',
      avatar: '/api/placeholder/40/40',
      location: 'Kashmir'
    }
  },
  {
    id: '11',
    name: 'Phulkari Dupatta',
    description: 'Traditional Punjabi embroidered dupatta with mirror work',
    price: 2299,
    image: 'https://m.media-amazon.com/images/I/71Yc6UAbK7L.AC_UY1100.jpg',
    category: 'Fashion',
    region: 'North India',
    rating: 4.7,
    seller: {
      name: 'Punjab Handicrafts',
      avatar: '/api/placeholder/40/40',
      location: 'Punjab'
    }
  },
  {
    id: '12',
    name: 'Kalamkari Wall Art',
    description: 'Hand-painted Kalamkari art piece on natural-dyed fabric',
    price: 2899,
    image: 'https://m.media-amazon.com/images/I/71b674804bL.jpg',
    category: 'Art',
    region: 'South India',
    rating: 4.8,
    seller: {
      name: 'Andhra Artisans',
      avatar: '/api/placeholder/40/40',
      location: 'Andhra Pradesh'
    }
  },
  {
    id: '13',
    name: 'Rogan Art Piece',
    description: 'Traditional Rogan hand-painted textile art from Kutch',
    price: 5999,
    image: 'https://m.media-amazon.com/images/I/A1AoaHzbbeL.jpg',
    category: 'Art',
    region: 'West India',
    rating: 4.9,
    seller: {
      name: 'Kutch Kala Kendra',
      avatar: '/api/placeholder/40/40',
      location: 'Gujarat'
    }
  },
  {
    id: '14',
    name: 'Bidri Vase',
    description: 'Traditional Bidri craft metal vase with silver inlay work',
    price: 6499,
    image: 'https://m.media-amazon.com/images/I/81JJbTXPpOL.AC_UF894,1000_QL80.jpg',
    category: 'Home Decor',
    region: 'South India',
    rating: 4.8,
    seller: {
      name: 'Bidar Crafts Collective',
      avatar: '/api/placeholder/40/40',
      location: 'Karnataka'
    }
  },
  {
    id: '15',
    name: 'Chikankari Kurta',
    description: 'Hand-embroidered cotton kurta with traditional Chikankari work',
    price: 2799,
    image: 'https://m.media-amazon.com/images/I/71r7Xl1D-xL.AC_UY1100.jpg',
    category: 'Fashion',
    region: 'North India',
    rating: 4.7,
    seller: {
      name: 'Lucknow Textile Arts',
      avatar: '/api/placeholder/40/40',
      location: 'Uttar Pradesh'
    }
  }
];

const Marketplace = () => {
  const { currentUser } = useAuth();
  const [products] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [cartAnchorEl, setCartAnchorEl] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, { ...product, cartId: Date.now() }]);
    setSnackbar({
      open: true,
      message: `${product.name} added to cart`,
      severity: 'success'
    });
  };

  const handleRemoveFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    setSnackbar({
      open: true,
      message: 'Order placed successfully!',
      severity: 'success'
    });
    setCartItems([]);
    setCartAnchorEl(null);
  };

  const handleCartClick = (event) => {
    setCartAnchorEl(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchorEl(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  const filterProducts = () => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(product.region);
      
      return matchesSearch && matchesPrice && matchesCategory && matchesRegion;
    });

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [searchQuery, priceRange, selectedCategories, selectedRegions]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Marketplace
      </Typography>

      {/* Search Bar */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', flex: 1 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <Search />
          </IconButton>
          </Paper>
        <IconButton onClick={handleCartClick} color="primary">
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Box>
      <Menu
        anchorEl={cartAnchorEl}
        open={Boolean(cartAnchorEl)}
        onClose={handleCartClose}
        PaperProps={{
          sx: {
            width: 320,
            maxHeight: 400,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Shopping Cart</Typography>
          {cartItems.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Your cart is empty
            </Typography>
          ) : (
            <>
              <List>
                {cartItems.map((item) => (
                  <ListItem key={item.cartId} divider>
                    <ListItemText
                      primary={item.name}
                      secondary={`₹${item.price}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveFromCart(item.cartId)}
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Total: ₹{cartItems.reduce((sum, item) => sum + item.price, 0)}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{ mt: 1 }}
                >
                  Checkout
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Menu>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Main Content Grid */}
      <Grid container spacing={3}>
        {/* Filters Section */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: 'sticky', top: 20, bgcolor: 'background.paper', borderRadius: 1, p: 2 }}>
            {/* Price Range */}
            <FilterSection>
              <Typography variant="h6" gutterBottom>
                Price Range
              </Typography>
              <Box sx={{ px: 2 }}>
                <Slider
                  value={priceRange}
                  onChange={(e, newValue) => setPriceRange(newValue)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={10000}
                  step={500}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2">₹{priceRange[0]}</Typography>
                  <Typography variant="body2">₹{priceRange[1]}</Typography>
                </Box>
              </Box>
            </FilterSection>

            {/* Categories */}
            <FilterSection>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <FormGroup>
                {['Handicrafts', 'Textiles', 'Jewelry', 'Home Decor', 'Art', 'Fashion', 'Food', 'Beauty', 'Wellness'].map((category) => (
                  <FormControlLabel
                    key={category}
                    control={
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onChange={() => {
                          if (selectedCategories.includes(category)) {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          } else {
                            setSelectedCategories([...selectedCategories, category]);
                          }
                        }}
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">{category}</Typography>}
                  />
                ))}
              </FormGroup>
            </FilterSection>

            {/* Regions */}
            <FilterSection>
              <Typography variant="h6" gutterBottom>
                Region
              </Typography>
              <FormGroup>
                {['North India', 'South India', 'East India', 'West India', 'Central India', 'Northeast India'].map((region) => (
                  <FormControlLabel
                    key={region}
                    control={
                      <Checkbox
                        checked={selectedRegions.includes(region)}
                        onChange={() => {
                          if (selectedRegions.includes(region)) {
                            setSelectedRegions(selectedRegions.filter(r => r !== region));
                          } else {
                            setSelectedRegions([...selectedRegions, region]);
                          }
                        }}
                        size="small"
                      />
                    }
                    label={<Typography variant="body2">{region}</Typography>}
                  />
                ))}
              </FormGroup>
            </FilterSection>
          </Box>
        </Grid>

        {/* Products Grid */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    borderRadius: 2,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                      sx={{ 
                        objectFit: 'cover',
                        borderRadius: '8px 8px 0 0'
                      }}
                    />
                    {/* Seller info overlay */}
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: 0,
                      left: 0,
                      right: 0,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Avatar 
                        src={product.seller.avatar} 
                        sx={{ width: 28, height: 28, mr: 1 }}
                      />
                      <Typography variant="subtitle2">
                        {product.seller.name}
                      </Typography>
                    </Box>
                  </Box>

                  <CardContent sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1,
                    p: 2 
                  }}>
                    <Typography variant="h6" component="h2" sx={{ 
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      lineHeight: '1.3em',
                    }}>
                      {product.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ 
                      lineHeight: '1.2em',
                    }}>
                      {product.description}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
                      <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {product.seller.location}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ 
                    p: 2, 
                    pt: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      ₹{product.price}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => handleAddToCart(product)}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        px: 2
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Marketplace;