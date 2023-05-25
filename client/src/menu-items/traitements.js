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
    title: 'Traitements',
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
        }
    ]
};

export default traitement;
