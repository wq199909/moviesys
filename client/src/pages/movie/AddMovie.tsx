import React, { Component } from 'react'
import MovieForm from '../../components/MovieForm'
import { MovieService } from '../../services/MovieSerivice'

export default class extends Component{
    render() {
        return (
            <MovieForm onSubmit={async movie=>{
                const resp = await MovieService.add(movie);
                if(resp.data){
                    return "";
                }else{
                    return resp.err
                }
            }}></MovieForm>
        )
    }
}
