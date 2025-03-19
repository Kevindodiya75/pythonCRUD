import React, { useState, useEffect } from 'react';
import { fetchStudents, removeStudent } from '../../../domain/student/student';
import { fetchCourses } from '../../../domain/courses/course'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Snackbar,
  Alert,
  Fade,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Tooltip,
  AppBar,
  Toolbar,
  Skeleton,
  Badge,
  Avatar,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Logout as LogoutIcon,
  People as PeopleIcon
} from '@mui/icons-material';

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, studentId: null, studentName: '' });
  const navigate = useNavigate();

  const loadStudents = async (query = '') => {
    setLoading(true);
    try {
      const data = await fetchStudents(query);
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      showAlert(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  useEffect(() => {
    loadStudents();
    loadCourses();
  }, []);

  const showAlert = (message, severity = 'info') => {
    setAlert({ open: true, message, severity });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    loadStudents(searchQuery);
  };

  const handleEditStudent = (student) => {
    navigate(`/edit-student/${student.id}`, { state: { student } });
  };

  const handleAddNewStudent = () => {
    navigate('/add-student');
  };

  const openDeleteDialog = (student) => {
    setDeleteDialog({
      open: true,
      studentId: student.id,
      studentName: student.name
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, studentId: null, studentName: '' });
  };

  const handleDeleteStudent = async () => {
    try {
      await removeStudent(deleteDialog.studentId);
      showAlert("Student deleted successfully", "success");
      loadStudents();
      closeDeleteDialog();
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.coursename : "No course";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  // Generate random color for avatar based on name
  const getAvatarColor = (name) => {
    const colors = [
      '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2',
      '#c2185b', '#0097a7', '#ff9800', '#5d4037'
    ];

    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }

    return colors[sum % colors.length];
  };

  return (
    <Container maxWidth="lg">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Paper
          elevation={3}
          sx={{
            mt: 5,
            p: 4,
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 3 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h5" component="div" fontWeight="bold">
                <PersonIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Students List
              </Typography>

            </Toolbar>
          </AppBar>

          <Divider sx={{ mb: 3 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNewStudent}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add New Student
            </Button>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ ml: 1 }}
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </Button>
            </form>
          </Box>

          <TableContainer sx={{ borderRadius: 1, overflow: 'hidden' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Student Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody component={motion.tbody} variants={tableVariants} initial="hidden" animate="visible">
                <AnimatePresence>
                  {loading ? (
                    [...Array(5)].map((_, index) => (
                      <TableRow key={`skeleton-${index}`}>
                        <TableCell><Skeleton animation="wave" width={30} /></TableCell>
                        <TableCell><Skeleton animation="wave" width={150} /></TableCell>
                        <TableCell><Skeleton animation="wave" width={200} /></TableCell>
                        <TableCell><Skeleton animation="wave" width={120} /></TableCell>
                        <TableCell align="right"><Skeleton animation="wave" width={120} /></TableCell>
                      </TableRow>
                    ))
                  ) : students.length === 0 ? (
                    <TableRow component={motion.tr} variants={rowVariants}>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body1" color="textSecondary" sx={{ py: 3 }}>
                          No student data available
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    students.map(student => (
                      <TableRow
                        key={student.id}
                        component={motion.tr}
                        variants={rowVariants}
                        exit="exit"
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
                      >
                        <TableCell>
                          <Chip
                            label={student.id}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar
                              sx={{
                                bgcolor: getAvatarColor(student.name),
                                mr: 1,
                                width: 32,
                                height: 32
                              }}
                            >
                              {getInitials(student.name)}
                            </Avatar>
                            {student.name}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                            {student.email}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<SchoolIcon sx={{ color: '#1976d2' }} />}
                            label={typeof student.course === 'string'
                              ? student.course
                              : getCourseName(student.course)
                            }
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Box>
                            <Tooltip title="Edit Student">
                              <IconButton
                                color="primary"
                                onClick={() => handleEditStudent(student)}
                                component={motion.button}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                size="small"
                                sx={{ mr: 1 }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Student">
                              <IconButton
                                color="error"
                                onClick={() => openDeleteDialog(student)}
                                component={motion.button}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                size="small"
                                sx={{
                                  color: 'primary.main',
                                  fontSize: '1.1rem',
                                  '&:hover': {
                                    color: 'primary.dark',
                                  }
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
            open={deleteDialog.open}
            onClose={closeDeleteDialog}
            PaperComponent={motion.div}
            PaperProps={{
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { type: "spring", stiffness: 300, damping: 30 }
            }}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete student <b>{deleteDialog.studentName}</b>? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={closeDeleteDialog}
                color="primary"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDeleteStudent}
                color="error"
                variant="contained"
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={alert.open}
            autoHideDuration={5000}
            onClose={handleCloseAlert}
            TransitionComponent={Fade}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={alert.severity}
              variant="filled"
              elevation={6}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default StudentsList;
