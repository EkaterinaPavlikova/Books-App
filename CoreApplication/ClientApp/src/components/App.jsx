import React from 'react'

import {
     HashRouter,
     Route ,
     Switch
} from 'react-router-dom'
import{roles} from '../constans/roles.constants'
import { history } from '../helpers/history'

import {
    Home,
    Login,
    Logout,
    Registration,
    Forbidden,
    Library,
    UserBooks,
    Basket,
    StorekeeperPage,
    LibrarianPage
    
} from "../helpers/pages"

import {RequireRole} from "../helpers/RequireRoleBase"
import { Layout } from './layout';


const App = () =>
 
     <HashRouter>      
        <Layout>
        <Switch>   
                <Route  exact path="/" component={Home} /> 
                <Route  path="/home" component={Home} />          
                <Route  path="/login" component = {Login} />
                <Route  path="/logout" component = {Logout} />
                <Route  path="/registration" component = {Registration} />
                <Route  path="/forbidden" component={Forbidden} />
                <Route  path="/storekeeperpage" component = {StorekeeperPage} />
    
                <Route  path="/library" component = {RequireRole(Library, {requiredRole: [roles.ROLE_USER, roles.ROLE_ADMIN] })} />
                <Route  path="/mybooks" component = {RequireRole(UserBooks, {requiredRole: [roles.ROLE_USER, roles.ROLE_ADMIN ]})} />
                <Route  path="/basket" component = {RequireRole(Basket, {requiredRole: [roles.ROLE_USER, roles.ROLE_ADMIN ]})} />
                <Route  path="/storekeeperpage" component = {RequireRole(StorekeeperPage, {requiredRole: [roles.ROLE_STOREKEEPER, roles.ROLE_ADMIN] })} />
                <Route  path="/librarianpage" component = {RequireRole(LibrarianPage, {requiredRole: [roles.ROLE_lIBRARIAN, roles.ROLE_ADMIN] })} />            
        </Switch>
        </Layout>         
     </HashRouter>    
    



export default App      
