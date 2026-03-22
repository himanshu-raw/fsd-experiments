import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Grid,
  Chip,
  Paper,
  Container,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import spotifyTracks from '../data/spotifyTracks.json';

const TracksBrowser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('duration');

  const filteredAndSortedTracks = useMemo(() => {
    let filtered = spotifyTracks.filter((track) => {
      const query = searchQuery.toLowerCase();
      return (
        track.name.toLowerCase().includes(query) ||
        track.artists.toLowerCase().includes(query)
      );
    });

    // Sort tracks
    if (sortBy === 'duration-asc') {
      filtered.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === 'duration-desc') {
      filtered.sort((a, b) => b.duration - a.duration);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [searchQuery, sortBy]);

  const avgDuration = useMemo(() => {
    if (filteredAndSortedTracks.length === 0) return 0;
    const total = filteredAndSortedTracks.reduce((sum, track) => sum + track.duration, 0);
    return Math.round(total / filteredAndSortedTracks.length);
  }, [filteredAndSortedTracks]);

  const totalDuration = useMemo(() => {
    return filteredAndSortedTracks.reduce((sum, track) => sum + track.duration, 0);
  }, [filteredAndSortedTracks]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <MusicNoteIcon sx={{ fontSize: 32, color: '#1DB954' }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1f1f1f' }}>
            Spotify Long Tracks Browser
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Browse and search from a curated collection of long-duration Spotify tracks
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: '#f7f7f7' }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Search by track name or artist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#1DB954' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Sort By"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              SelectProps={{
                native: true,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                },
              }}
            >
              <option value="duration">Duration (Longest First)</option>
              <option value="duration-asc">Duration (Shortest First)</option>
              <option value="duration-desc">Duration (Longest First)</option>
              <option value="name">Name (A-Z)</option>
            </TextField>
          </Grid>
        </Grid>

        {/* Statistics */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Chip
            label={`${filteredAndSortedTracks.length} Tracks`}
            color="primary"
            variant="outlined"
            icon={<MusicNoteIcon />}
          />
          <Chip
            label={`Avg Duration: ${avgDuration}m`}
            variant="outlined"
          />
          <Chip
            label={`Total: ${totalDuration}m`}
            variant="outlined"
          />
        </Box>
      </Paper>

      {/* Tracks Grid */}
      {filteredAndSortedTracks.length > 0 ? (
        <Grid container spacing={2}>
          {filteredAndSortedTracks.map((track) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={track.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(29, 185, 84, 0.2)',
                    borderTop: '3px solid #1DB954',
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Track Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: '#1f1f1f',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 0.5,
                        }}
                      >
                        {track.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Duration Badge */}
                  <Box sx={{ mb: 1.5 }}>
                    <Chip
                      label={`${track.duration} minutes`}
                      size="small"
                      sx={{
                        backgroundColor: '#1DB954',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>

                  {/* Artist */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      mb: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    <strong>By:</strong> {track.artists}
                  </Typography>

                  {/* Track ID */}
                  <Typography variant="caption" sx={{ color: '#999' }}>
                    ID: {track.id.substring(0, 12)}...
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: '#f7f7f7',
          }}
        >
          <Typography variant="h6" sx={{ color: '#999', mb: 2 }}>
            No tracks found matching your search
          </Typography>
          <Typography variant="body2" sx={{ color: '#bbb' }}>
            Try adjusting your search terms
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default TracksBrowser;
