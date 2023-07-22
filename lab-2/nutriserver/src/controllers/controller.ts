import { Request, Response } from 'express';
import { IService } from '../services/service.interfaces';

class Controller<T extends IService<any>> {
    service: T;

    constructor(service: T) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
    }

    async getAll(req: Request, res: Response) {
        let response = await this.service.getAll(req.query);
        return res.status(response.statusCode).send(response);
    }
}

export default Controller;