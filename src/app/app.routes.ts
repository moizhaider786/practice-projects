import { Routes } from '@angular/router';
import { CreateExpense } from './pages/create-expense';
import { UpdateExpense } from './pages/update-expense';
import { Home } from './pages/home';
export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'create-expense',
        component: CreateExpense
    },
    {
        path: 'update-expense',
        component: UpdateExpense
    },
];
