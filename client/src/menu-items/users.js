// assets
import { ManageAccountsOutlined } from '@mui/icons-material';

// icons
const icons = {
    ManageAccountsOutlined
};

// ==============================|| MENU ITEMS - users ||============================== //

const users = {
    id: 'group-users',
    title: 'Administartion',
    type: 'group',
    children: [
        {
            id: 'util-utilisateurs',
            title: 'Utilisateurs',
            type: 'item',
            url: '/utilisateurs',
            icon: icons.ManageAccountsOutlined
        }
    ]
};

export default users;
