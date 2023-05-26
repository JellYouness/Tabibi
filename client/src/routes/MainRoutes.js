import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - utilities
const Patients = Loadable(lazy(() => import('pages/components/Patients/Patients')));
const Specialites = Loadable(lazy(() => import('pages/components/Specialites/Specialites')));
const Medecins = Loadable(lazy(() => import('pages/components/Medecins/Medecins')));
const Urgences = Loadable(lazy(() => import('pages/components/Urgences/Urgences')));
const SousTypes = Loadable(lazy(() => import('pages/components/SousTypes/SousTypes')));
const Categories = Loadable(lazy(() => import('pages/components/Categories/Categories')));
const Utilisateurs = Loadable(lazy(() => import('pages/components/Utilisateurs/Utilisateurs')));
const TraitementsConsulte = Loadable(lazy(() => import('pages/components/Traitements/TraitementsConsulte')));
const TraitementsNonConsulte = Loadable(lazy(() => import('pages/components/Traitements/TraitementsNonConsulte')));
const TraitementsMedecin = Loadable(lazy(() => import('pages/components/Traitements/TraitementsMedecin')));
const TraitementsPatient = Loadable(lazy(() => import('pages/components/Traitements/TraitementsPatient')));
const Page404 = Loadable(lazy(() => import('pages/components/404')));
const Home = Loadable(lazy(() => import('pages/components/Home')));

// ==============================|| MAIN ROUTING ||============================== //
const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />,
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'traitements-consulte',
            element: <TraitementsConsulte />
        },
        {
            path: 'traitements-nonconsulte',
            element: <TraitementsNonConsulte />
        },
        {
            path: 'traitements-medecin',
            element: <TraitementsMedecin />
        },
        {
            path: 'traitements-patient',
            element: <TraitementsPatient />
        },
        {
            path: 'patients',
            element: <Patients />
        },
        {
            path: 'medecins',
            element: <Medecins />
        },
        {
            path: 'specialites',
            element: <Specialites />
        },
        {
            path: 'urgences',
            element: <Urgences />
        },
        {
            path: 'soustypes',
            element: <SousTypes />
        },
        {
            path: 'categories',
            element: <Categories />
        },
        {
            path: 'utilisateurs',
            element: <Utilisateurs />
        },
        {
            path: '404',
            element: <Page404 />
        }
    ]
};

export default MainRoutes;
