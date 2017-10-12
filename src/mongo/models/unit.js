const mongoose = require('mongoose')
const p_detail = require('./productDetail')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

const unitDefine = {
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 2
    }
}

const unitOptions = {
    versionKey: false,
    timestamps: {
        createdAt: 'create',
        updatedAt: 'update'
    }
}


const UnitSchema = new Schema(unitDefine, unitOptions)

const UnitModel = mongoose.model('Unit', UnitSchema)

module.exports = UnitModel
