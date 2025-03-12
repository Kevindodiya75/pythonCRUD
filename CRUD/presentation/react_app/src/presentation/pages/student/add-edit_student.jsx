import { addStudent, modifyStudent } from '../../../domain/student/student';
import { fetchCourses } from '../../../domain/courses/course';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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
    School as SchoolIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

const StudentForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const isEditMode = !!id;

    const [courses, setCourses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        course: ''
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            try {
                const data = await fetchCourses();
                setCourses(Array.isArray(data) ? data : []);
            } catch (error) {
                showAlert(error.message, 'error');
            } finally {
                setLoading(false);
            }
        };

        // If we're in edit mode and have student data from location state, use it
        if (isEditMode && location.state && location.state.student) {
            const studentData = location.state.student;
            setFormData({
                name: studentData.name || '',
                email: studentData.email || '',
                course: studentData.course || ''
            });
        }

        loadCourses();
    }, [id, isEditMode, location.state]);

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
            const payload = {
                name: formData.name,
                email: formData.email,
                course: Number(formData.course),
                created_by: 1 // This should ideally come from user context/auth
            };

            if (isEditMode) {
                await modifyStudent(id, payload);
                showAlert("Student updated successfully", "success");
            } else {
                await addStudent(payload);
                showAlert("Student added successfully", "success");
            }

            // Redirect back to students list after short delay
            setTimeout(() => {
                navigate('/students');
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
        navigate('/students');
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
                    layoutId="studentForm"
                >
                    <Box sx={{ mb: 3 }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/students"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <PersonIcon sx={{ mr: 0.5 }} fontSize="small" />
                                Students
                            </Link>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                                {isEditMode ? 'Edit Student' : 'New Student'}
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
                            {isEditMode ? 'Update Student' : 'Add New Student'}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 4 }} />

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} component={motion.div} variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Student Name"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: <PersonIcon color="action" sx={{ mr: 1 }} />,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} component={motion.div} variants={itemVariants}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Student Email"
                                    type="email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    InputProps={{
                                        startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} component={motion.div} variants={itemVariants}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="course-label">Select Course</InputLabel>
                                    <Select
                                        labelId="course-label"
                                        id="course"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleInputChange}
                                        label="Select Course"
                                        required
                                        startAdornment={<SchoolIcon color="action" sx={{ mr: 1 }} />}
                                        disabled={loading}
                                    >
                                        <MenuItem value="">
                                            <em>Select a course</em>
                                        </MenuItem>
                                        {courses.map(course => (
                                            <MenuItem key={course.id} value={course.id}>
                                                {course.coursename}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {loading && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                            <CircularProgress size={24} />
                                        </Box>
                                    )}
                                </FormControl>
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
                                        {submitLoading ? 'Processing...' : isEditMode ? 'Update Student' : 'Add Student'}
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

export default StudentForm;