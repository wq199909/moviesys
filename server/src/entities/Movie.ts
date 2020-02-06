import { IsNotEmpty, ArrayMinSize, IsInt, Min, Max, IsArray, validate } from "class-validator"
import { Type } from "class-transformer";
import {BaseEntities} from "./BaseEntities"
export class Movie extends BaseEntities{
    @IsNotEmpty({ message: "电影名称不能为空" })
    @Type(()=>String)
    public name: string;

    @IsNotEmpty({ message: "电影类型不能为空" })
    @ArrayMinSize(1, { message: "电影类型至少有一个" })
    @IsArray({message:"电影类型必须是一个数组"})
    @Type(()=>String)
    public types: string[];

    @IsNotEmpty({ message: "上映地区不能为空" })
    @ArrayMinSize(1, { message: "上映地区至少有一个" })
    @IsArray({message:"上映地区必须是一个数组"})
    @Type(()=>String)
    public areas: string[];

    @IsNotEmpty({ message: "时长不可为空" })
    @IsInt({ message: "时长必须是一个整数" })
    @Min(1, { message: "时长最小1分钟" })
    @Max(999999, { message: "时长过长" })
    @Type(()=>Number)
    public timeLong: number;

    @IsNotEmpty({ message: "是否热映不可为空" })
    @Type(()=>Boolean)
    public isHot: boolean = false;

    @IsNotEmpty({ message: "是否即将上映不可为空" })
    @Type(()=>Boolean)
    public isComing: boolean = false;

    @IsNotEmpty({ message: "是否经典影片不可为空" })
    @Type(()=>Boolean)
    public isClassic: boolean = false;

    @Type(()=>String)
    public description?: string;

    @Type(()=>String)
    public poster?: string;

    public static transform(plainObject: object): Movie{
        return super.baseTransform(Movie, plainObject);
    }
}