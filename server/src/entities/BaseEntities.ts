import { validate } from "class-validator"
import { plainToClass } from "class-transformer"
import { ClassType } from "class-transformer/ClassTransformer";

export abstract class BaseEntities {
    /**
     * 验证当前对象
     */
    public async validateThis(skipMissing = false): Promise<string[]> {
        const errors = await validate(this, {
            skipMissingProperties: skipMissing
        });
        const result: string[] = [];
        const temps = errors.map(e => Object.values(e.constraints));
        temps.forEach(temp => {
            result.push(...temp);
        })
        return result;
    }

    /**
     * 将一个平面对象转化为Movie对象
     * @param plainObject
     */
    protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
        if (plainObject instanceof cls) {
            return plainObject;
        }
        return plainToClass(cls, plainObject);
    }
}