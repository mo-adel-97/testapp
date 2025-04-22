// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

function Home() {
  const [nationalId, setNationalId] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (nationalId.trim()) {
      navigate(`/${nationalId}`);
    }
  };

  // Animation variant helper
  const dropIn = (delay = 0.2) => ({
    initial: { y: -200, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay, duration: 0.6, type: 'spring' },
  });

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        px: 2,
      }}
    >
      {/* ✅ Left Human */}
      <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' }, textAlign: 'center' }}>
        <motion.div {...dropIn(0.1)} style={{ position: 'absolute', top: -40, left: 50 }}>
          <Paper
            elevation={3}
            sx={{
              px: 2,
              py: 1,
              fontSize: '14px',
              borderRadius: 2,
              backgroundColor: '#e0f7fa',
              color: '#01579b',
              fontWeight: 'bold',
              width: 100,
              textAlign: 'center',
              lineHeight: '25px',
            }}
          >
            وُمعاً لتحقيق النجاح
          </Paper>
        </motion.div>

        <Box>
          <motion.div {...dropIn(0.2)}>
            <Box sx={{ width: 40, height: 40, backgroundColor: '#1976d2', borderRadius: '50%', margin: 'auto' }} />
          </motion.div>

          <motion.div {...dropIn(0.3)}>
            <Box sx={{ width: 10, height: 60, backgroundColor: '#1976d2', margin: 'auto' }} />
          </motion.div>

          <motion.div {...dropIn(0.4)}>
            <Box sx={{ width: 50, height: 6, backgroundColor: '#1976d2', margin: '8px auto', borderRadius: 2 }} />
          </motion.div>

          <motion.div {...dropIn(0.5)}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 30,
                margin: 'auto',
                mt: 1,
              }}
            >
              <Box sx={{ width: 6, height: 30, backgroundColor: '#1976d2' }} />
              <Box sx={{ width: 6, height: 30, backgroundColor: '#1976d2' }} />
            </Box>
          </motion.div>
        </Box>
      </Box>

      {/* ✅ Center Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 500 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'right',
            direction: 'rtl',
            background: '#ffffffee',
            backdropFilter: 'blur(4px)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Box textAlign="center" mb={3}>
            <SearchIcon sx={{ fontSize: 50, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="bold">
              الاستعلام عن بيانات الطالب
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="أدخل الرقم القومي"
            placeholder="مثال: 30102150123462"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiInputBase-input': {
                textAlign: 'right',
                direction: 'rtl',
              },
              '& .MuiInputLabel-root': {
                right: 30,
                left: 'unset',
                transformOrigin: 'right',
              },
              '& .MuiInputLabel-shrink': {
                transform: 'translate(0, -1.5px) scale(0.75)',
              },
            }}
            inputProps={{ dir: 'rtl' }}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleSearch}
            sx={{ fontWeight: 'bold', fontSize: '1rem' }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <SearchIcon sx={{ fontSize: 22 }} />
              بحث
            </Box>
          </Button>
        </Paper>
      </motion.div>

      {/* ✅ Right Human */}
      <Box sx={{ position: 'relative', display: { xs: 'none', md: 'block' }, textAlign: 'center' }}>
        <motion.div {...dropIn(0.1)} style={{ position: 'absolute', top: -50, left: '-250%', transform: 'translateX(-50%)' }}>
          <Paper
            elevation={3}
            sx={{
              px: 2,
              py: 1,
              fontSize: '14px',
              borderRadius: 2,
              backgroundColor: '#fff3e0',
              color: '#ef6c00',
              fontWeight: 'bold',
              width: 100,
              textAlign: 'center',
              lineHeight: 1.8,
            }}
          >
            أهلاً بكم في المعهد السعودي
          </Paper>
        </motion.div>

        <Box>
          <motion.div {...dropIn(0.2)}>
            <Box sx={{ width: 40, height: 40, backgroundColor: '#ef6c00', borderRadius: '50%', margin: '0 auto' }} />
          </motion.div>

          <motion.div {...dropIn(0.3)}>
            <Box sx={{ width: 10, height: 60, backgroundColor: '#ef6c00', margin: 'auto' }} />
          </motion.div>

          <motion.div {...dropIn(0.4)}>
            <Box sx={{ width: 50, height: 6, backgroundColor: '#ef6c00', margin: '8px auto', borderRadius: 2 }} />
          </motion.div>

          <motion.div {...dropIn(0.5)}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: 30,
                margin: 'auto',
                mt: 1,
              }}
            >
              <Box sx={{ width: 6, height: 30, backgroundColor: '#ef6c00' }} />
              <Box sx={{ width: 6, height: 30, backgroundColor: '#ef6c00' }} />
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;
