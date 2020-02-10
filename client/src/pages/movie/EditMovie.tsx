import React, { Component } from 'react'
import { RouteComponentProps } from 'react-router'
import ImgUploader from '../../components/ImgUploader'
import MovieForm from '../../components/MovieForm';
import { MovieService, IMovie } from '../../services/MovieSerivice';
interface IParams {
    id: string
}
interface IState {
    movie?: IMovie
}
export default class extends Component<RouteComponentProps<IParams>, IState>  {
    state: IState = {
        movie: undefined
    }
    async componentDidMount(){
        const resp = await MovieService.getMovieById(this.props.match.params.id);
        if(resp.data){
            this.setState({
                movie: resp.data
            })
        }
    }
    render() {
        return (
            <MovieForm
                movie={this.state.movie}
                onSubmit={async movie => {
                    const resp = await MovieService.edit(this.props.match.params.id, movie);
                    if (resp.data) {
                        return "";
                    } else {
                        return resp.err
                    }
                }}></MovieForm>
        )
    }
}
