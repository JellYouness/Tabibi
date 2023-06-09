import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Chip,
    TextField,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import { Add, Search } from '@mui/icons-material';

// third-party
import NumberFormat from 'react-number-format';
import { fetchTraitements, fetchTraitementsConsulte, fetchTraitementsMedecin } from 'store/reducers/traitements/traitementSlice';

// project import
import Dot from 'components/@extended/Dot';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import MainCard from 'components/MainCard';
import '../style.css';

const EditIcon = styled.a`
    padding: 4px 3px;
    border-radius: 4px;
    &:hover {
    background-color: #bbdefb
    ;
`;
function createData(trackingNo, name, fat, carbs, protein) {
    return { trackingNo, name, fat, carbs, protein };
}

const rows = [
    createData(84564564, 'Camera Lens', 40, 2, 40570),
    createData(98764564, 'Laptop', 300, 0, 180139),
    createData(98756325, 'Mobile', 355, 1, 90989),
    createData(98652366, 'Handset', 50, 1, 10239),
    createData(13286564, 'Computer Accessories', 100, 1, 83348),
    createData(86739658, 'TV', 99, 0, 410780),
    createData(13256498, 'Keyboard', 125, 2, 70999),
    createData(98753263, 'Mouse', 89, 2, 10570),
    createData(98753275, 'Desktop', 185, 1, 98063),
    createData(98753291, 'Chair', 100, 0, 14001)
];

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
        id: 'Medecin',
        align: 'left',
        disablePadding: true,
        label: 'Medecin'
    },
    {
        id: 'patient',
        align: 'left',
        disablePadding: false,
        label: 'Patient'
    },
    {
        id: 'Urgence',
        align: 'left',
        disablePadding: false,
        label: 'Urgence'
    },
    {
        id: 'Categorie',
        align: 'left',
        disablePadding: false,
        label: 'Categorie'
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
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow bgColor="f5f5f5">
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

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Chip label={title} color={color} />
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

const TraitemenetsMedecin = () => {
    let { state } = useLocation();
    const navigate = useNavigate();
    JSON.parse(localStorage.getItem('user')).role !== 'admin' ? null : navigate('/404');
    const dispatch = useDispatch();
    const { records, loading, error, record } = useSelector((state) => state.traitements);
    useEffect(() => {
        state !== null ? dispatch(fetchTraitementsMedecin(state.medecin)) : dispatch(fetchTraitementsConsulte());
    }, [dispatch, state]);
    const rows = records;

    const theme = useTheme();
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchCount, setSearchCount] = useState();
    const InitialRows = useMemo(
        () => stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage]
    );

    const [visibleRows, setvisibleRows] = useState(InitialRows);
    useMemo(
        () => setvisibleRows(stableSort(rows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)),
        [order, orderBy, page, rowsPerPage, records]
    );
    const [rowsLength, setRowsLength] = useState(rows.length);

    const requestSearch = (searchedVal) => {
        if (searchedVal === '') {
            setvisibleRows(rows);
            setRowsLength(rows.length);
            setSearchCount(undefined);
            return;
        }
        const filteredRows = rows.filter((row) => {
            return (
                row.medecin.nom.toLowerCase().includes(searchedVal.toLowerCase()) ||
                row.medecin.prenom.toLowerCase().includes(searchedVal.toLowerCase())
            );
        });
        setvisibleRows(stableSort(filteredRows, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
        // setvisibleRows(filteredRows);
        setRowsLength(filteredRows.length);
        setSearchCount(filteredRows.length);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    return (
        <MainCard>
            <Box>
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
                <Stack direction="column" alignItems="center">
                    {loading ? <CircularProgress /> : null}
                </Stack>
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
                        <OrderTableHead order={order} orderBy={orderBy} />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.trackingNo);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                    >
                                        <TableCell align="left">
                                            {row.medecin ? (
                                                <Stack direction="column" alignItems="flex-start">
                                                    <Typography variant="subtitle1" minWidth="100%">
                                                        {row.medecin.nom} {row.medecin.prenom}
                                                    </Typography>
                                                    <Typography variant="subtitle2" color="textSecondary" fontWeight="normal">
                                                        {row.medecin.specialite.nom}
                                                    </Typography>
                                                </Stack>
                                            ) : (
                                                <Typography>--------</Typography>
                                            )}
                                        </TableCell>
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
                                        <TableCell align="left">{row.categorie.sous_type.urgence.libelle}</TableCell>
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            {row.categorie.libelle}
                                        </TableCell>
                                        <TableCell align="left">{row.date}</TableCell>
                                        <TableCell align="center">
                                            <OrderStatus status={row.etat} />
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

export default TraitemenetsMedecin;
