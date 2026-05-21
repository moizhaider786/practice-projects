import { Routes } from '@angular/router';

import { Home } from './pages/home';
import { Categories } from './pages/categories';
export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'categories',
        component: Categories
    }
];
