import * as React from "react";
import PropTypes from 'prop-types'
import {SelectGenres, SelectAuthors} from './selectComponents'

export class EditableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.makeEditable = this.makeEditable.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    makeEditable(flag) {
        this.setState({ editing: flag });
    }
    updateBook() {
       
        const {editBook, isEditBook, item } = this.props;
        const editedBook = {           
            title:this.title && this.title.value,
            year: this.year && this.year.value,
            genre: this.genre,         
            author: this.author,     
            count: this.count && this.count.value
        }
        editBook(editedBook);
        isEditBook(item.id, false)
        this.makeEditable(false);

    }


    renderEditField(book) {

        const { genres, authors, isEditBook} = this.props

        return (
            
            book && <tr key={book.id}>
            <th><input ref={input => this.title = input} 
                value={book.title}
                type="text"              
                className="form-control"
               
               /></th>
            
            
            <th>
            <SelectAuthors initialValue={book.author} onChangeAction={(value)=>{this.author=value}}  authors = {authors}/>
            </th>
            <th>
             <SelectGenres initialValue={book.genre} onChangeAction={(value)=>{this.genre=value}}  genres = {genres}/>         
             </th>
             <th><input type="number"
                ref={input => this.year = input}
                value={book.year}
                className="form-control"
               
            /></th>
            <th><input type="number"
            ref={input => this.count = input}
                value={book.count}
                className="form-control"/></th>
            <th>
                <button className="btn btn-sm btn-success" onClick={()=>{this.updateBook.bind(this)}}>Сохранить</button>
            </th>
            <th>
                <button className="btn btn-sm btn-primary" onClick={()=>{this.makeEditable(false);isEditBook(book.id, false)}}>Отмена</button>
            </th>
           
        </tr>)
    }

    renderSimpleField(book) {

        const { deleteBook, isEditBook} = this.props;
        return ( 
        book && <tr key={book.id}>
            <th>{book.title}</th>
            <th>{book.author.name}</th>
            <th>{book.genre.genreName}</th>
            <th>{book.year}</th>
            <th>{book.count}</th>         
            <th>
                <button className="btn btn-sm btn-success" onClick={()=>{this.makeEditable(true); isEditBook(book.id, true); }}>Изменить</button>
            </th>
            <th>
                <button className="btn btn-sm btn-danger" onClick={()=> {deleteBook(book.id)}}>Удалить</button>
            </th>
        </tr>)
    }

 render() {

        const {item} = this.props
        const {editing} = this.state

        if (item && editing) {
            return this.renderEditField(item)
        } else {
            return this.renderSimpleField(item)
        }
    }
}

EditableRow.propTypes = {
    error: PropTypes.object,
    item: PropTypes.object,
    books : PropTypes.array,
    genres : PropTypes.array,
    authors: PropTypes.array,
    deleteBook : PropTypes.func.isRequired,
    editBook : PropTypes.func.isRequired,
    isEditBook: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired

}