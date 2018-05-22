import * as React from "react";
import PropTypes from 'prop-types'

export const SelectGenres = ({genres, initialValue, onChangeAction}) => {
   return <select className="form-control" onChange={onChangeAction} value={initialValue}>
                    {
                        genres && genres.map((genre, i) =>
                        genre&&<option key ={i} value={genre}>{genre.genreName}</option>)
                    }
    </select>    
}

SelectGenres.propTypes = {
    genres: PropTypes.object,
    initialValue: PropTypes.func,
    onChangeAction:PropTypes.func
}

export const SelectAuthors = ({authors, initialValue, onChangeAction}) =>{
    return <select className="form-control" onChange={onChangeAction} value={initialValue}>
                    {
                        authors && authors.map((author, i) =>
                        author&&<option key ={i} value={author}>{author.name}</option>)
                    }
                </select>
            }
             SelectAuthors.propTypes = {
            authors: PropTypes.object,
                initialValue: PropTypes.func,
                onChangeAction:PropTypes.func
            }