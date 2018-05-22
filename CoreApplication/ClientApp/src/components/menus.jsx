import React  from 'react'
import HomeIcon from 'react-icons/lib/fa/home'
import TiShoppingCart from 'react-icons/lib/ti/shopping-cart'
import GoSignOut from 'react-icons/lib/go/sign-out'
import GoSignIn from 'react-icons/lib/go/sign-in'
import '../../stylesheets/menu.scss';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import {menu as MenuConstatnts} from '../constans/user.menu.constants'

export const MainMenu = () =>{
   return <div className="main-nav"> 
            <div className='navbar navbar-inverse'>
                <div className='navbar-header'>   
                <label>Library Core And React</label>       
                 </div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <HelloUser/> 
                        <li><NavLink to="/home"><HomeIcon/> HOME</NavLink> </li>                                            
                        <MenuItems/>
                        <EnterOrExit/>
                    </ul>
                </div>
            </div>
    </div>
}
   
    const MenuItems = connect(mapStateToPropsMenu)(({menuItems}) =>{
                        
       return  menuItems && menuItems.map((item, i) => 
        item &&<li> <NavLink key={i} to={item.path}>{item.title}</NavLink></li> )}
    );

    const HelloUser = connect(mapStateToPropsUser)(({user}) => {
     
        return user && <li><label>Привет, {user.login} </label></li>}
    );

    const EnterOrExit =  connect(mapStateToPropsUser)(({user}) =>    
        { return user ? <li><NavLink to="/logout"><GoSignOut/> Выход </NavLink></li> : <li><NavLink to="/login"><GoSignIn/> Вход</NavLink></li> }
    );


    function mapStateToPropsUser(state) {
        const user = state.authentication.user && state.authentication.loginSuccess  ? state.authentication.user: null;
        return {
            user
        };
    }


    function mapStateToPropsMenu(state) {
    
        const user = state.authentication.user ? state.authentication.user: null;
        const  userMenu  = user && user.menuItems != undefined  ? (state.authentication.user.menuItems).split(', ') : [];
        const menu = MenuConstatnts

        let menuItems = null;
        if (userMenu.length != 0){
            
            menuItems = userMenu.map((item) => 
            {
                let i = 0, 
                    index = -1;
                    
                while (menu.length != 0 && i < menu.length){

                    if(menu[i].title == item) { 
                        index = i;
                        break;
                    }
                    i++;
                    
                }
                if ( index != -1) 
                    return menu[index];       
            }

        )
        }

        return {
            menuItems
        };
    }

