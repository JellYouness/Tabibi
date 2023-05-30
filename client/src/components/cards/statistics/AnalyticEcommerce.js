import PropTypes from 'prop-types';

// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import { TaskAlt, HourglassEmpty } from '@mui/icons-material';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color, title, count, percentage, isLoss, extra }) => (
    <MainCard contentSX={{ p: 2.25 }}>
        <Stack spacing={0.5}>
            <Typography variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {color && (
                    <Grid item>
                        {/* <Chip
                            variant="combined"
                            color={color}
                            icon={
                                <>
                                    {color === 'success' && <TaskAlt style={{ fontSize: '1rem', color: 'inherit' }} />}
                                    {color == 'warning' && <HourglassEmpty style={{ fontSize: '1rem', color: 'inherit' }} />}
                                </>
                            }
                            size="small"
                        /> */}
                        {color === 'success' && <TaskAlt color="success" fontSize="medium" />}
                        {color == 'warning' && <HourglassEmpty color="warning" style={{ fontSize: '1rem', color: 'warning' }} />}
                    </Grid>
                )}
            </Grid>
        </Stack>
        {/* <Box sx={{ pt: 2.25 }}>
            <Typography variant="caption" color="textSecondary">
                You made an extra{' '}
                <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                    {extra}
                </Typography>{' '}
                this year
            </Typography>
        </Box> */}
    </MainCard>
);

AnalyticEcommerce.propTypes = {
    color: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.string,
    percentage: PropTypes.number,
    isLoss: PropTypes.bool,
    extra: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};

AnalyticEcommerce.defaultProps = {
    color: 'primary'
};

export default AnalyticEcommerce;
