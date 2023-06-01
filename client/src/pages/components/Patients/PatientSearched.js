import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
// material-ui
import {
    Box,
    Grid,
    Stack,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Collapse,
    TextField,
    TablePagination,
    InputAdornment,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    Switch,
    Avatar,
    Divider,
    FormControlLabel,
    TableSortLabel,
    Chip,
    CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { VisibilityOutlined, CloseOutlined, Search, Add, Face4, Face6 } from '@mui/icons-material';
import Dot from 'components/@extended/Dot';
import MainCard from 'components/MainCard';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import '../style.css';
import { useDispatch, useSelector } from 'react-redux';
import { deletePatient, editPatient, fetchPatient, fetchPatients, insertPatient } from 'store/reducers/patients/patientSlice';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
const API = process.env.REACT_APP_API_URL;

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'id',
        align: 'left',
        disablePadding: false,
        label: '#'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Nom & Prenom'
    },
    {
        id: 'cin',
        align: 'left',
        disablePadding: false,
        label: 'CIN/Passport'
    },

    {
        id: 'telephone',
        align: 'left',
        disablePadding: false,

        label: 'Telephone'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

function EnhancedTableHead(props) {
    const theme = useTheme();
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow bgcolor={theme.palette.secondary.lighter} style={{ borderBottom: '2px solid #d9d9d9' }}>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired
};
// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 1:
            color = 'success';
            title = 'Abonné';
            break;
        case 0:
            color = 'error';
            title = 'Non abonné';
            break;
        default:
            color = 'primary';
            title = ' ';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={title} variant="light" color={color} />
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// console.log('rows', rows);
const PatientSearched = () => {
    let { state } = useLocation();
    state.id === undefined ? navigate('/404') : null;
    const navigate = useNavigate();
    JSON.parse(localStorage.getItem('user')).role !== 'admin' ? null : navigate('/404');
    const dispatch = useDispatch();
    const { records, loading, error, record } = useSelector((state) => state.patients);
    useEffect(() => {
        dispatch(fetchPatient(state.id));
    }, []);
    const row = record;

    const theme = useTheme();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const age = (date) => {
        const today = new Date();
        const birthdate = new Date(date);
        const age =
            today.getFullYear() -
            birthdate.getFullYear() -
            (today.getMonth() < birthdate.getMonth() ||
                (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
        return age;
    };
    return (
        <MainCard>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' },
                    marginTop: '1rem'
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <EnhancedTableHead />
                    <TableBody>
                        <Stack direction="column" alignItems="center">
                            {loading ? <CircularProgress /> : null}
                        </Stack>

                        <TableRow
                            hover
                            role="checkbox"
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            tabIndex={-1}
                            key={row.id}
                        >
                            <TableCell component="th" scope="row" align="left">
                                {row.id}
                            </TableCell>
                            <TableCell align="left">
                                <Stack direction="row" spacing={2}>
                                    <Avatar alt="" src={`${API}/storage/${row.image}`} height={30} />
                                    <Stack direction="column">
                                        <Typography variant="subtitle1" minWidth="100%">
                                            {row.prenom} {row.nom}
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" fontWeight="normal">
                                            {row.email}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TableCell>
                            <TableCell>{row.cin}</TableCell>
                            <TableCell>{row.telephone}</TableCell>
                        </TableRow>

                        <TableRow>
                            {/* <TableCell style={{ paddingBottom: 0, paddingTop: 0 }}></TableCell> */}
                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                                <Collapse in={true} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={4}>
                                                <MainCard
                                                    sx={{
                                                        height: '100%'
                                                    }}
                                                >
                                                    <Stack alignItems="center" spacing={1}>
                                                        <div class="avatar-preview">
                                                            <div
                                                                style={{
                                                                    backgroundImage: `url(${`${API}/storage/${row.image}`})`
                                                                }}
                                                            ></div>
                                                        </div>

                                                        <Typography variant="h5">
                                                            {row.prenom} {row.nom}
                                                        </Typography>

                                                        {row.civilité === 'female' ? (
                                                            <Stack
                                                                direction="row"
                                                                alignItems="center"
                                                                style={{ color: '#E75480' }}
                                                                spacing={0.5}
                                                            >
                                                                <Face4 />
                                                                <Typography>{row.civilité}</Typography>
                                                            </Stack>
                                                        ) : (
                                                            <Stack
                                                                direction="row"
                                                                alignItems="center"
                                                                style={{ color: '#40a9ff' }}
                                                                spacing={0.5}
                                                            >
                                                                <Face6 />
                                                                <Typography>{row.civilité}</Typography>
                                                            </Stack>
                                                        )}
                                                    </Stack>
                                                </MainCard>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <MainCard title="Details personnels">
                                                    <Stack direction="row" justifyContent="space-between" spacing={24}>
                                                        <Stack
                                                            direction="column"
                                                            spacing={0.5}
                                                            style={{
                                                                overflow: 'hidden',
                                                                wordWrap: 'break-word'
                                                            }}
                                                            useFlexGap
                                                            flexWrap="wrap"
                                                        >
                                                            <Typography variant="body1" color="textSecondary" fontWeight="normal">
                                                                Nom complet
                                                            </Typography>
                                                            <Typography variant="body1" style={{ wordWrap: 'break-word' }}>
                                                                {row.prenom} {row.nom}
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction="column" spacing={0.5}>
                                                            <Typography variant="body1" color="textSecondary" fontWeight="normal">
                                                                Adresse E-mail
                                                            </Typography>
                                                            <Typography variant="body1">{row.email}</Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Divider sx={{ margin: '1rem 0' }} />
                                                    <Stack direction="row" justifyContent="space-between" spacing={24}>
                                                        <Stack direction="column" spacing={0.5}>
                                                            <Typography variant="body1" color="textSecondary" fontWeight="normal">
                                                                Telephone
                                                            </Typography>
                                                            <Typography variant="body1" minWidth="100%">
                                                                +212{row.telephone}
                                                            </Typography>
                                                        </Stack>
                                                        <Stack direction="column" spacing={0.5}>
                                                            <Typography variant="body1" color="textSecondary" fontWeight="normal">
                                                                Date de naissance
                                                            </Typography>
                                                            <Typography variant="body1" minWidth="100%">
                                                                {row.naissance}({age(row.naissance)} ans)
                                                            </Typography>
                                                        </Stack>
                                                    </Stack>
                                                    <Divider sx={{ margin: '1rem 0' }} />
                                                    <Stack direction="column" spacing={0.5}>
                                                        <Typography variant="body1" color="textSecondary" fontWeight="normal">
                                                            Adresse
                                                        </Typography>
                                                        <Typography variant="body1" minWidth="100%">
                                                            {row.adresse}
                                                        </Typography>
                                                    </Stack>
                                                </MainCard>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

export default PatientSearched;
