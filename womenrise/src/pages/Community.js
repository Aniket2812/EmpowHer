import React, { useEffect, useState } from 'react';
import {
  Container, Grid, Typography, Box, Button, Card, CardContent, 
  Avatar, TextField, Chip, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, CardMedia, CardActions,
  Paper, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Divider, InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Add as AddIcon, 
  Favorite as FavoriteIcon, 
  FavoriteBorder as FavoriteBorderIcon,
  Comment as CommentIcon, 
  Share as ShareIcon,
  Label as LabelIcon,
  TrendingUp as TrendingIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  FilterList as FilterIcon,
  Search as SearchIcon,
  NewReleases as NewIcon,
  WhatshotOutlined as PopularIcon
} from '@mui/icons-material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useAuth } from '../contexts/AuthContext';

const FilterSection = styled(Paper)(({ theme }) => ({
  position: 'sticky',
  top: theme.spacing(2),
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const PostCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(255, 77, 141, 0.1)',
  },
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
  color: 'white',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  },
}));

const Community = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: '' });
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [savedPosts, setSavedPosts] = useState(new Set());

  // Sample tags with categories
  const tagCategories = {
    'Business': ['StartUp', 'Business Growth', 'Marketing', 'E-commerce', 'Sales'],
    'Finance': ['Funding', 'Investment', 'Financial Planning', 'Crowdfunding'],
    'Skills': ['Leadership', 'Management', 'Public Speaking', 'Negotiation'],
    'Industry': ['Tech', 'Fashion', 'Food', 'Retail', 'Healthcare'],
    'Development': ['Personal Growth', 'Mentorship', 'Networking', 'Work-Life Balance']
  };

  // Extended sample posts
  const samplePosts = [
    {
      id: 1,
      author: 'Priya Sharma',
      title: 'How I Scaled My Handloom Business During the Pandemic',
      content: 'When COVID-19 hit, I had to quickly pivot my traditional handloom business to an online model. Here is how I managed to not just survive but thrive: 1) Digital transformation of our catalog, 2) Social media marketing focus, 3) Virtual exhibitions...',
      tags: ['Business Growth', 'E-commerce', 'Traditional Crafts'],
      likes: 245,
      comments: 56,
      image: 'https://www.thefinancialworld.com/wp-content/uploads/2024/07/Handloom-industry-in-Panipat-needs-tax-free-raw-material-to-compete-industry-in-China.jpg',
      authorAvatar: 'https://picsum.photos/seed/priya/40/40',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      author: 'Meera Patel',
      title: 'Securing Your First Round of Funding: A Complete Guide',
      content: 'After successfully raising ₹50L for my EdTech startup, I wanted to share my learnings with the community. Here are the key steps to secure your first funding...',
      tags: ['Funding', 'StartUp', 'EdTech'],
      likes: 189,
      comments: 42,
      image: 'https://unfolded.venturra.com/content/images/size/w2000/2023/05/Unfolded--50-.png',
      authorAvatar: 'https://picsum.photos/seed/meera/40/40',
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      author: 'Dr. Ritu Verma',
      title: 'Breaking Into Healthcare Tech: My Journey',
      content: 'Transitioning from practicing medicine to founding a healthtech startup was challenging. Here is my experience and key insights for aspiring healthcare entrepreneurs...',
      tags: ['Healthcare', 'Tech', 'StartUp'],
      likes: 312,
      comments: 73,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPskAFMYH0n7XbjolEoTIdWBOBa8PFA0rBYA&s',
      authorAvatar: 'https://picsum.photos/seed/ritu/40/40',
      timestamp: '6 hours ago'
    },
    {
      id: 4,
      author: 'Zara Sheikh',
      title: 'Sustainable Fashion: Building a Conscious Brand',
      content: 'Creating a sustainable fashion brand requires more than just eco-friendly materials. Here is how we built our supply chain and marketing strategy...',
      tags: ['Fashion', 'Sustainability', 'Marketing'],
      likes: 178,
      comments: 45,
      image: 'https://www.ecoideaz.com/wp-content/uploads/2022/07/Sustainable-fashion-categories.jpg',
      authorAvatar: 'https://picsum.photos/seed/zara/40/40',
      timestamp: '8 hours ago'
    },
    {
      id: 5,
      author: 'Anjali Singh',
      title: 'Work-Life Balance as a Mom Entrepreneur',
      content: 'Managing a growing business while raising two kids has taught me valuable lessons about time management and prioritization...',
      tags: ['Work-Life Balance', 'Personal Growth', 'Management'],
      likes: 423,
      comments: 89,
      image: 'https://i0.wp.com/newmodernmom.com/wp-content/uploads/2023/11/2.jpg?resize=960%2C960&ssl=1',
      authorAvatar: 'https://picsum.photos/seed/anjali/40/40',
      timestamp: '12 hours ago'
    },
    {
      id: 6,
      author: 'Sarah Khan',
      title: 'Building a Personal Brand on LinkedIn',
      content: 'Your personal brand is crucial for business growth. Here is my strategy for building an authentic and engaging presence on LinkedIn...',
      tags: ['Personal Brand', 'Marketing', 'Networking'],
      likes: 267,
      comments: 52,
      image: 'https://media.licdn.com/dms/image/v2/C4D12AQFoOjo0A6scHA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1615998776418?e=2147483647&v=beta&t=svbjJwa96c3sNgohltSkuf-Z6fRBwEkjs7SkEkUVTE4',
      authorAvatar: 'https://picsum.photos/seed/sarah/40/40',
      timestamp: '1 day ago'
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
    setPosts(samplePosts);
  }, []);

  const handleNewPost = () => {
    const postTags = newPost.tags.split(',').map(tag => tag.trim());
    const post = {
      id: posts.length + 1,
      author: currentUser?.displayName || 'Anonymous',
      title: newPost.title,
      content: newPost.content,
      tags: postTags,
      likes: 0,
      comments: 0,
      image: `https://picsum.photos/seed/${newPost.title}/400/300`,
      authorAvatar: currentUser?.photoURL || `https://picsum.photos/seed/${currentUser?.uid || 'anon'}/40/40`,
      timestamp: 'Just now'
    };
    setPosts([post, ...posts]);
    setOpen(false);
    setNewPost({ title: '', content: '', tags: '' });
  };

  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const filteredPosts = posts
    .filter(post => {
      const matchesTags = selectedTags.length === 0 || 
        post.tags.some(tag => selectedTags.includes(tag));
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTags && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        return b.likes - a.likes;
      }
      // Default to latest
      return b.id - a.id;
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {/* Left Sidebar - Filters */}
        <Grid item xs={12} md={3}>
          <FilterSection elevation={0}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search posts..."
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <List component="nav">
              <ListItem
                button
                selected={sortBy === 'latest'}
                onClick={() => setSortBy('latest')}
              >
                <ListItemIcon>
                  <NewIcon />
                </ListItemIcon>
                <ListItemText primary="Latest" />
              </ListItem>
              <ListItem
                button
                selected={sortBy === 'popular'}
                onClick={() => setSortBy('popular')}
              >
                <ListItemIcon>
                  <PopularIcon />
                </ListItemIcon>
                <ListItemText primary="Popular" />
              </ListItem>
            </List>
            <Divider sx={{ my: 2 }} />
            {Object.entries(tagCategories).map(([category, tags]) => (
              <Box key={category} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {tags.map(tag => (
                    <TagChip
                      key={tag}
                      label={tag}
                      size="small"
                      onClick={() => handleTagClick(tag)}
                      variant={selectedTags.includes(tag) ? "filled" : "outlined"}
                    />
                  ))}
                </Box>
              </Box>
            ))}
          </FilterSection>
        </Grid>

        {/* Main Content - Posts */}
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
            sx={{ mb: 3 }}
          >
            Share Your Story
          </Button>

          {filteredPosts.map((post) => (
            <PostCard key={post.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar src={post.authorAvatar} sx={{ mr: 1 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {post.author}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {post.timestamp}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {post.content}
                </Typography>
                {post.image && (
                  <CardMedia
                    component="img"
                    image={post.image}
                    alt={post.title}
                    sx={{ 
                      borderRadius: 1,
                      mb: 2,
                      maxHeight: 300,
                      objectFit: 'cover'
                    }}
                  />
                )}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                  {post.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      onClick={() => handleTagClick(tag)}
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <IconButton 
                  onClick={() => handleLike(post.id)}
                  color={likedPosts.has(post.id) ? "primary" : "default"}
                >
                  {likedPosts.has(post.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography variant="caption" sx={{ mr: 2 }}>
                  {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                </Typography>
                <IconButton>
                  <CommentIcon />
                </IconButton>
                <Typography variant="caption" sx={{ mr: 2 }}>
                  {post.comments}
                </Typography>
                <IconButton>
                  <ShareIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton 
                  onClick={() => handleSave(post.id)}
                  color={savedPosts.has(post.id) ? "primary" : "default"}
                >
                  {savedPosts.has(post.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </CardActions>
            </PostCard>
          ))}
        </Grid>

        {/* Right Sidebar - Trending */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, position: 'sticky', top: 16 }}>
            <Typography variant="h6" gutterBottom>
              Trending Topics
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <TrendingIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="#WomenInTech" 
                  secondary="2.5k posts this week"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="#StartupFunding" 
                  secondary="1.8k posts this week"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="#SustainableBusiness" 
                  secondary="1.2k posts this week"
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Suggested Connections
            </Typography>
            <List>
              {[
                { name: 'Neha Gupta', role: 'Tech Founder', avatar: 'https://picsum.photos/seed/neha/40/40' },
                { name: 'Leela Rao', role: 'Angel Investor', avatar: 'https://picsum.photos/seed/leela/40/40' },
                { name: 'Maya Singh', role: 'Business Coach', avatar: 'https://picsum.photos/seed/maya/40/40' }
              ].map((connection) => (
                <ListItem key={connection.name}>
                  <Avatar src={connection.avatar} sx={{ mr: 2 }} />
                  <ListItemText
                    primary={connection.name}
                    secondary={connection.role}
                  />
                  <Button size="small" variant="outlined">
                    Connect
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* New Post Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Share Your Story</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            variant="outlined"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Tags (comma-separated)"
            fullWidth
            variant="outlined"
            value={newPost.tags}
            onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
            helperText="Example: Business Growth, Marketing, Technology"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleNewPost} variant="contained" color="primary">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Community;