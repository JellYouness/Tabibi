import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

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

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
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
            path: 'traitements-consulte',
            element: <TraitementsConsulte />
        },
        {
            path: 'traitements-nonconsulte',
            element: <TraitementsNonConsulte />
        }
    ]
};

export default MainRoutes;
