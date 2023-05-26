// assets
import { ReceiptLongOutlined, PendingActionsOutlined } from '@mui/icons-material';

// icons
const icons = {
    ReceiptLongOutlined,
    PendingActionsOutlined
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
            icon: icons.PendingActionsOutlined,
            breadcrumbs: true
        },
        {
            id: 'TraitementsPat',
            title: 'Cons. par Patient',
            type: 'item',
            url: '/traitements-patient',
            icon: icons.PendingActionsOutlined,
            breadcrumbs: true
        }
    ]
};

export default traitement;
