import MovieTable, { IMovieTabelEvent } from '../../components/MovieTable'
import { connect } from "react-redux"
import { IRootState } from '../../redux/reducers/RootReducer'
import MovieAction from '../../redux/actions/MovieAction'
function mapStateToProps(state: IRootState) {
    return state.movie
}
function mapDispatchToProps(dispatch: any): IMovieTabelEvent {
    return {
        onLoad() {
            dispatch(MovieAction.fetchMovies({
                page: 1,
                limit: 10,
                key: ""
            }))
        },
        onSwitchChange(type, newState, id){
            dispatch(MovieAction.changeSwitch(type, newState, id))
        },
        async onDelete(id){
            await dispatch(MovieAction.deleteMovie(id));
        },
        onChange(newPage){
            dispatch(MovieAction.fetchMovies({
                page: newPage
            }))
        },
        onKeyChange(key){
            dispatch(MovieAction.setCondition({
                key
            }))
        },
        onSearch(){
            dispatch(MovieAction.fetchMovies({
                page: 1
            }))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieTable);
