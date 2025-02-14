import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';

const SAMPLE_DATA = {
  totalRevenue: 158499,
  totalOrders: 245,
  averageOrderValue: 647,
  returningCustomerRate: 42.8,
  onlineStoreConversion: 3.2,
  topProducts: [
    { name: 'Handwoven Silk Saree', sales: 45, revenue: 269955 },
    { name: 'Silver Filigree Earrings', sales: 38, revenue: 75962 },
    { name: 'Brass Wall Decor', sales: 32, revenue: 79968 },
    { name: 'Bamboo Craft Set', sales: 28, revenue: 36372 },
    { name: 'Traditional Necklace', sales: 25, revenue: 74975 }
  ],
  monthlyData: Array(12).fill(0).map((_, index) => ({
    month: new Date(2024, index).toLocaleString('default', { month: 'short' }),
    revenue: Math.floor(Math.random() * 50000) + 10000,
    orders: Math.floor(Math.random() * 50) + 10,
    visitors: Math.floor(Math.random() * 1000) + 200
  }))
};

const MetricCard = ({ title, value, trend, trendValue, icon, info }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Typography color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          {title}
          {info && (
            <Tooltip title={info}>
              <IconButton size="small">
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
        {icon}
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {trend === 'up' ? (
            <TrendingUpIcon sx={{ color: 'success.main' }} />
          ) : (
            <TrendingDownIcon sx={{ color: 'error.main' }} />
          )}
          <Typography
            variant="body2"
            color={trend === 'up' ? 'success.main' : 'error.main'}
          >
            {trendValue}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const BusinessDashboard = () => {
  const { currentUser, userData } = useAuth();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [dateRange, setDateRange] = useState('30d');
  const [analyticsData, setAnalyticsData] = useState(SAMPLE_DATA);

  const years = [2023, 2024, 2025];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [currentUser, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  if (!userData?.isBusinessOwner) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="warning">
          You need to be registered as a business owner to access this page.
        </Alert>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ minHeight: '60vh' }}>
          <Grid item xs={12} textAlign="center">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Loading your business analytics...
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert 
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          }
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" component="h1">
              Analytics Overview
            </Typography>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                label="Date Range"
                onChange={handleDateRangeChange}
              >
                <MenuItem value="7d">Last 7 days</MenuItem>
                <MenuItem value="30d">Last 30 days</MenuItem>
                <MenuItem value="90d">Last 90 days</MenuItem>
                <MenuItem value="12m">Last 12 months</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <MetricCard
            title="Total Revenue"
            value={`₹${analyticsData.totalRevenue.toLocaleString()}`}
            trend="up"
            trendValue="12.5% vs last period"
            icon={<ShoppingBagIcon color="primary" />}
            info="Total revenue from all sales in the selected period"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Total Orders"
            value={analyticsData.totalOrders}
            trend="up"
            trendValue="8.2% vs last period"
            icon={<LocalShippingIcon color="primary" />}
            info="Number of orders received in the selected period"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetricCard
            title="Average Order Value"
            value={`₹${analyticsData.averageOrderValue}`}
            trend="down"
            trendValue="3.1% vs last period"
            icon={<InventoryIcon color="primary" />}
            info="Average value per order in the selected period"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Over Time
            </Typography>
            <Box sx={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={analyticsData.monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip 
                    formatter={(value) => `₹${value.toLocaleString()}`}
                    labelStyle={{ color: '#666' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Top Products
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Sales</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analyticsData.topProducts.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">{product.sales}</TableCell>
                      <TableCell align="right">₹{product.revenue.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Customer Insights
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Returning Customer Rate"
                  secondary={`${analyticsData.returningCustomerRate}%`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <TrendingUpIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Online Store Conversion Rate"
                  secondary={`${analyticsData.onlineStoreConversion}%`}
                />
              </ListItem>
            </List>
            <Box sx={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={analyticsData.monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <RechartsTooltip />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BusinessDashboard;
