import "reflect-metadata";
import Express from "express"
import MovieRouter from "./routes/MovieRoute"
import UploadRouter from "./routes/UploadRoute"
// 数据库：mongodb
// 数据库驱动：mongodb、mongoose
// 对ts对支持不是太好
// 其他数据库驱动：typeorm(完全ts编写，基于类)，对mongodb支持不好
// express
// 验证：class-validator
// 将plain-object转换为
// express, koa2

const app = Express();

app.use("upload", Express.static("public/upload"));

app.use(Express.json());

app.use("/api/movie", MovieRouter);

app.use("/api/upload", UploadRouter)

app.listen(3000);