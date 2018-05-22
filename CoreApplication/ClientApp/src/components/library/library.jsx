import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bookConstants } from "../../constans/book.constans"
//import SearchingText from './SearchTextFilter';
// import Genres from './GenreFilter';
// import Pagination from "../Pagination";
 import {libraryActions} from '../../actions/library.actions'

 class Library extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount(){
        const {getFilteredBooks, 
            selectedGenre,
            searchingString,
            paging } = this.props
        getFilteredBooks(paging, searchingString, selectedGenre);
    }
    render() {

        const {books, addToCart} = this.props
        return (
            <div className="row">
                <div className="col-sm-1">
                     
                </div>
                <div className="col-sm-11">
                    <div className="container body-content">
                     
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
                                    books.map((book) =>
                                        <tr key={book.id}>
                                            <th>{book.title}</th>
                                            <th>{book.author && book.author.name}</th>
                                            <th>{book.genre && book.genre.genreName}</th>
                                            <th>{book.year}</th>
                                            <th>{book.count}</th>
                                            <th>
                                                <button className="btn btn-sm btn-success" onClick={addToCart(book.id)}>Добавить</button>
                                            </th>
                                        </tr>)
                                }
                            </tbody>
                        </table>
                        <div className="text-centre">
                       
                        </div>
                        </div>
                </div>
            </div>
            );

    }
}

Library.propTypes ={
    books: PropTypes.object,
    selectedGenre: PropTypes.string,
    searchingString: PropTypes.string,
    paging:PropTypes.number ,
    addToCart: PropTypes.function,
    getFilteredBooks: PropTypes.function
}

function mapStateToProps(state) {
    const { 
        books, 
        selectedGenre,
        searchingString,
        paging 
    } = state;
    return {
        books, 
        selectedGenre,
        searchingString,
        paging
    };
}

const mapDispatchToProps = dispatch =>
({
    addToCart(bookId) {
    //dispatch(libraryActions.addToCart(bookId))
},

    getFilteredBooks(selectedPage, searchString, genre, filter){
        dispatch(libraryActions.FilterBooks(selectedPage, searchString, genre, filter))
    }
})



const connectedLibrary = connect(mapStateToProps, mapDispatchToProps)(Library);
export { connectedLibrary as Library }; 

