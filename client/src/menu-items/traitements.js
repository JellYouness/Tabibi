// assets
import { ReceiptLongOutlined, PendingActionsOutlined, MedicalServicesOutlined, MasksOutlined } from '@mui/icons-material';

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
            title: 'Historique medecin',
            type: 'item',
            url: '/traitements-medecin',
            icon: icons.MedicalServicesOutlined,
            breadcrumbs: true
        },
        {
            id: 'TraitementsPat',
            title: 'Historique patient',
            type: 'item',
            url: '/traitements-patient',
            icon: icons.MasksOutlined,
            breadcrumbs: true
        }
    ]
};

export default traitement;
