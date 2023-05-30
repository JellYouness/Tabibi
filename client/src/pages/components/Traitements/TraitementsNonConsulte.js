import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField,
    TablePagination,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormLabel,
    Chip,
    Select,
    MenuItem,
    Autocomplete
} from '@mui/material';
import { Add } from '@mui/icons-material';

// third-party
import { editTraitement, fetchTraitementsNonConsulte } from 'store/reducers/traitements/traitementSlice';

// project import
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'components/MainCard';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { fetchMedecins } from 'store/reducers/medecins/medecinSlice';

const EditIcon = styled.a`
    padding: 4px 3px;
    border-radius: 4px;
    &:hover {
    background-color: #bbdefb
    ;
`;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'Categorie',
        align: 'left',
        disablePadding: true,
        label: 'Categorie'
    },
    {
        id: 'Urgence',
        align: 'left',
        disablePadding: false,
        label: 'Urgence'
    },
    {
        id: 'patient',
        align: 'left',
        disablePadding: false,
        label: 'Patient'
    },
    {
        id: 'date',
        align: 'left',
        disablePadding: false,
        label: 'Date'
    },
    {
        id: 'etat',
        align: 'center',
        disablePadding: false,
        label: 'Etat'
    },
    {
        id: 'medecin',
        align: 'center',
        disablePadding: false,
        label: 'Medecin'
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

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status, id }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'En attente';
            break;
        case 1:
            color = 'success';
            title = 'Consulté';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    if (id === 0) {
        color = 'error';
        title = 'Rejected';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Chip label={title} color={color} />
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

const NonConsulte = () => {
    const navigate = useNavigate();
    JSON.parse(localStorage.getItem('user')).role !== 'admin' ? null : navigate('/404');
    const dispatch = useDispatch();
    const { records, loading, error, edited } = useSelector((state) => state.traitements);
    const { records: medecins } = useSelector((state) => state.medecins);
    useEffect(() => {
        dispatch(fetchMedecins());
        dispatch(fetchTraitementsNonConsulte());
    }, [dispatch, edited]);
    const rows = records;
    // var medecins = {};
    // for (var i = 0; i < medecinsArr.length; i++) {
    //     medecins[i] = medecinsArr[i];
    // }
    // var object = arr.reduce((obj, item) => ((obj[item.key] = item.value), obj), {});

    const theme = useTheme();
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState();
    const [updateValues, setUpdateValues] = useState({});

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClickOpen = (row) => {
        setToBeDeleted(row.id);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setToBeDeleted(null);
        setOpenDialog(false);
        setUpdateValues({ medecin_id: null });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: updateValues,
        onSubmit: (values, actions) => {
            values = {
                id: toBeDeleted,
                medecin_id: values.medecin_id
            };
            try {
                dispatch(editTraitement(values));
                handleClose();
            } catch (error) {
                setError(error.response.data);
            }
        }
    });

    return (
        <MainCard>
            <Dialog maxWidth="xs" fullWidth={true} open={openDialog} onClose={handleClose} aria-labelledby="title">
                <Box sx={{ p: 1, py: 1.5 }}>
                    <form onSubmit={formik.handleSubmit}>
                        <DialogContent>
                            <FormControl className="formControl" sx={{ m: 1, minWidth: 120 }}>
                                <Stack direction="row" spacing={6}>
                                    <Stack direction="row" spacing={3} alignItems="center">
                                        <FormLabel style={{ marginBottom: '0.2rem', color: theme.palette.secondary.darker }}>
                                            Medecin:
                                        </FormLabel>
                                        <Select
                                            id="medecin_id"
                                            name="medecin_id"
                                            value={formik.values.medecin_id ? formik.values.medecin_id.toString() : 'disabled'}
                                            onChange={formik.handleChange}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                        >
                                            <MenuItem disabled value="disabled">
                                                <em>Selectionner le medecin</em>
                                            </MenuItem>
                                            {medecins.map((medecin) => {
                                                return <MenuItem value={medecin.id.toString()}>{medecin.nom}</MenuItem>;
                                            })}
                                        </Select>
                                    </Stack>
                                </Stack>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button color="error" onClick={handleClose}>
                                Annuler
                            </Button>
                            <Button variant="contained" type="submit">
                                Ajouter
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
            <Box>
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' }
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
                        <OrderTableHead order={order} orderBy={orderBy} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            tabIndex={-1}
                                            key={row.id}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" align="left">
                                                {row.categorie.libelle}
                                            </TableCell>
                                            <TableCell align="left">{row.categorie.sous_type.urgence.libelle}</TableCell>
                                            <TableCell align="left">
                                                <Stack direction="column" alignItems="flex-start">
                                                    <Typography
                                                        component={RouterLink}
                                                        to="/traitements-patient"
                                                        state={{ patient: row.patient.id }}
                                                        variant="subtitle1"
                                                        minWidth="100%"
                                                    >
                                                        {row.patient.nom} {row.patient.prenom}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">{row.date}</TableCell>
                                            <TableCell align="center">
                                                <OrderStatus status={row.etat} id={row.medecin_id} />
                                            </TableCell>
                                            <TableCell align="center">
                                                <EditIcon>
                                                    <Add
                                                        style={{ color: theme.palette.primary.main, cursor: 'pointer', fontSize: '20px' }}
                                                        onClick={() => handleClickOpen(row)}
                                                    />
                                                </EditIcon>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </MainCard>
    );
};

export default NonConsulte;
