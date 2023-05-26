// project import
import dashboard from './dashboard';
import utilities from './utilities';
import traitement from './traitements';
import users from './users';

const roleRoots = (role) => {
    switch (role) {
        case 'prestataire':
            return [dashboard, traitement];
        case 'admin':
            return [utilities];
        default:
            return [dashboard, traitement, users, utilities];
    }
};

// ==============================|| MENU ITEMS ||============================== //

const menuItems = (role) => {
    return roleRoots(role);
};

export default menuItems;
