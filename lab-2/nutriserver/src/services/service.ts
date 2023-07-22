import { Model, Document } from "mongoose";

export class Service <T extends Document>{
    model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }
    async getAll(query:any){
        try{
            let items = await this.model.find(query);
            let data = []
            if(items){
                for(let item of items){
                    let newItem = JSON.parse(JSON.stringify(item));
                    newItem.id = newItem._id;
                    delete newItem._id;
                    data.push(newItem);
                }
            }
            return {data: data, error: false, statusCode:200};
            
        }
        catch (errors) {
            return {errors, statusCode: 500, error: true};

        }
    }
}
