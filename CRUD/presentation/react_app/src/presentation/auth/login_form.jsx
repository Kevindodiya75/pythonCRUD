import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../domain/auth/auth';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await login(email, password);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("user_id", data.id);
      localStorage.setItem("userrole", data.userrole);

      addMessage('success', "Login successful!");
      setTimeout(() => navigate("/students"), 1500);
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
        background: 'linear-gradient(135deg, #f0f4ff 0%, #a8dadc 100%)',
        position: 'relative',
      }}
    >
      {/* Global Messages Container */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity={message.type}
                sx={{
                  borderRadius: '8px',
                  alignItems: 'center',
                  boxShadow: 3,
                  minWidth: 300,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                iconMapping={{
                  success: <EmailIcon fontSize="inherit" />,
                  error: <LockIcon fontSize="inherit" />,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  {message.text}
                </Box>
                <CloseIcon
                  sx={{
                    cursor: 'pointer',
                    ml: 1,
                    '&:hover': { opacity: 0.8 }
                  }}
                  onClick={() => setMessages(prev => prev.filter(msg => msg.id !== message.id))}
                />
              </Alert>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 6,
            width: '90%',
            maxWidth: 600,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            borderRadius: '20px',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: 'primary.main',
              mb: 4,
              letterSpacing: '-0.5px',
            }}
          >
            Welcome Back
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" sx={{ fontSize: 28 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    '&.Mui-focused fieldset': {
                      borderWidth: 2,
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.1rem',
                  }
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" sx={{ fontSize: 28 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    '&.Mui-focused fieldset': {
                      borderWidth: 2,
                      borderColor: 'primary.main',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '1.1rem',
                  }
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{
                  mt: 4,
                  py: 2,
                  borderRadius: '12px',
                  fontSize: '1.2rem',
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
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  'Login'
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
                mt: 4,
                color: 'text.secondary',
                fontSize: '1.1rem',
              }}
            >
              New to our platform?{' '}
              <Link
                href="/register"
                underline="hover"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  fontSize: '1.1rem',
                  '&:hover': {
                    color: 'primary.dark',
                  }
                }}
              >
                Create an Account
              </Link>
            </Typography>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default LoginForm;
