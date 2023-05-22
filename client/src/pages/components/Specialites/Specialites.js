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
import { deleteSpecialite, editSpecialite, fetchSpecialites, insertSpecialite } from 'store/reducers/specialites/specialiteSlice';
import { useEffect } from 'react';
const API = process.env.REACT_APP_API_URL;

const DeleteIcon = styled.a`
    padding: 4px 3px;
    border-radius: 4px;
    &:hover {
    background-color: #ffcdd2
    ;
`;
const EditIcon = styled.a`
    padding: 4px 3px;
    border-radius: 4px;
    &:hover {
    background-color: #bbdefb
    ;
`;

const Red = {
    color: '#ed4337',
    margin: '0 0 0.2rem 0.2rem'
};

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
        id: 'id',
        align: 'left',
        disablePadding: false,
        label: '#'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Specialité'
    },
    {
        id: 'actions',
        align: 'center',
        disablePadding: false,
        label: 'Actions'
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
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
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
const Specialites = () => {
    const dispatch = useDispatch();
    const { records, loading, error, record } = useSelector((state) => state.specialites);
    useEffect(() => {
        dispatch(fetchSpecialites());
    }, [dispatch]);
    const rows = records;
    // do {} while (isLoading);

    // while (!isLoading) {}
    // console.log('data', JSON.parse(data), isLoading);

    const theme = useTheme();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(null);
    const [rowsLength, setRowsLength] = useState(rows.length);
    const [searchCount, setSearchCount] = useState();
    const [base64URL, setBase64URL] = useState('');
    const [toBeDeleted, setToBeDeleted] = useState();
    const [updateValues, setUpdateValues] = React.useState({});
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const InitialRows = React.useMemo(
        () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage]
    );

    const [visibleRows, setvisibleRows] = useState(InitialRows);
    React.useMemo(
        () => setvisibleRows(stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)),
        [order, orderBy, page, rowsPerPage, records]
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const requestSearch = (searchedVal) => {
        if (searchedVal === '') {
            setvisibleRows(InitialRows);
            setRowsLength(rows.length);
            setSearchCount(undefined);
            return;
        }
        const filteredRows = rows.filter((row) => {
            return (
                row.nom.toLowerCase().includes(searchedVal.toLowerCase()) || row.prenom.toLowerCase().includes(searchedVal.toLowerCase())
            );
        });
        // setvisibleRows(stableSort(filteredRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        setvisibleRows(filteredRows);
        setRowsLength(filteredRows.length);
        setSearchCount(filteredRows.length);
    };

    const handleClickOpen = (row) => {
        setUpdateValues(row);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setUpdateValues({});
        setOpenDialog(false);
    };

    const handleDeleteOpen = (row) => {
        setToBeDeleted(row);
        setOpenDelete(true);
    };

    const handleDeleteClose = () => {
        setOpenDelete(false);
    };

    const handleDeleteRow = () => {
        dispatch(deleteSpecialite(toBeDeleted.id));
        handleDeleteClose();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: updateValues,
        onSubmit: (values, actions) => {
            values = {
                id: values.id || null,
                nom: values.nom
            };
            values.id ? dispatch(editSpecialite(values)) : dispatch(insertSpecialite(values));
            dispatch(fetchSpecialites());
            handleClose();
            try {
            } catch (error) {
                setError(error.response.data);
            }
        },
        validationSchema: yup.object({
            nom: yup.string().max(50, 'Trop Long').required('Le nom est requis')
        })
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                const imagePreview = document.getElementById('imagePreview');
                imagePreview.style.backgroundImage = `url(${e.target.result})`;
                imagePreview.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let baseURL = '';
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };
    const handleImageChange = (event) => {
        readURL(event.target);
        let selectedFile = event.target.files[0];
        getBase64(selectedFile)
            .then((result) => {
                setBase64URL(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <TextField
                        label="Rechercher"
                        onChange={(searchVal) => requestSearch(searchVal.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            )
                        }}
                    />
                    {searchCount ? (
                        <Typography variant="subtitle1" color="textSecondary" fontWeight="normal">
                            ({searchCount} trouvés)
                        </Typography>
                    ) : null}
                </Stack>
                <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
                    Ajouter
                </Button>
                <Dialog
                    open={openDelete}
                    onClose={handleDeleteClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <Box sx={{ p: 1, py: 1.5 }}>
                        <DialogTitle id="alert-dialog-title">Voulez vous supprimez cet Specialite?</DialogTitle>
                        <DialogActions>
                            <Button color="secondary" onClick={handleDeleteClose}>
                                Annuler
                            </Button>
                            <Button variant="contained" color="error" onClick={handleDeleteRow}>
                                Supprimer
                            </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
                <Dialog open={openDialog} onClose={handleClose} aria-labelledby="title">
                    <Box sx={{ p: 1, py: 1.5 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <DialogContent>
                                <FormControl className="formControl" fullwidth>
                                    <input id="idUpdate" name="idU" hidden value={formik.values.id} />
                                    <Stack direction="row" spacing={6}>
                                        <div className="form">
                                            <Stack>
                                                <FormLabel style={{ marginBottom: '0.2rem', color: theme.palette.secondary.darker }}>
                                                    Nom:
                                                </FormLabel>
                                                <TextField
                                                    id="nom"
                                                    name="nom"
                                                    type="text"
                                                    placeholder="Enter le nom"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.nom}
                                                />
                                                {formik.touched.nom && formik.errors.nom ? <p style={Red}>{formik.errors.nom}</p> : null}
                                            </Stack>
                                        </div>
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
            </Box>
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
                    <EnhancedTableHead order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                    <TableBody>
                        <Stack direction="column" alignItems="center">
                            {loading ? <CircularProgress /> : null}
                        </Stack>

                        {visibleRows.map((row, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <React.Fragment key={row.id}>
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.nom}</TableCell>
                                        <TableCell align="center">
                                            <EditIcon>
                                                <EditOutlined
                                                    style={{ color: theme.palette.primary.main, cursor: 'pointer', fontSize: '20px' }}
                                                    onClick={() => handleClickOpen(row)}
                                                />
                                            </EditIcon>
                                            <DeleteIcon>
                                                <DeleteOutlined
                                                    style={{ color: theme.palette.error.main, cursor: 'pointer', fontSize: '20px' }}
                                                    onClick={() => {
                                                        handleDeleteOpen(row);
                                                    }}
                                                />
                                            </DeleteIcon>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })}
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rowsLength}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default Specialites;
