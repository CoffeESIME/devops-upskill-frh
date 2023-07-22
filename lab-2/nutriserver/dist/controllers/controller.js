"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    constructor(service) {
        this.service = service;
        this.getAll = this.getAll.bind(this);
    }
    async getAll(req, res) {
        let response = await this.service.getAll(req.query);
        return res.status(response.statusCode).send(response);
    }
}
exports.default = Controller;
