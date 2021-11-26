import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';

// material-ui
import { Button, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';

// project imports
import AuthWrapper from './components/AuthWrapper';
import AuthCardWrapper from './components/AuthCardWrapper';

import AuthFooter from 'ui-component/cards/AuthFooter';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Logo from 'ui-component/Logo';

import Google from 'assets/images/icons/social-google.svg';
import { useAuth } from 'contexts';

const Login = () => {
    const theme = useTheme();
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    function handleSubmit(event) {
        event.preventDefault();

        const from = location.state?.from?.pathname || '/';

        auth.signin('Clediano', () => {
            navigate(from, { replace: true });
        });
    }

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Hi, Welcome Back
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container direction="column" justifyContent="center" spacing={2}>
                                            <Grid item xs={12}>
                                                <AnimateButton>
                                                    <Button
                                                        disableElevation
                                                        fullWidth
                                                        size="large"
                                                        variant="outlined"
                                                        sx={{
                                                            color: 'grey.700',
                                                            backgroundColor: theme.palette.primary,
                                                            borderColor: theme.palette.grey[100]
                                                        }}
                                                        onClick={(event) => handleSubmit(event)}
                                                    >
                                                        <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                                                            <img
                                                                src={Google}
                                                                alt="google"
                                                                width={16}
                                                                height={16}
                                                                style={{ marginRight: matchDownSM ? 8 : 16 }}
                                                            />
                                                        </Box>
                                                        SIGN IN WITH GOOGLE
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
