import React, { useState } from 'react';
import { register } from '../../domain/auth/auth';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  InputAdornment,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(username, email, role, password1, password2);
      addMessage('success', "Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      addMessage('error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addMessage = (type, text) => {
    const newMessage = {
      id: Date.now(),
      type,
      text
    };

    setMessages(prev => [...prev, newMessage]);
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }, 5000);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh', 
        padding: '2rem 0',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #a8dadc 100%)',
      }}
    >

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            width: '90%',
            maxWidth: 800, 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 3,
              fontSize: '2rem',
            }}
          >
            Create Account
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              '& .MuiFormControl-root': { mb: 2 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                '& > *': { flex: 1 }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontSize: '1rem',
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                    }
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontSize: '1rem',
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                    }
                  }}
                />
              </motion.div>
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FormControl fullWidth margin="normal">
                <InputLabel sx={{ fontSize: '1rem' }}>Role</InputLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  label="Role"
                  sx={{
                    borderRadius: '12px',
                    fontSize: '1rem',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  <MenuItem value="" disabled>Select Role</MenuItem>
                  <MenuItem value="student">Student</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </Select>
              </FormControl>
            </motion.div>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                '& > *': { flex: 1 }
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontSize: '1rem',
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                    }
                  }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" sx={{ fontSize: 24 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontSize: '1rem',
                      '&.Mui-focused fieldset': {
                        borderWidth: 2,
                        borderColor: 'primary.main',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '1rem',
                    }
                  }}
                />
              </motion.div>
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: '12px',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: 3,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 5,
                    backgroundColor: 'primary.dark',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Register Now'
                )}
              </Button>
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Typography
              variant="body1"
              textAlign="center"
              sx={{
                mt: 3,
                color: 'text.secondary',
                fontSize: '1rem',
              }}
            >
              Already have an account?{' '}
              <Link
                href="/login"
                underline="hover"
                sx={{
                  fontWeight: 700,
                  color: 'secondary.main',
                  fontSize: '1rem',
                  '&:hover': {
                    color: 'secondary.dark',
                  }
                }}
              >
                Login Here
              </Link>
            </Typography>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default RegisterForm;
