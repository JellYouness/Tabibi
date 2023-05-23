// assets
import {
    MedicalServicesOutlined,
    MonitorHeartOutlined,
    MasksOutlined,
    ManageAccountsOutlined,
    MedicalInformationOutlined
} from '@mui/icons-material';

// icons
const icons = {
    MasksOutlined,
    MonitorHeartOutlined,
    MedicalServicesOutlined,
    ManageAccountsOutlined,
    MedicalInformationOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Utilities',
    type: 'group',
    children: [
        {
            id: 'util-patients',
            title: 'Patients',
            type: 'item',
            url: '/patients',
            icon: icons.MasksOutlined
        },
        {
            id: 'util-medecins',
            title: 'Medecins',
            type: 'item',
            url: '/medecins',
            icon: icons.MedicalInformationOutlined
        },
        {
            id: 'util-specialites',
            title: 'Spécialites',
            type: 'item',
            url: '/specialites',
            icon: icons.MonitorHeartOutlined
        },
        {
            id: 'util-urgences',
            title: 'Urgences',
            type: 'item',
            url: '/urgences',
            icon: icons.MedicalServicesOutlined
        },
        {
            id: 'util-utilisateurs',
            title: 'Utilisateurs',
            type: 'item',
            url: '/utilisateurs',
            icon: icons.ManageAccountsOutlined
        },
        {
            id: 'util-soustypes',
            title: 'Soustypes',
            type: 'item',
            url: '/soustypes',
            icon: icons.MedicalServicesOutlined,
            hidden: true
        },
        {
            id: 'util-categories',
            title: 'Categories',
            type: 'item',
            url: '/categories',
            icon: icons.MedicalServicesOutlined,
            hidden: true
        }
    ]
};

export default utilities;
