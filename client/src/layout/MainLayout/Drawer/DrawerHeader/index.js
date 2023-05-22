import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, ThemeProvider, Typography, createTheme } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';
import Ubuntu from 'fonts/Ubuntu-Bold.ttf';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="column" spacing={1} alignItems="center" justifyContent="space-around">
                <Logo />
                {/* <ThemeProvider theme={Ctheme}>
                    <Typography variant="h4">Tabibi</Typography>
                </ThemeProvider> */}
            </Stack>
        </DrawerHeaderStyled>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
