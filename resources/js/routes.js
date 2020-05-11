// Pages
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Client from './pages/Client'
import ViewClient from './pages/Client/ViewClient'
import Location from './pages/Location'

// Routes
export const routes = [
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/clients',
            name: 'clients',
            component: Client,
            meta: {
                 requiresAuth: true,
            }
        },
        {
            path: '/clients/create',
            name: 'clients-create',
            component: ViewClient,
            meta: {
                 requiresAuth: true,
            }
        },
        {
            path: '/clients/edit/:id',      
            name: 'clients-edit',
            component: ViewClient,
            meta: {
                 requiresAuth: true,
            }
        },
        {
            path: '/locations',
            name: 'locations',
            component: Location,
            meta: {
                 requiresAuth: true,
            }
        },
        { 
            path: '/404', 
            name: '404', 
            component: NotFound,
        },
        { 
            path: '*', 
            redirect: '/clients', 
        }
    ]
