import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    TextField,
    Grid,
    Card,
    CardContent,
    CardActions,
    Divider,
    Snackbar,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Save as SaveIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { addTeacher, modifyTeacher, fetchTeacherById } from '../../../domain/teacher/teacher';

const TeacherForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [loading, setLoading] = useState(isEditMode);
    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        subject: ''
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        const loadTeacher = async () => {
            if (isEditMode) {
                try {
                    setLoading(true);
                    const data = await fetchTeacherById(id);
                    setTeacher(data);
                } catch (error) {
                    console.error("Error fetching teacher:", error);
                    setMessage("Error loading teacher data.");
                    setOpenSnackbar(true);
                } finally {
                    setLoading(false);
                }
            }
        };

        loadTeacher();
    }, [id, isEditMode]);

    const validateForm = () => {
        const newErrors = {};

        if (!teacher.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!teacher.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(teacher.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!teacher.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            if (isEditMode) {
                await modifyTeacher(id, teacher);
                setMessage("Teacher updated successfully!");
            } else {
                await addTeacher(teacher);
                setMessage("Teacher added successfully!");
            }

            setOpenSnackbar(true);

            // Return to list after short delay
            setTimeout(() => {
                navigate('/teachers');
            }, 1500);
        } catch (error) {
            console.error("Error saving teacher:", error);
            setMessage(isEditMode ? "Error updating teacher." : "Error adding teacher.");
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Card elevation={3}>
                <CardContent>
                    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                        <Button
                            component={Link}
                            to="/teachers"
                            startIcon={<ArrowBackIcon />}
                            sx={{ mr: 2 }}
                        >
                            Back
                        </Button>
                        <Typography variant="h4" component="h1">
                            {isEditMode ? 'Edit Teacher' : 'Add New Teacher'}
                        </Typography>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    name="name"
                                    value={teacher.name}
                                    onChange={handleChange}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    required
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={teacher.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    required
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Subject"
                                    name="subject"
                                    value={teacher.subject}
                                    onChange={handleChange}
                                    error={!!errors.subject}
                                    helperText={errors.subject}
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>

                        <CardActions sx={{ justifyContent: 'flex-end', mt: 3 }}>
                            <Button
                                type="button"
                                variant="outlined"
                                onClick={() => navigate('/teachers')}
                                sx={{ mr: 1 }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon />}
                            >
                                {isEditMode ? 'Update Teacher' : 'Add Teacher'}
                            </Button>
                        </CardActions>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TeacherForm;
