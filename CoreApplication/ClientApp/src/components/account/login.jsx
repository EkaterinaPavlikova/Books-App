import React  from 'react';
import { Link, Redirect } from "react-router-dom";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {userActions} from '../../actions/authorization.actions'
import {errorMessage} from '../../actions/error-message.actions'

class LoginPage extends React.Component {

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

                    <h2>Вход на сайт</h2>
                    <div>
                         <Link to="registration">Регистрация</Link>
                    </div>
                    {error && error.message!="" && <div className="text-danger">Неверный логин или пароль</div>}
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
                            <input  value="Войти" onClick={this.handleSubmit} className="btn btn-info" />
                        </div>
                        
                    </div>
                </div>
    }
}

LoginPage.propTypes ={
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
    dispatch(userActions.authorize(login, password))
},
    cleanMemory(){
    dispatch(errorMessage.clear());
}
})



const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 