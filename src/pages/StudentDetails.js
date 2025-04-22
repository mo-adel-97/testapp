// src/pages/StudentDetails.js
import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container, Typography, Box, Table, TableHead,
  TableRow, TableCell, TableBody, Paper, Grid, Divider, Skeleton
} from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { motion } from 'framer-motion';

function StudentDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const phrases = [
    'أهلاً بكم في المعهد السعودي',
    'معنا ستصل إلى الأمام',
    'بالعلم نرتقي',
    'كن واثقاً، النجاح ينتظرك',
    'الاجتهاد طريقك للتميز'
  ];

  // Generate right/left floating signs
  const floatingSigns = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const text = phrases[Math.floor(Math.random() * phrases.length)];
      const isRight = Math.random() > 0.5;
      const side = isRight ? 'right' : 'left';
      const delay = Math.random() * 6;
      const duration = 5 + Math.random() * 5;

      return (
        <motion.div
          key={i}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: '110vh', opacity: [0.3, 0.8, 0] }}
          transition={{
            delay,
            duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            position: 'absolute',
            [side]: '5%',
            fontSize: '16px',
            backgroundColor: '#fff',
            color: '#1976d2',
            padding: '10px 18px',
            borderRadius: '12px',
            border: '2px solid #1976d2',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {text}
        </motion.div>
      );
    });
  }, [phrases]);

  useEffect(() => {
    fetch(`https://5a05-143-92-149-87.ngrok-free.app/api/student/get-student-data/${id}`, {
      headers: { 'ngrok-skip-browser-warning': 'true' },
    })
      .then(async (res) => {
        const contentType = res.headers.get('content-type');
        if (!res.ok || !contentType?.includes('application/json')) {
          throw new Error('Invalid JSON');
        }
        const json = await res.json();
        setData(json);
      })
      .catch((err) => {
        console.error(err);
        setData({ error: 'تعذر تحميل البيانات. تأكد من الرقم القومي أو الرابط.' });
      });
  }, [id]);

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} dir="rtl">
        <Skeleton variant="rectangular" width="100%" height={300} />
      </Container>
    );
  }

  if (data?.error) {
    return (
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="error">{data.error}</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', bgcolor: '#fefefe' }}>
      {/* Raining sentence signs on left/right */}
      {floatingSigns}

      <Container maxWidth="md" dir="rtl" sx={{ py: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ width: '100%' }}
        >
          <Box mb={4} textAlign="center">
            <AssignmentIndIcon sx={{ fontSize: 50, color: 'primary.main' }} />
            <Typography variant="h4" gutterBottom>
              بيانات الطالب
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#f9f9f9',
              p: 3,
              borderRadius: 2,
              boxShadow: 1,
              fontSize: '1rem',
              mb: 4,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><strong>الاسم:</strong> {data.name}</Grid>
              <Grid item xs={12} sm={6}><strong> رقم الهوية:</strong> {data.nationalId}</Grid>
              <Grid item xs={12} sm={6}><strong>المدينة:</strong> {data.city}</Grid>
              <Grid item xs={12} sm={6}><strong>الفرع:</strong> {data.branch}</Grid>
              <Grid item xs={12} sm={6}><strong>البرنامج:</strong> {data.diploma}</Grid>
              <Grid item xs={12} sm={6}><strong>المستوى:</strong> {data.level}</Grid>
              <Grid item xs={12} sm={6}><strong>الشعبة:</strong> {data.division}</Grid>
              <Grid item xs={12} sm={6}><strong>الدفعة:</strong> {data.batch}</Grid>
            </Grid>
          </Box>

          <Divider sx={{ mb: 4 }} />

          <Box mb={2} textAlign="center">
            <MenuBookIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h5" color="secondary">
              جدول الامتحانات الخاص بك
            </Typography>
          </Box>

          <Paper elevation={3}>
            <Table>
              <TableHead sx={{ backgroundColor: '#1976d2' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>المادة</TableCell>
                  <TableCell sx={{ color: 'white' }}>التاريخ</TableCell>
                  <TableCell sx={{ color: 'white' }}>الوقت</TableCell>
                  <TableCell sx={{ color: 'white' }}>رقم اللجنة</TableCell>
                  <TableCell sx={{ color: 'white' }}>القاعة</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.exams.map((exam, index) => (
                  <TableRow key={index}>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{new Date(exam.examDate).toLocaleDateString('ar-EG')}</TableCell>
                    <TableCell>{exam.examTime}</TableCell>
                    <TableCell>{exam.committeeNumber}</TableCell>
                    <TableCell>{exam.roomNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default StudentDetails;
