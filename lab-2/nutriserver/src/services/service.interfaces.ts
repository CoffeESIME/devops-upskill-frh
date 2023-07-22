import { Model, Document } from "mongoose";

export interface IService<T extends Document> {
    model: Model<T>;
    getAll(query: any): Promise<{ data?: any[], error: boolean, statusCode: number, errors?: any }>;
}
