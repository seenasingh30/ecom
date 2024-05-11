const response = require('../../utils/response')
const message = require('../../utils/message')
const model = require('./model')
const encryption = require('../../utils/encryption');
const e = require('express');

class UserController {

    async login(req, res) {
        try {
            const user = req.body;
            user.username = user.username.toLowerCase()
            const data = await model.findOne({ username: user.username})
            if (!data) {
                return response.sendBadRequest(res, message.user.invalidCredentials)
            }
            const isMatch = await encryption.comparePasswordusingbcryptjs(user.password, data.password)
            if (!isMatch) {
                return response.sendBadRequest(res, message.user.invalidCredentials)
            }
            data.password = undefined   
            const payload = {
                id: data._id,
                username: data.username,
                email: data.email,
                name: data.name,
                status: data.status
            }
            const token = encryption.generateJWTToken(payload)
            res.cookie('Authorization',token,{expires: new Date(Date.now() + 86400000),httpOnly:true})
            return response.sendSuccess(res, data, message.user.loginSuccess)
        }
        catch (err) {
            console.log(err)
            return response.sendSystemError(res, err, message.user.loginFailed)
        }
    }

    async getUsers(req, res) {
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
                const user = await model.findById(req.params.id)
                meta.records = await model.countDocuments();
                meta.page = page + 1;
                return response.sendSuccess(res, user, message.user.fetchSuccess, meta)
            }
            const user = await model.find(query).skip(page * limit).limit(limit).sort({ sort: order });
            meta.records = await model.countDocuments();
            meta.page = page + 1;
            meta.total = Math.ceil(meta.records / user.length)
            return response.sendSuccess(res, user, message.user.fetchAllSuccess, meta)
        }
        catch (err) {
            console.log(err)
            return response.sendSystemError(res, err, message.user.fetchFailed)
        }
    }

    async createUser(req, res) {
        try {
            const user = req.body;
            console.log(user)
            // generate from email
            user.username = user.email
            const data = await model.create(user)
            return response.sendSuccess(res, data, message.user.createSuccess)
        }
        catch (err) {
            console.log(err)
            return response.sendSystemError(res, err, message.user.createFailed)
        }
    }

    async updateUser(req,res) {
        try{
            const body = req.body;
            let id = req.params.id;
            if(!id) {
                return response.sendBadRequest(res,message.user.idRequired)
            }
            const userupdate = await model.updateOne({_id:id},body)
            if(userupdate.nModified == 0) {
                return response.sendBadRequest(res,message.user.updateFailed)
            }
            return response.sendSuccess(res,userupdate,message.user.updateSuccess)
        }
        catch(err) {
            return response.sendSystemError(res,err,message.user.updateFailed)
        }
    }

    async deleteUser(req,res) {
        try{
            let id = req.params.id;
            if(!id) {
                return response.sendBadRequest(res,message.user.idRequired)
            }
            const userdelete = await model.deleteOne({_id:id})
            if(userdelete.deletedCount == 0) {
                return response.sendBadRequest(res,message.user.deleteFailed)
            }
            return response.sendSuccess(res,userdelete,message.user.deleteSuccess)
        }
        catch(err) {
            return response.sendSystemError(res,err,message.user.deleteFailed)
        }
    }
}

module.exports = new UserController();