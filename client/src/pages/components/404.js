import { ArrowLeft } from '@mui/icons-material';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';

const Page404 = () => (
    <>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            mb: 3,
                            textAlign: 'center'
                        }}
                    >
                        <img
                            alt="Under development"
                            src="/assets/errors/error-401.png"
                            style={{
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 400
                            }}
                        />
                    </Box>
                    <Typography align="center" sx={{ mb: 3 }} variant="h3">
                        401: L'accès à cette page est interdit.
                    </Typography>
                    <Typography align="center" color="text.secondary" variant="body1">
                        Vous n'avez pas accès à cette page.
                    </Typography>
                    <Button
                        href="/dashboard/default"
                        startIcon={
                            <SvgIcon fontSize="small">
                                <ArrowLeft />
                            </SvgIcon>
                        }
                        sx={{ mt: 3 }}
                        variant="contained"
                    >
                        Revenir au tableau de bord
                    </Button>
                </Box>
            </Container>
        </Box>
    </>
);

export default Page404;
