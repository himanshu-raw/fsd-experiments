import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
  Card,
  CardContent,
  CardActions,
  useTheme
} from '@mui/material';
import {
  Speed,
  Security,
  Devices,
  ArrowForward
} from '@mui/icons-material';

const LandingPage = ({ onGetStarted }) => {
  const theme = useTheme();

  const features = [
    {
      id: 1,
      title: 'Lightning Fast',
      description: 'Experience blazing fast performance with our optimized core engine designed for speed.',
      icon: <Speed fontSize="large" color="primary" />
    },
    {
      id: 2,
      title: 'Secure by Design',
      description: 'Enterprise-grade security built into every layer of the application to protect your data.',
      icon: <Security fontSize="large" color="primary" />
    },
    {
      id: 3,
      title: 'Fully Responsive',
      description: 'Access your dashboard from any device, anywhere. Mobile, tablet, or desktop.',
      icon: <Devices fontSize="large" color="primary" />
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', color: 'text.primary' }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Admin<Box component="span" sx={{ color: 'primary.main' }}>Platform</Box>
          </Typography>
          <Button variant="outlined" color="primary" onClick={onGetStarted} sx={{ borderRadius: 2 }}>
            Login
          </Button>
          <Button variant="contained" color="primary" onClick={onGetStarted} sx={{ ml: 2, borderRadius: 2 }}>
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box sx={{ bgcolor: 'background.default', pt: 8, pb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" fontWeight="bold">
                NEXT GENERATION ADMIN
              </Typography>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="800" sx={{ lineHeight: 1.2 }}>
                Manage Your Business With Confidence
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph sx={{ mb: 4, fontWeight: 400 }}>
                Experience a fully responsive interface designed with Material UI. 
                Seamlessly adaptable to any device size with powerful analytics.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="contained" size="large" onClick={onGetStarted} sx={{ px: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem' }}>
                  Get Started
                </Button>
                <Button variant="outlined" size="large" onClick={onGetStarted} sx={{ px: 4, py: 1.5, borderRadius: 2, fontSize: '1.1rem' }}>
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={6}
                sx={{
                  height: '300px',
                  width: '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  borderRadius: 4,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
                }}
              >
                <Box textAlign="center">
                  <Devices sx={{ fontSize: 100, opacity: 0.8 }} />
                  <Typography variant="h4" sx={{ mt: 2, fontWeight: 600 }}>Responsive Dashboard</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

     

      {/* Footer */}
      <Box component="footer" sx={{ py: 6, bgcolor: 'text.primary', color: 'background.paper', mt: 'auto' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                AdminPlatform
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © {new Date().getFullYear()} AdminPlatform. All rights reserved.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Product</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }}>Features</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }}>Pricing</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }}>Support</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Company</Typography>
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2" sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }}>About Us</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }}>Careers</Typography>
                <Typography variant="body2" sx={{ cursor: 'pointer', opacity: 0.7, '&:hover': { opacity: 1 } }}>Contact</Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
