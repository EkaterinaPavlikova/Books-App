import React  from 'react';
import PropTypes from 'prop-types'
import  {MainMenu} from './menus'

export const Layout = ({children}) =>
    
    <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-2'>
                <MainMenu />
                </div>
                <div className='col-sm-10'>
                    { children }
                </div>
            </div>
        </div>  
      

 Layout.propTypes = {
    children: PropTypes.node.isRequired
 }   
