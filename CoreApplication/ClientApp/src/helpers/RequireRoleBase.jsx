import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from "react-router-dom";


class RequireRoleBase extends Component {
   
  ensureAuth(props) {
    const { isLoggedIn, isRehydrated } = props;
    if(!isRehydrated) {
      return false;
    }

    // if(!isLoggedIn) {    
    //   history.push('/login');
    // }     
    // else if(!this.hasRequiredRole(props)) {   
    //   history.push('/forbidden');
    // }

    return true;
  }

  hasRequiredRole({ requiredRole, currentUserRole }) {
    return requiredRole.length == 0 || this.contains(requiredRole, currentUserRole);
  }

  contains(requiredRole, currentUserRole ){
    let i=0;
    while(requiredRole.length != 0 && i < requiredRole.length)
    {
       if (currentUserRole.indexOf(requiredRole[i]) != -1) {
         return true;        
       }     
      i++;
    }

    return false;
  }


  componentWillReceiveProps(props) {
    this.ensureAuth(props);
  }

  componentDidMount() {
    this.ensureAuth(this.props);
  }
  render() {
    const { isLoggedIn, children, isRehydrated } = this.props;
    if(!isRehydrated || !isLoggedIn || !this.hasRequiredRole(this.props)){     
      if(!isRehydrated) {
      return null;
    }

    // if(!isLoggedIn) {   
    //   return <Redirect to='#/login'/> 
    // }     
    // else if(!this.hasRequiredRole(this.props)) {  
    //   return <Redirect to='#/forbidden'/>  
    // }


    }
    return <div>{children}</div>;
  }
}

 RequireRoleBase.propTypes ={
    isRehydrated: propTypes.bool,
    isLoggedIn: propTypes.bool,
    currentUserRole: propTypes.array,
    requiredRole: propTypes.array,
    children: propTypes.Component 
  }

  RequireRoleBase.defaultProps ={
    requiredRole: [],
    //currentUserRole: []
  }

const mapStateToProps = state => {
  const auth = state.authentication || {};
  return {
   isRehydrated: auth.loginSuccess,
    isLoggedIn: auth.loggedIn,
    currentUserRole: auth.user && auth.user.role ? auth.user.role.split(', ') : []
  };
};

const RequireRoleConnected = connect(mapStateToProps)(RequireRoleBase);

export const RequireRole = (WrappedComponent, requireRoleProps = {}) => {
  return function(props) {
    return (
      <RequireRoleConnected {...requireRoleProps}>
        <WrappedComponent {...props} />
      </RequireRoleConnected>
    );
  };
};
