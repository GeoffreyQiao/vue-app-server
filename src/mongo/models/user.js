const mongoose = require('mongoose')
const p_detail = require('./productDetail')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema


/**
 * User 定义
 * @typedef     {object}    userDefine
 * @param {Schema.Types} name            用户名
 * @param {Schema.Types} cometence 权限
 * @param {Schema.Types} password    密码
 * @param {Schema.Types} createTime 创建时间
 */
const userDefine = {
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 20,
        minlength: 1,
        index: true,
        trim: true
    },
    competence: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    password: {
        type: String,
        match: /^\w[\w\d]{5,9}/g,
        required: true,
        trim: true
    }
}

const userOptions = {
    versionKey: false,
    timestamps: {
        createdAt: 'create',
        updatedAt: 'update'
    }
}

/** @type {Schema} UserSchema */
const UserSchema = new Schema(userDefine, userOptions)

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
