import { Request, Response } from "express";
import {UserDocument} from "../schema/user.schema";

interface Context {
    req: Request;
    res: Response;
    user: UserDocument | null;
}

export default Context;