import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
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
    Breadcrumbs
} from '@mui/material';
import {
    Save as SaveIcon,
    Cancel as CancelIcon,
    ArrowBack as ArrowBackIcon,
    Person as PersonIcon,
    Email as EmailIcon,
    Book as BookIcon,
    NavigateNext as NavigateNextIcon
} from '@mui/icons-material';
import { addTeacher, modifyTeacher, fetchTeacherById } from '../../../domain/teacher/teacher';

const TeacherForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(isEditMode);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: ''
    });
    const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });

    useEffect(() => {
        const loadTeacher = async () => {
            if (isEditMode) {
                try {
                    setLoading(true);
                    const data = await fetchTeacherById(id);
                    setFormData(data);
                } catch (error) {
                    showAlert("Error loading teacher data.", "error");
                } finally {
                    setLoading(false);
                }
            }
        };

        loadTeacher();
    }, [id, isEditMode]);

    const showAlert = (message, severity = 'info') => {
        setAlert({ open: true, message, severity });
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, open: false });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            if (isEditMode) {
                await modifyTeacher(id, formData);
                showAlert("Teacher updated successfully", "success");
            } else {
                await addTeacher(formData);
                showAlert("Teacher added successfully", "success");
            }

            // Redirect back to teachers list after short delay
            setTimeout(() => {
                navigate('/teachers');
            }, 2000);
        } catch (error) {
            showAlert(error.message || "An error occurred", "error");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/teachers');
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

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

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
                    layoutId="teacherForm"
                >
                    <Box sx={{ mb: 3 }}>
                        <Breadcrumbs
                            separator={<NavigateNextIcon fontSize="small" />}
                            aria-label="breadcrumb"
                        >
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/teachers"
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                <PersonIcon sx={{ mr: 0.5 }} fontSize="small" />
                                Teachers
                            </Link>
                            <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
                                {isEditMode ? 'Edit Teacher' : 'New Teacher'}
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
                            {isEditMode ? 'Update Teacher' : 'Add New Teacher'}
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
                                    label="Teacher Name"
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
                                    label="Teacher Email"
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
                                <TextField
                                    fullWidth
                                    id="subject"
                                    name="subject"
                                    label="Subject"
                                    variant="outlined"
                                    value={formData.subject}
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
                                        {submitLoading ? 'Processing...' : isEditMode ? 'Update Teacher' : 'Add Teacher'}
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

export default TeacherForm;
