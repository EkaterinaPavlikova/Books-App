import * as React from "react";
import PropTypes from 'prop-types'


export class AddBook extends React.Component {
    constructor() {
        super();
        this.state = {          
            title: "",
            count: 0,
            year: 0,
            author: {},
            genre: {},
            submitted: false
            
        };
        this.addNewBook = this.addNewBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    addNewBook() {

        this.setState({ submitted: true });
        const {title, year} = this.state;
        
        if(title!='' && (year<=2018 && year>=1000)){
            
            const {addBook} = this.props;        
            addBook(...this.state);
        }
    
}

   render() {

    const {cancel, authors, genres} = this.props
    const {title, year, count, submitted} = this.state
    const yearConstrain = (year<1000 || year>2018)
        return <div className="col-md-4 col-md-offset-4">

            <h2>Добавление</h2>
            <hr />
            <div className="row">
                
                                          
                      <div className={'form-group' + (submitted && title=='' ? ' has-error' : '')}>
                            <label className="control-label">Название</label>
                            <input type="text" name="title"
                                value={title}
                                className="form-control"
                                onChange={this.handleChange}/>
                                {submitted && !title &&
                            <div className="help-block">*Поле обязательно для заполнения</div>}
                        </div>
                        <div className={"form-group" + (submitted && yearConstrain ? ' has-error' : '')}>
                            <label className="control-label">Год</label>
                            <input type="number" name ="year"
                                value={year}
                                className="form-control"
                                onChange={this.handleChange}/>
                                { submitted && yearConstrain &&
                            <div className="help-block">Год должен быть в промежутке от 1000 до 2018</div>}
                        </div>
                        <div className="form-group">
                    <label className="control-label">Автор</label>
                    <select className="form-control" onChange={this.handleChange} name="author" >
                        <option value="" selected disabled hidden></option>
                        {
                            authors && authors.map((author, i) =>
                                        <option key={i} value={author}>{author.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Жанр</label>
                            <select className="form-control" onChange={this.handleChange} name="genre" >
                                 <option value="" selected disabled hidden></option>
                                {
                                    genres && genres.map((genre, i) =>
                                        <option key={i} value={genre}>{genre.genreName}</option>)
                                }
                            </select>    
                         </div>
                        <div className="form-group">
                            <label className="control-label">Количество</label>
                            <input type="number" min="0"
                                name="count"
                                value={count}
                                className="form-control"
                                onChange={ this.handleChange} />
                        </div>
                        <div className="text-center">
                    <button type="submit" className="btn btn-success" onClick={this.addNewBook}>Добавить</button>     
                    <button type="submit" className="btn btn-primary" onClick={cancel}>Отмена</button> 
                </div>
                    
                
            </div>


        </div>
    }
    
    }

AddBook.propTypes = {
    error: PropTypes.object,
    books : PropTypes.array,
    genres : PropTypes.array,
    authors: PropTypes.array,
    cancel: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired

}