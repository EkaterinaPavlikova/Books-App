import React  from 'react'
import PropTypes from 'prop-types'
import {connect } from 'react-redux'
import {booksActions} from '../../actions/books.actions'
import {EditableRow} from './editableRow'
import {AddBook} from './addBook'

class StorekeeperPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {                     
            showAddBookForm : false
        };
        
        this.changeAddBookForm = this.changeAddBookForm.bind(this);
    }

    componentDidMount(){
        this.props.getBooks();
    }
    changeAddBookForm(){
        this.setState(prevState => ({ showAddBookForm: !prevState.showAddBookForm }));
    } 

    render() {

        const {books} = this.props
        const {showAddBookForm} = this.state

        return (
        <div className="col-sm-11">
                <div className="container body-content" >
                    <div className="header text-center">
                        <h2>Все книги</h2>
                    </div>
                    <table className="table table-hover table-condensed ">
                        <thead>
                            <tr>
                                <th>Книга</th>
                                <th>Автор</th>
                                <th>Жанр</th>
                                <th>Год</th>
                                <th>Количество</th>
                                <th>Действие</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                books &&
                                books.map((book, i) =>
                                    <EditableRow key = {i} item={book} {...this.props}/>)
                            }
                        </tbody>
                    </table>
                   
                </div>

                <div className="text-center">
                    {
                         showAddBookForm
                             ? <AddBook cancel={this.changeAddBookForm} {...this.props} />
                             : <button className="btn btn-primary" onClick={this.changeAddBookForm}>Добавить книгу</button>
                    }
                </div>
            </div>
    )}
}

StorekeeperPage.propTypes = {
    error: PropTypes.object,
    books : PropTypes.array,
    genres : PropTypes.array,
    authors: PropTypes.array,
    deleteBook : PropTypes.func.isRequired,
    isEditBook: PropTypes.func.isRequired,
    editBook : PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired

}

StorekeeperPage.defaultProps = {

    books : [],
    genres: [],
    authors: [],
    deleteBook : ()=>{},
    isEditBook: ()=> {},
    editBook : ()=>{},
    addBook: ()=>{},
    getBooks:()=>{},
}


function mapStateToProps(state) {
    const { books, genres, authors, error } = state;
    return {
        books, genres, authors, error
    };
}

const mapDispatchToProps = dispatch =>
({
    deleteBook(id) {
    dispatch( booksActions.Delete(id))
},
    isEditBook(id, isEditStatus){
    dispatch(booksActions.IsEdit(id, isEditStatus));
},
    editBook(book){
    dispatch(booksActions.Edit(book));
},
    addBook(book){
    dispatch(booksActions.Add(book));
},
    getBooks(){
    dispatch(booksActions.SetBooks());
    }
})



const connectedStorekeeperPage= connect(mapStateToProps, mapDispatchToProps)(StorekeeperPage);
export { connectedStorekeeperPage as StorekeeperPage }; 