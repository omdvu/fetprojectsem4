import { Routes } from '@angular/router';
import { AuthGuard } from './component/auth.guard';
import { SignupFormComponent } from './component/signup-form/signup-form.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductsComponent } from './component/products/products.component';
import { CartComponent } from './component/cart/cart.component';
import { HomeProductsComponent } from './component/home-products/home-products.component';
import { ProductDisplayComponent } from './component/product-display/product-display.component';
import { ProductViewComponent } from './component/product-view/product-view.component';

export const routes: Routes = [
    {
        path:"signup",
        component:SignupFormComponent
    },
    {
        path: 'home',
        component: HomePageComponent,
        children: [
          {path:'',component:DashboardComponent},
          {path:'products',component:ProductsComponent,children:[{path:'',component:HomeProductsComponent},{path:'list',component:ProductDisplayComponent}]},
          {path:'cart',component:CartComponent},
          {path:'view',component:ProductViewComponent}
        ],
        canActivate: [AuthGuard]
    },
    {
        path:"login",
        component:LoginFormComponent
    },
    { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: 'login' 
    }
];
