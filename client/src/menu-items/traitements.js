// assets
import {
    ReceiptLongOutlined,
    PendingActionsOutlined,
    MedicalServicesOutlined,
    MasksOutlined
} from '@mui/icons-material';

// icons
const icons = {
    ReceiptLongOutlined,
    PendingActionsOutlined,
    MasksOutlined,
    MedicalServicesOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const traitement = {
    id: 'group-traitement',
    title: 'Consultations',
    type: 'group',
    children: [
        {
            id: 'Traitements',
            title: 'Consultés',
            type: 'item',
            url: '/traitements-consulte',
            icon: icons.ReceiptLongOutlined,
            breadcrumbs: true
        },
        {
            id: 'TraitementsNon',
            title: 'Non Consultés',
            type: 'item',
            url: '/traitements-nonconsulte',
            icon: icons.PendingActionsOutlined,
            breadcrumbs: true
        },
        {
            id: 'TraitementsMed',
            title: 'Cons. par Medecin',
            type: 'item',
            url: '/traitements-medecin',
            icon: icons.MedicalServicesOutlined,
            breadcrumbs: true
        },
        {
            id: 'TraitementsPat',
            title: 'Cons. par Patient',
            type: 'item',
            url: '/traitements-patient',
            icon: icons.MasksOutlined,
            breadcrumbs: true
        }
    ]
};

export default traitement;
