import { IAction } from "./ActionTypes"
import { IMovie, MovieService } from "../../services/MovieSerivice"
import { ISearchCondition, SwitchType } from "../../services/CommonTypes"
import { ThunkAction } from "redux-thunk"
import { IRootState } from "../reducers/RootReducer"
export type SaveMoviesAction = IAction<"movie_save", {
    movies: IMovie[],
    total: number
}>

function saveMoviesAction(movies: IMovie[], total: number):SaveMoviesAction{
    return {
        type: "movie_save",
        payload: {
            movies,
            total
        }
    }
}

export type SetLoadingAction = IAction<"movie_setLoading", boolean>

function setLoadingAction(isLoading: boolean): SetLoadingAction{
    return {
        type: "movie_setLoading",
        payload: isLoading
    }
}

export type SetCondition = IAction<"movie_setCondition",ISearchCondition>

function setCondition(condition: ISearchCondition): SetCondition{
    return {
        type: "movie_setCondition",
        payload: condition
    }
}

export type DeleteAction = IAction<"movie_delete", string>

function deleteAction(id: string): DeleteAction{
    return {
        type: "movie_delete",
        payload: id
    }
}

function fetchMovies(condition:ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieActions>{
    return async (dispatch, getState)=>{
        // 设置加载状态
        dispatch(setLoadingAction(true));
        // 设置条件
        dispatch(setCondition(condition));
        // 获取服务器数据
        const curCondition = getState().movie.condition;
        const resp = await MovieService.getMovies(curCondition);
        // 更改仓库的数据
        dispatch(saveMoviesAction(resp.data, resp.total))
        // 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions>{
    return async (dispatch, getState)=>{
        // 设置加载状态
        dispatch(setLoadingAction(true));
        // 本地仓库数据删除
        dispatch(deleteAction(id));
        // 处理服务器数据
        await MovieService.delete(id);
        // 关闭加载状态
        dispatch(setLoadingAction(false));
    }
}

export type MovieChangeSwitchAction = IAction<"movie_switch", {
    type: SwitchType, 
    newVal: boolean, 
    id: string
}>


function changeSwitchAction(type: SwitchType, newVal: boolean, id: string):MovieChangeSwitchAction{
    return {
        type: "movie_switch",
        payload: {
            type,
            newVal,
            id
        }
    }
}

function changeSwitch(type: SwitchType, newVal: boolean, id: string): ThunkAction<Promise<void>, IRootState, any, MovieActions>{
    return async (dispatch, getState)=>{
        dispatch(changeSwitchAction(type, newVal, id));
        await MovieService.edit(id, {
            [type]: newVal
        })
    }
}

export type MovieActions = SaveMoviesAction | SetLoadingAction | SetCondition | DeleteAction | MovieChangeSwitchAction;

export default {
    saveMoviesAction,
    setLoadingAction,
    setCondition,
    deleteAction,
    fetchMovies,
    deleteMovie,
    changeSwitchAction,
    changeSwitch
}