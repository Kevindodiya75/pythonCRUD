import React, { useState, useEffect } from 'react';
import { fetchCourses, removeCourse } from '../../../domain/courses/course';
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
  Avatar,
  Divider,
  TablePagination,
  Badge
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Group as GroupIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, courseId: null, courseName: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const loadCourses = async (query = '') => {
    setLoading(true);
    try {
      const data = await fetchCourses(query);
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      showAlert(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    loadCourses(searchQuery);
  };

  const handleEditCourse = (course) => {
    navigate(`/edit-courses/${course.id}`, { state: { course } });
  };

  const handleAddNewCourse = () => {
    navigate('/add-courses');
  };

  const openDeleteDialog = (course) => {
    setDeleteDialog({
      open: true,
      courseId: course.id,
      courseName: course.courseName || course.coursename
    });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, courseId: null, courseName: '' });
  };

  const handleDeleteCourse = async () => {
    try {
      await removeCourse(deleteDialog.courseId);
      showAlert("Course deleted successfully", "success");
      loadCourses();
      closeDeleteDialog();
    } catch (error) {
      showAlert(error.message, "error");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Courses List
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
              onClick={handleAddNewCourse}
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add New Course
            </Button>
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search courses..."
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
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Course Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Students</TableCell>
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
                        <TableCell><Skeleton animation="wave" width={100} /></TableCell>
                        <TableCell><Skeleton animation="wave" width={70} /></TableCell>
                        <TableCell align="right"><Skeleton animation="wave" width={120} /></TableCell>
                      </TableRow>
                    ))
                  ) : courses.length === 0 ? (
                    <TableRow component={motion.tr} variants={rowVariants}>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body1" color="textSecondary" sx={{ py: 3 }}>
                          No course data available
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    courses
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map(course => (
                        <TableRow
                          key={course.id}
                          component={motion.tr}
                          variants={rowVariants}
                          exit="exit"
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.04)' }}
                        >
                          <TableCell>
                            <Chip
                              label={course.id}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar
                                sx={{
                                  bgcolor: getAvatarColor(course.courseName || course.coursename || ''),
                                  mr: 1,
                                  width: 32,
                                  height: 32
                                }}
                              >
                                {getInitials(course.courseName || course.coursename || '')}
                              </Avatar>
                              {course.courseName || course.coursename}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={course.status || 'active'}
                              size="small"
                              color={course.status === 'inactive' ? 'default' : 'success'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Badge
                                badgeContent={course.students || 0}
                                color="primary"
                                overlap="circular"
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                                }}
                              >
                                <PersonIcon sx={{ mr: 1 }} />
                              </Badge>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Box>
                              <Tooltip title="Edit Course">
                                <IconButton
                                  color="primary"
                                  onClick={() => handleEditCourse(course)}
                                  component={motion.button}
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  size="small"
                                  sx={{ mr: 1 }}
                                >
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete Course">
                                <IconButton
                                  color="error"
                                  onClick={() => openDeleteDialog(course)}
                                  component={motion.button}
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  size="small"
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

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={courses.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

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
                Are you sure you want to delete course <b>{deleteDialog.courseName}</b>? This action cannot be undone.
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
                onClick={handleDeleteCourse}
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

export default CoursesList;
