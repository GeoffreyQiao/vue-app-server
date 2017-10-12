const mongoose = require('mongoose')
const p_detail = require('./productDetail')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const specDefine = {
    name: {
        type: String,
        required: true,
        maxlength: 4,
        unique: true
    }
}

const specOptions = {
    versionKey: false,
    timestamps: {
        createdAt: 'create',
        updatedAt: 'update'
    }
}

const SpecSchema = new Schema(specDefine, specOptions)

const SpecModel = mongoose.model('Spec', SpecSchema)

module.exports = SpecModel
