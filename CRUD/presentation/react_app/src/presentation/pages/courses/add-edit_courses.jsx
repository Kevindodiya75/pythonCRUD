import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    Snackbar,
    CircularProgress,
    Divider,
    Fade,
    Grid,
    IconButton,
    Breadcrumbs,
    Link
} from '@mui/material';
import {
    Save as SaveIcon,
    Cancel as CancelIcon,
    ArrowBack as ArrowBackIcon,
    Book as BookIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { fetchCourses, addCourse, modifyCourse } from '../../../domain/courses/course';

const CourseForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        coursename: ''
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        // If we're in edit mode and have course data from location state, use it
        if (isEditMode && location.state && location.state.course) {
            const courseData = location.state.course;
            setFormData({
                coursename: courseData.coursename || ''
            });
        } else if (isEditMode) {
            // If we're in edit mode but don't have course data, fetch it
            const fetchCourseData = async () => {
                try {
                    const courses = await fetchCourses();
                    const course = courses.find(c => c.id === parseInt(id));
                    if (course) {
                        setFormData({
                            coursename: course.coursename || ''
                        });
                    } else {
                        showAlert("Course not found", "error");
                        setTimeout(() => navigate('/courses'), 2000);
                    }
                } catch (error) {
                    showAlert(error.message, "error");
                }
            };
            fetchCourseData();
        }
    }, [id, isEditMode, location.state, navigate]);

    const showAlert = (message, severity = 'info') => {
        setAlert({ open: true, message, severity });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            if (isEditMode) {
                await modifyCourse(id, formData.coursename);
                showAlert("Course updated successfully", "success");
            } else {
                await addCourse(formData.coursename);
                showAlert("Course added successfully", "success");
            }

            // Redirect back to courses list after short delay
            setTimeout(() => {
                navigate('/courses');
            }, 2000);
        } catch (error) {
            showAlert(error.message, "error");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCancel = () => {
        navigate('/courses');
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <Container maxWidth="md">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Paper
                    elevation={3}
                    sx={{ mt: 5, p: 4, borderRadius: 2 }}
                    component={motion.div}
                    layoutId="courseForm"
                >
                    <Box sx={{ mb: 3 }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/courses"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <BookIcon sx={{ mr: 0.5 }} fontSize="small" />
                                Courses
                            </Link>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                                {isEditMode ? 'Edit Course' : 'New Course'}
                            </Typography>
                        </Breadcrumbs>
                    </Box>

                    <Box display="flex" alignItems="center" mb={3}>
                        <IconButton
                            color="primary"
                            component={motion.button}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleCancel}
                            sx={{ mr: 2 }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h5" component="h1" fontWeight="bold">
                            {isEditMode ? 'Update Course' : 'Add New Course'}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} component={motion.div} variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    id="coursename"
                                    name="coursename"
                                    label="Course Name"
                                    variant="outlined"
                                    value={formData.coursename}
                                    onChange={handleInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: <BookIcon color="action" sx={{ mr: 1 }} />,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} component={motion.div} variants={itemVariants}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 2,
                                        mt: 2
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={handleCancel}
                                        startIcon={<CancelIcon />}
                                        component={motion.button}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        disabled={submitLoading}
                                        startIcon={submitLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                                        component={motion.button}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {submitLoading ? 'Processing...' : isEditMode ? 'Update Course' : 'Add Course'}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </motion.div>

            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                TransitionComponent={Fade}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity={alert.severity}
                    variant="filled"
                    elevation={6}
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CourseForm;
