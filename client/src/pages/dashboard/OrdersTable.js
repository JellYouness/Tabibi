import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

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
    Chip
} from '@mui/material';
import { Add } from '@mui/icons-material';

// third-party
import NumberFormat from 'react-number-format';
import { deleteTraitement, editTraitement, fetchTraitements, insertTraitement } from 'store/reducers/traitements/traitementSlice';

// project import
import Dot from 'components/@extended/Dot';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

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
        id: 'medecin',
        align: 'left',
        disablePadding: false,
        label: 'Medecin'
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

const OrderTable = () => {
    const dispatch = useDispatch();
    const { records, loading, error, record } = useSelector((state) => state.traitements);
    useEffect(() => {
        dispatch(fetchTraitements());
    }, [dispatch]);
    const rows = records;

    const theme = useTheme();
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    return (
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
                                        <TableCell align="left">
                                            {row.medecin ? (
                                                <Stack direction="column" alignItems="flex-start">
                                                    <Typography
                                                        component={RouterLink}
                                                        to="/traitements-medecin"
                                                        state={{ medecin: row.medecin.id }}
                                                        variant="subtitle1"
                                                        minWidth="100%"
                                                    >
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
    );
};

export default OrderTable;
