const model = require("./model")
const response = require("../../utils/response")
const message = require("../../utils/message")

class ProductController {
    async get(req, res) {
        try {
            
            let meta = {}
            const query = req.query || {}
            let limit = query.limit || 10
            let page = query.page || 0
            let sort = req.query.sort || 'createdAt';
            let order = req.query.order || "asc"
            if (order == "asc") {
                order = 1
            }
            else {
                order = -1
            }
            delete query.limit;
            delete query.page;
            delete query.sort;
            if (req.params.id) {
                const product = await model.findById(req.params.id)
                meta.records = await model.countDocuments();
                meta.page = page + 1;
                return response.sendSuccess(res, product, message.product.fetchSuccess, meta)
            }
            const product = await model.find(query).skip(page * limit).limit(limit).sort({ sort: order });
            meta.records = await model.countDocuments();
            meta.page = page + 1;
            meta.total = Math.ceil(meta.records / product.length)
            return response.sendSuccess(res, product, message.product.fetchAllSuccess, meta)
        }
        catch (err) {
            console.log(err)
            return response.sendSystemError(res, err, message.product.fetchFailed)
        }
    }

    async create(req, res) {
        try {
            const product = req.body;
            const data = await model.create(product)
            return response.sendSuccess(res, data, message.product.createSuccess)
        }
        catch (err) {
            return response.sendSystemError(res, err, message.product.createFailed)
        }
    }

    async update(req,res) {
        try{
            const body = req.body;
            let id = req.params.id;
            if(!id) {
                return response.sendBadRequest(res,message.product.idRequired)
            }
            const productupdate = await model.updateOne({_id:id},body)
            return response.sendSuccess(res,productupdate,message.product.updateSuccess)
        }
        catch(err) {
            console.log(err)
            return response.sendSystemError(res,err,message.product.updateFailed)
        }
    }

    async remove(req,res){
        try{
            let id = req.params.id;
            if (!id){
                return response.sendBadRequest(res)
            }
            const productDelete = await model.deleteOne({_id:id})
            return response.sendSuccess(res,productDelete, message.product.deleteSuccess)
        }
        catch(err) {
            console.log(err)
            return response.sendSystemError(res,err,message.product.deleteFailed)
        }
    }
}

module.exports = new ProductController()