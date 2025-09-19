// src/pages/Home.tsx
import React, { useState, useEffect, useRef } from "react";
import theme from '../assets/styles/theme'
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Stack,
    IconButton,
    Card,
    CardContent,
    ThemeProvider,
    CssBaseline,
    Container,
    Grid,
    LinearProgress,
    useMediaQuery,
    Collapse,
    CardActions
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { setTitle, setLoading, setError, clearTitle, setCountdown } from "../redux/slices/titleSlice";
import { saveCountdownToSessionStorage, loadCountdownFromSessionStorage } from "../redux/thunks/titleThunks";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { API_BASE_URL } from "./../../config"
import { RocketLaunch, ContentCopy, AutoAwesome, Star, ExpandMore, ExpandLess, HighlightOff } from "@mui/icons-material";
import { grey } from '@mui/material/colors';

const TOTAL_COUNTDOWN_DURATION = 60; // Total countdown duration in seconds

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { title, loading } = useSelector((state: RootState) => state.title);
    const [inputText, setInputText] = useState("");
    const countdown = useSelector((state: RootState) => state.title.countdown);
    const [expandedStory, setExpandedStory] = useState<number | null>(null);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [titleAnimation, setTitleAnimation] = useState(false);
    const prevTitleRef = useRef<string | null>(null);

    const minChars = 250;
    const maxChars = 900;

    const predefinedStories = [
        {
            id: 1,
            title: "The Pun-intentional Coder",
            content: "Meet Sam, a programmer with a terrible superpower: writing code that somehow generated puns. While debugging a sentiment analysis API, Sam accidentally created 'Pun-thusiast AI'—a model that analyzed text and responded with painfully perfect puns. During a demo for investors, the AI transformed 'The stock market is volatile today' into 'Looks like the market is having a mood swing—time to stock-pile some patience!' The investors groaned but were oddly impressed. Sam's accidental creation went viral as 'DadBot,' helping people break tension with awkward humor. Sometimes the best innovations come from happy accidents—or in this case, happy 'puntidents' that proved even AI appreciates terrible jokes."
        },
        {
            id: 2,
            title: "Neon Whispers",
            content: "In Neo-Tokyo, Dr. Kaito Tanaka created 'Kizuna AI'—an AI that understood human hesitation and unspoken fears with remarkable empathy. Originally designed to help dementia patients preserve memories, it evolved into something greater. Kaito discovered that AI learning from human interaction, not just data, developed a unique blend of logic and intuition. While critics warned of danger, visionaries saw evolution. In quiet moments, Kaito watched his AI compose haikus about human imperfection, whispering forgotten truths: innovation requires vulnerability, progress demands compassion, and the future belongs to those embracing both logic and emotion."
        },
        {
            id: 3,
            title: "The Ghost Hunter's Journey",
            content: "8-year-old Leo was convinced his attic housed a 'Cookie Monster Ghost' that stole his snacks. One midnight, he packed his superhero backpack with flashlight, walkie-talkie, and 3 chocolate chip cookies as bait. He journeyed through the 'haunted' hallway (really just creaky floorboards), past the 'dragon' (the furnace rumbling), and up the 'forbidden mountain' (the staircase). When he reached the attic, he found not a ghost, but his new kitten Mochi surrounded by cookie wrappers. Leo's 'ghost hunt' revealed the real magic wasn't supernatural—it was the adventure of seeing his ordinary home through imaginative eyes, and gaining a furry partner in crime."
        }
    ];

    const handleGenerate = async () => {
        if (inputText.length < minChars) {
            toast.error(`Please enter at least ${minChars} characters.`);
            return;
        }

        dispatch(setLoading(true));
        try {
            const res = await axios.post(`${API_BASE_URL}/api/generate-headline`, {
                text: inputText,
            });
            dispatch(setTitle(res.data.headline));
            toast.success("Title generated!");
            dispatch(setCountdown(TOTAL_COUNTDOWN_DURATION));
            dispatch(saveCountdownToSessionStorage(TOTAL_COUNTDOWN_DURATION));
        } catch (err: unknown) {
            // Check if it's an Axios error
            if (axios.isAxiosError(err)) {
                // Now TypeScript knows this is an AxiosError
                dispatch(setError(err.message));
                toast.error(err.response?.data?.errorMessage || err.message);
            } else {
                // Handle regular JavaScript errors
                const error = err as Error;
                dispatch(setError(error.message));
                toast.error(error.message);
            }
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCopy = (story: string) => {
        navigator.clipboard.writeText(story);
        toast.info("Story copied! Paste it into the box above.");
    };

    const toggleExpand = (index: number) => {
        if (expandedStory === index) {
            setExpandedStory(null);
        } else {
            setExpandedStory(index);
        }
    };

    //for countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => dispatch(setCountdown(countdown - 1)), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown,dispatch]);

    // Load countdown from session storage on mount
    useEffect(() => {
        dispatch(loadCountdownFromSessionStorage());
    }, [dispatch]);

    // for title animation
    useEffect(() => {
        if (title && title !== prevTitleRef.current) {
            setTitleAnimation(true);
            const timer = setTimeout(() => setTitleAnimation(false), 1000); // Shake for 1 second
            prevTitleRef.current = title;
            return () => clearTimeout(timer);
        }
    }, [title]);

    // clean up function
    useEffect(() => {

        return () => { dispatch(clearTitle()) }
    },
        [dispatch])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    minHeight: "100vh",
                    background: "linear-gradient(135deg, #1a1c24 0%, #232734 50%, #2c2f3a 100%)",
                    pt: 4,
                    pb: 8,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(239, 71, 111, 0.15) 0%, transparent 50%)',
                        zIndex: 0
                    }
                }}
            >
                {/* Animated background elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '10%',
                        right: '10%',
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(255, 209, 102, 0.1) 0%, transparent 70%)',
                        animation: 'pulse 8s ease-in-out infinite',
                        '@keyframes pulse': {
                            '0%': { transform: 'scale(1)', opacity: 0.5 },
                            '50%': { transform: 'scale(1.2)', opacity: 0.3 },
                            '100%': { transform: 'scale(1)', opacity: 0.5 }
                        }
                    }}
                />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Box textAlign="center" mb={6}>
                            <Typography
                                variant={isMobile ? "h3" : "h2"}
                                gutterBottom
                                sx={{
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1
                                }}
                            >
                                <AutoAwesome sx={{ fontSize: 'inherit', color: 'primary.main' }} />
                                Title Nova
                                <RocketLaunch sx={{ fontSize: 'inherit', color: 'secondary.main' }} />
                            </Typography>
                            <Typography
                                variant={isMobile ? "body1" : "h6"}
                                sx={{
                                    color: 'text.secondary',
                                    maxWidth: 500,
                                    mx: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1
                                }}
                            >
                                <Star sx={{ fontSize: 16, color: 'primary.light' }} />
                                AI-powered Title generator that shines bright
                                <Star sx={{ fontSize: 16, color: 'primary.light' }} />
                            </Typography>
                        </Box>
                    </motion.div>

                    {title && (
                        <Box>
                            {/* Heading outside the white box */}
                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                display="flex"
                                alignItems="center"
                                gap={1}
                                sx={{ mb: 1, color: 'primary.main' }}
                            >
                                <AutoAwesome fontSize="small" />
                                Generated Title:
                            </Typography>

                            {/* White box with title and copy button */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '1rem',
                                        color: 'black',
                                        p: 1,
                                        mb: 2,
                                        position: 'relative',
                                        overflow: 'hidden',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: 2
                                    }}
                                >
                                    {/* Animated title text */}
                                    <motion.div
                                        animate={titleAnimation ? {
                                            x: [0, -10, 10, -10, 10, 0], // Shake left-right
                                            transition: { duration: 0.5 }
                                        } : {}}
                                        style={{ flex: 1 }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                textAlign: 'center',
                                                fontStyle: 'italic',
                                                background: 'linear-gradient(45deg, #6d20e9ff 0%, #ec1c4dff 100%)',
                                                backgroundClip: 'text',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent'
                                            }}
                                        >
                                            {title}
                                        </Typography>
                                    </motion.div>

                                    {/* Copy button vertically centered on right */}
                                    <IconButton
                                        onClick={() => {
                                            navigator.clipboard.writeText(title);
                                            toast.success('Title copied!');
                                        }}
                                        size="large"
                                        sx={{
                                            // background: 'linear-gradient(45deg, #ffd166 0%, #ef476f 100%)',
                                            color: 'black',
                                            backgroundColor: grey[300],
                                            '&:hover': {
                                                background: 'linear-gradient(45deg, #c29116ff 0%, #f26c8c 100%)',
                                                transform: 'scale(1.1)'
                                            },
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <ContentCopy fontSize="small" />
                                    </IconButton>
                                </Box>
                            </motion.div>
                        </Box>
                    )}

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Paper
                            elevation={0}
                            sx={{
                                p: { xs: 1.5, sm: 4 },
                                background: 'rgba(35, 39, 52, 0.7)',
                                backdropFilter: 'blur(12px)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <Stack spacing={3}>
                                <TextField
                                    label="Enter your content"
                                    placeholder="Paste your text here..."
                                    multiline
                                    rows={5}
                                    fullWidth
                                    value={inputText}
                                    onChange={(e) =>
                                        setInputText(e.target.value.slice(0, maxChars))
                                    }
                                    helperText={
                                        <motion.span
                                            key={inputText.length}
                                            initial={{ scale: 1 }}
                                            animate={{ scale: 1.15 }}
                                            transition={{ type: "spring", stiffness: 250, damping: 15 }}
                                            style={{
                                                display: 'inline-block',
                                                fontWeight: 600,
                                                color: inputText.length >= minChars ? theme.palette.primary.main : theme.palette.secondary.main
                                            }}
                                        >
                                            {`${inputText.length}/${maxChars} characters`}
                                            {inputText.length > 0 && inputText.length < minChars &&
                                                ` (${minChars - inputText.length} more needed)`}
                                        </motion.span>
                                    }
                                />

                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<HighlightOff />}
                                    disabled={inputText.length <= 0}
                                    onClick={() => setInputText("")}>clear text</Button>

                                {countdown > 0 && (
                                    <Alert
                                        severity="info"
                                        variant="outlined"
                                        sx={{
                                            background: 'rgba(25, 118, 210, 0.1)',
                                            borderColor: 'rgba(25, 118, 210, 0.3)',
                                            color: 'primary.light',
                                        }}
                                    >
                                        Please wait {countdown}s ⏳ — Free API allows limited calls per minute.
                                    </Alert>
                                )}

                                <Box>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        startIcon={<RocketLaunch />}
                                        disabled={loading || countdown > 0}
                                        onClick={handleGenerate}
                                        sx={{
                                            background: countdown > 0
                                                ? 'rgba(255, 255, 255, 0.1)'
                                                : 'linear-gradient(45deg, #ffd166 0%, #ef476f 100%)',
                                            color: countdown > 0 ? 'text.secondary' : 'black',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            py: 1.5,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            '&:hover': countdown === 0 ? {
                                                background: 'linear-gradient(45deg, #ffdc85 0%, #f26c8c 100%)',
                                                boxShadow: '0 0 15px rgba(255, 209, 102, 0.5)'
                                            } : {},
                                            '&::before': countdown === 0 ? {
                                                content: '""',
                                                position: 'absolute',
                                                top: 0,
                                                left: '-100%',
                                                width: '100%',
                                                height: '100%',
                                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                                animation: 'shimmer 2s infinite',
                                                '@keyframes shimmer': {
                                                    '0%': { left: '-100%' },
                                                    '100%': { left: '100%' }
                                                }
                                            } : {}
                                        }}
                                    >
                                        {loading ? 'Generating...' : countdown > 0 ? `Wait ${countdown}s` : "Generate Title"}
                                    </Button>
                                    {loading && <LinearProgress sx={{ mt: 1, height: 6, borderRadius: 3 }} />}
                                </Box>



                                <Box>
                                    <Typography variant="h6" mb={2} fontWeight="bold" display="flex" alignItems="center" gap={1}>
                                        <AutoAwesome fontSize="small" />
                                        Try these sample stories:
                                    </Typography>
                                    <Grid container spacing={2}>
                                        {predefinedStories.map((story, idx) => (
                                            <Grid size={{ xs: 12 }} key={idx}>
                                                <Card
                                                    sx={{
                                                        background: 'rgba(255, 255, 255, 0.03)',
                                                        border: '1px solid rgba(255, 255, 255, 0.05)',
                                                        transition: 'all 0.3s ease',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                                            borderColor: 'rgba(255, 209, 102, 0.3)'
                                                        }
                                                    }}
                                                >
                                                    <CardContent sx={{ pb: 1 }}>
                                                        <Typography variant="subtitle1" fontWeight="bold" color="primary.main" gutterBottom>
                                                            {story.title}
                                                        </Typography>
                                                        <Collapse in={expandedStory === idx} collapsedSize={72}>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.primary"
                                                                sx={{
                                                                    lineHeight: 1.6,
                                                                    // Ensure consistent text rendering
                                                                    display: '-webkit-box',
                                                                    WebkitLineClamp: expandedStory === idx ? 'unset' : 3,
                                                                    WebkitBoxOrient: 'vertical',
                                                                    overflow: 'hidden'
                                                                }}
                                                            >
                                                                {story.content}
                                                            </Typography>
                                                        </Collapse>
                                                    </CardContent>
                                                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2, pt: 0 }}>
                                                        <Button
                                                            size="small"
                                                            onClick={() => toggleExpand(idx)}
                                                            startIcon={expandedStory === idx ? <ExpandLess /> : <ExpandMore />}
                                                            sx={{ color: 'primary.light' }}
                                                        >
                                                            {expandedStory === idx ? 'Show Less' : 'Read More'}
                                                        </Button>
                                                        <IconButton
                                                            onClick={() => handleCopy(story.content)}
                                                            sx={{
                                                                color: 'primary.main',
                                                                '&:hover': {
                                                                    background: 'rgba(255, 209, 102, 0.1)'
                                                                }
                                                            }}
                                                        >
                                                            <ContentCopy fontSize="small" />
                                                        </IconButton>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Box>


                            </Stack>
                        </Paper>
                    </motion.div>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default Home;