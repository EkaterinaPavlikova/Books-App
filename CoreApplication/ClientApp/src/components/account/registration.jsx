import React  from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import {userActions} from '../../actions/authorization.actions'
import {errorMessage} from '../../actions/error-message.actions'

 class RegistrationPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {           
            submitted: false,
            password: '',
            login: ''
            
        };

        const { cleanMemory } = this.props;      
        cleanMemory();
       
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange  = this.handleChange.bind(this);
    
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(){
        
        this.setState({ submitted: true });
        const {password, login} = this.state;

        if(password!='' && login != ''){
            this.props.authorize(login, password);
        }

    }

    render() {
        const {submitted, login, password } = this.state;
        const {error, isLogged} = this.props;
        
        if(isLogged) {
            return <Redirect to='/'/>
        }
        return  <div className="col-md-3 col-sm-offset-4">
                    
                    <h2>Регистрация</h2>
                    
                    {error && error.message!="" && <div className="text-danger">Логин занят</div>}
                
                    <div>
                        <div className={'form-group' + (submitted && login=='' ? ' has-error' : '')}>
                            <label>Логин: </label>
                            <input  type="text" className="form-control" name = "login" value={login}  onChange={this.handleChange} />
                            {submitted && !login &&
                            <div className="help-block">*Поле обязательно для заполнения</div>
                        }
                        </div>
                        <div className={'form-group' + (submitted && password=='' ? ' has-error' : '')}>
                            <label>Пароль:</label>
                            <input type="password" className="form-control" value={password} name = "password" onChange={this.handleChange}/>
                            {submitted && !password &&
                            <div className="help-block">*Поле обязательно для заполнения</div>
                        }
                        </div>
                        

                        <div className="form-group">
                            <input value="Регистрация" onClick={this.handleSubmit} className="btn btn-info " />
                        </div>
                    </div>
                </div>
    }
}

RegistrationPage.propTypes ={
    isLogged: PropTypes.bool,
    error: PropTypes.object,
    authorize: PropTypes.function,
    cleanMemory: PropTypes.function

}

function mapStateToProps(state) {
    const { error, authentication } = state;
    const isLogged = authentication && authentication.loginSuccess ? authentication.loginSuccess: false
    return {
        error,
        isLogged
    };
}

const mapDispatchToProps = dispatch =>
({
    authorize(login, password) {
    dispatch(userActions.register(login, password))
},
    cleanMemory(){
    dispatch(errorMessage.clear());
}
})



const connectedRegistrationPage = connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
export { connectedRegistrationPage as RegistrationPage }; 