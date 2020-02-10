import Express from "express";
import { MovieService } from "../services/MovieServices";
import { ResponseHelper } from "./ResponseHelper";

const router = Express.Router();

router.get("/:id", async (req, res)=>{
    try{
        const movieid = req.params.id;
        const movie = await MovieService.findById(movieid);
        ResponseHelper.sendData(movie, res);
    }catch{
        ResponseHelper.sendData(null, res)
    }
})
router.get("/", async (req, res)=>{
    const result = await MovieService.find(req.query);
    ResponseHelper.sendPageData(result, res);
})
router.post("/", async (req, res)=>{
    const result = await MovieService.addMovie(req.body);
    if(Array.isArray(result)){
        ResponseHelper.sendError(result, res);
    }else{
        ResponseHelper.sendData(result, res);
    }
})

router.put("/:id", async (req, res)=>{
    try {
        const result = await MovieService.edit(req.params.id, req.body);
        if(Array.isArray(result)){
            ResponseHelper.sendError(result, res);
        }else{
            ResponseHelper.sendData(result, res);
        }
    }catch{
        ResponseHelper.sendError("id错误", res);
    }
})

router.delete("/:id", async (req, res)=>{
    try {
        const result = await MovieService.delete(req.params.id);
        ResponseHelper.sendData(true, res);
    }catch{
        ResponseHelper.sendError("id错误", res);
    }
})

export default router;