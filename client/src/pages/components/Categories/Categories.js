import * as React from 'react';
import { useState } from 'react';
// material-ui
import {
    Box,
    Grid,
    Stack,
    Typography,
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormLabel,
    CircularProgress,
    Link
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Search, Add } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useTheme } from '@mui/material/styles';
import '../style.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategorie, editCategorie, fetchCategories, insertCategorie } from 'store/reducers/categories/categorieSlice';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
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
const ViewIcon = styled.a`
    padding: 4px 3px;
    border-radius: 4px;
    &:hover {
    background-color: #abfbbb
    ;
`;
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '3px'
};

const Red = {
    color: '#ed4337',
    margin: '0 0 0.2rem 0.2rem'
};

const Categories = () => {
    let { state } = useLocation();
    const dispatch = useDispatch();
    const { records, loading, error, record } = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(fetchCategories(state.urgence.id));
    }, [dispatch]);
    const rows = records;
    // do {} while (isLoading);

    // while (!isLoading) {}
    // console.log('data', JSON.parse(data), isLoading);

    const theme = useTheme();
    const [open, setOpen] = React.useState(null);
    const [base64URL, setBase64URL] = useState('');
    const [toBeDeleted, setToBeDeleted] = useState();
    const [rowsLength, setRowsLength] = useState(rows.length);
    const [searchCount, setSearchCount] = useState();
    const [updateValues, setUpdateValues] = React.useState({});
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openView, setOpenView] = React.useState(false);
    const [visibleRows, setvisibleRows] = useState(records);

    const requestSearch = (searchedVal) => {
        if (searchedVal === '') {
            setvisibleRows(rows);
            setRowsLength(rows.length);
            setSearchCount(undefined);
            return;
        }
        const filteredRows = rows.filter((row) => {
            return row.libelle.toLowerCase().includes(searchedVal.toLowerCase());
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

    const handleViewOpen = (row) => {
        setUpdateValues(row);
        setOpenView(true);
    };

    const handleViewClose = () => {
        setUpdateValues({});
        setOpenView(false);
    };

    const handleDeleteRow = () => {
        dispatch(deleteCategorie(toBeDeleted.id));
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
                sous_type_id: state.urgence.id,
                image: base64URL
            };
            values.id ? dispatch(editCategorie(values)) : dispatch(insertCategorie(values));
            dispatch(fetchCategories(state.urgence.id));
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
                        <DialogTitle id="alert-dialog-title">Voulez vous supprimez cet Categorie?</DialogTitle>
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
                <Dialog maxWidth="sm" fullWidth={true} open={openDialog} onClose={handleClose}>
                    <Box sx={{ p: 1, py: 1.5 }}>
                        <form onSubmit={formik.handleSubmit}>
                            <DialogContent>
                                <FormControl className="formControl">
                                    <input id="idUpdate" name="idU" hidden value={formik.values.id} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
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
                                        </Grid>
                                        <Grid item xs={8}>
                                            <FormLabel style={{ marginBottom: '0.5rem', color: theme.palette.secondary.darker }}>
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
                                                fullWidth
                                            />

                                            <FormLabel sx={{ marginBottom: '0.5rem', color: theme.palette.secondary.darker }}>
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
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button color="error" onClick={handleClose}>
                                    Annuler
                                </Button>
                                <Button variant="contained" type="submit">
                                    {formik.values.id ? 'Modifier' : 'Ajouter'}
                                </Button>
                            </DialogActions>
                        </form>
                    </Box>
                </Dialog>
            </Box>
            <Dialog maxWidth="sm" fullWidth={true} open={openView} onClose={handleClose}>
                <Box sx={{ p: 1, py: 1.5, width: 'inherit' }}>
                    <DialogContent>
                        <Stack direction="row" spacing={6}>
                            <div>
                                <div class="avatar-upload">
                                    <div class="avatar-preview">
                                        <div id="imagePreview"></div>
                                    </div>
                                </div>
                            </div>
                            <Box>
                                <Typography variant="h5" sx={{ marginBottom: '0.2rem' }}>
                                    Libellé :
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: '0.4rem' }}>
                                    {updateValues.libelle}
                                </Typography>
                                <Typography variant="h5" sx={{ marginBottom: '0.2rem' }}>
                                    Description :
                                </Typography>
                                <Typography variant="body1">{updateValues.description}</Typography>
                            </Box>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={handleViewClose}>
                            Fermer
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>
            <Stack direction="column" alignItems="center">
                {loading ? <CircularProgress /> : null}
            </Stack>
            <Typography variant="h5" sx={{ margin: '1rem 0', fontWeight: '500' }}>
                Les categories du sous-type {state.urgence.libelle}:
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {rows.map((row, index) => {
                    return (
                        <Grid item xs={3} key={row.id}>
                            <MainCard
                                sx={{
                                    height: '100%',
                                    BorderColor: '#000'
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

                                    <Typography variant="h5">{row.libelle}</Typography>
                                    <Typography variant="body1">{row.description}</Typography>

                                    <div>
                                        <ViewIcon>
                                            <EyeOutlined
                                                style={{ color: theme.palette.success.main, cursor: 'pointer', fontSize: '20px' }}
                                                onClick={() => {
                                                    handleViewOpen(row);
                                                }}
                                            />
                                        </ViewIcon>
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

export default Categories;
