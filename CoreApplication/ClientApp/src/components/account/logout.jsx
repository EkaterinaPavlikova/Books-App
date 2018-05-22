import { userActions } from '../../actions/authorization.actions'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types'

const Logout = ({ logout }) => {


    logout()
    return <Redirect to = '/' / >

}

Logout.propTypes = {
    logout: PropTypes.func
}


const mapDispatchToProps = dispatch =>
    ({
        logout() {
            dispatch(userActions.logout())
        }
    })

const connectedLogout = connect(null, mapDispatchToProps)(Logout)

export { connectedLogout as Logout }