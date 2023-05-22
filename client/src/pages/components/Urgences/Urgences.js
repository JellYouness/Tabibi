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
import { deletePatient, editPatient, fetchPatients, insertPatient } from 'store/reducers/patients/patientSlice';
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

const Patients = () => {
    const dispatch = useDispatch();
    const { records, loading, error, record } = useSelector((state) => state.patients);
    useEffect(() => {
        dispatch(fetchPatients());
    }, [dispatch]);
    const rows = records;
    // do {} while (isLoading);

    // while (!isLoading) {}
    // console.log('data', JSON.parse(data), isLoading);

    const theme = useTheme();
    const [open, setOpen] = React.useState(null);
    const [base64URL, setBase64URL] = useState('');
    const [toBeDeleted, setToBeDeleted] = useState();
    const [searchCount, setSearchCount] = useState();
    const [updateValues, setUpdateValues] = React.useState({});
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

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
        dispatch(deletePatient(toBeDeleted.id));
        handleDeleteClose();
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: updateValues,
        onSubmit: (values, actions) => {
            values = {
                id: values.id || null,
                libelle: values.libelle,
                description: values.description,
                image: base64URL
            };
            values.id ? dispatch(editPatient(values)) : dispatch(insertPatient(values));
            dispatch(fetchPatients());
            handleClose();
            try {
            } catch (error) {
                setError(error.response.data);
            }
        },
        validationSchema: yup.object({
            libelle: yup.string().max(50, 'Trop Long').required('La libelle est requis'),
            description: yup.string().max(50, 'Trop Long').required('La description est requis')
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
                        <DialogTitle id="alert-dialog-title">Voulez vous supprimez cet Patient?</DialogTitle>
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
                                        <div>
                                            <FormLabel style={{ color: theme.palette.secondary.darker }}>Photo:</FormLabel>
                                            <div class="avatar-upload">
                                                <div class="avatar-edit">
                                                    <input
                                                        type="file"
                                                        id="imageUpload"
                                                        accept=".png, .jpg, .jpeg"
                                                        onChange={handleImageChange}
                                                    />
                                                    <FormLabel for="imageUpload" id="label"></FormLabel>
                                                </div>
                                                <div class="avatar-preview">
                                                    <div id="imagePreview"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form">
                                            <FormLabel style={{ marginBottom: '0.2rem', color: theme.palette.secondary.darker }}>
                                                Libellé:
                                            </FormLabel>
                                            <TextField
                                                id="libelle"
                                                name="libelle"
                                                type="text"
                                                placeholder="Enter la libelle"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.libelle}
                                                error={formik.touched.libelle && formik.errors.libelle}
                                                helperText={formik.touched.libelle && formik.errors.libelle}
                                            />

                                            <FormLabel style={{ marginBottom: '0.2rem', color: theme.palette.secondary.darker }}>
                                                Description:
                                            </FormLabel>
                                            <TextField
                                                id="description"
                                                placeholder="Enter la description"
                                                type="text"
                                                multiline
                                                rows={4}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                                error={formik.touched.description && formik.errors.description}
                                                helperText={formik.touched.description && formik.errors.description}
                                            />
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

            <Stack direction="column" alignItems="center">
                {loading ? <CircularProgress /> : null}
            </Stack>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginTop: '1rem' }}>
                {rows.map((row, index) => {
                    return (
                        <Grid item xs={3} key={row.id}>
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

                                    <Typography variant="h5">"{row.libelle}"</Typography>
                                    <Typography variant="body1">"{row.description}"</Typography>

                                    <div>
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
                                    </div>
                                </Stack>
                            </MainCard>
                        </Grid>
                    );
                })}
            </Grid>
        </MainCard>
    );
};

export default Patients;
