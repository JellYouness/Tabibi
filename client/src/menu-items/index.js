// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import traitement from './traitements';
// const user = JSON.parse(localStorage.getItem('user'));
// let roots;
// switch (user.role) {
//     case 'prestataire':
//         roots = [dashboard, traitement];
//         break;
//     case 'admin':
//         roots = [utilities];
//         break;
//     case 'super':
//         roots = [dashboard, traitement, utilities];
//         break;
// }

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, traitement, utilities]
};

export default menuItems;
