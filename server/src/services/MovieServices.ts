import { Movie } from "../entities/Movie";
import { IMovie } from '../db/MovieSchema'
import { MovieModel } from "../db";
import { SearchCondition } from "../entities/SearchCondition";
import { ISearchResult } from "../entities/CommonTypes";
export class MovieService {
    public static async addMovie(movie: object): Promise<IMovie | string[]> {
        // 1. 转换类型
        const movieObj = Movie.transform(movie)
        // 2. 数据验证
        const errors = await movieObj.validateThis();
        if (errors.length > 0) {
            return errors;
        }
        // 3. 添加到数据库
        return await MovieModel.create(movieObj);
    }
    public static async edit(id: string, movie: object): Promise<IMovie | string[]> {
        // 1. 转换类型
        const movieObj = Movie.transform(movie)
        // 2. 数据验证
        const errors = await movieObj.validateThis(true);
        if (errors.length > 0) {
            return errors;
        }
        // 3. 修改数据库
        await MovieModel.updateOne({ _id: id }, movie);
        return [];
    }
    public static async delete(id: string): Promise<void> {
        // 删除数据库
        await MovieModel.deleteOne({ _id: id });
    }
    public static async findById(id: string): Promise<IMovie | null> {
        // 根据id查找数据库
        return await MovieModel.findById(id);
    }
    /**
     *
     * @param condition page、limit、key
     */
    public static async find(condition: object): Promise<ISearchResult<Movie>> {
        // 1. 转换类型
        const conObj = SearchCondition.transform(condition)
        // 2. 数据验证
        const errors = await conObj.validateThis(true);
        if (errors.length > 0) {
            return {
                count: 0,
                data: [],
                errors
            };
        }
        // 3. 查询
        const movies =  await MovieModel.find({
            name: {$regex: new RegExp(conObj.key)}
        }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);
        const count =  await MovieModel.find({
            name: {$regex: new RegExp(conObj.key)}
        }).countDocuments();
        return {
            count,
            data: movies,
            errors: []
        };
    }
}