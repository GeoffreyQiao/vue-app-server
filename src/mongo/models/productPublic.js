const mongoose = require('mongoose')
const p_detail = require('./productDetail')
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema

/** Schema 各个 path 的 SchemaDefinition */
const productPublicInfoDefine = {
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 20,
    minlength: 1,
    index: true,
    trim: true
  },
  producer: {
    type: String,
    maxlength: 20,
    trim: true
  },
  creator_id: {
    type: ObjectId,
    // required: true,
    ref: 'User'
  },
  products: {
    type: [ObjectId],
    refs: 'product_detail_info',
    default: []
  }
}

/**
 * Schema 的 Option 参数
 * @const schemaOptions
 */
const schemaOptions = {
  versionKey: false,
  timestamps: {
    createdAt: 'create',
    updatedAt: 'update'
  }
}

const ProductPublicInfoSchema = new Schema(productPublicInfoDefine, schemaOptions)

/*
    export interface p_public extends mongoose.Model<mongoose.Document> {
        createProduct?( p: inputProduct ): Promise<Boolean>
        addNewPublicInfo?( p: productPublic ): Promise<mongoose.Document>
    }

    export interface p_public_methods {
        createProduct?( p: inputProduct ): Promise<Boolean>
        addNewPublicInfo?( p: productPublic ): Promise<mongoose.Document>
    }
 */

/** ES6 在 class 中定义methods,static,getter,setter */
class PublicDefines {
  /**
     * 新商品公有信息
     * @static
     * @param {Object} p
     * @memberof PublicDefines
     */
  static addNewPublicInfo(p) {
    let pub = undefined
    let child_id = undefined
    // let model_public = mongoose.model('product_public_info')
    let model_detail = mongoose.model('product_detail_info')

    product_public
      .find({
        // 根据参数 p 的 name 属性查找是否已经存在该商品的 publicInfo
        name: p.name
      })
      .then(res => {
        if (!res.length) {
          return (pub = new product_public(p))
        }
        return new Error(`对不起! 已经存在同名商品, 该商品ID为:\n\t${res[0]._id}\n请再次检查...`)
      })
      .then(res => {
        console.log(`成功新增1条商品信息, 详情如下: \n ${res}`)
        return res
      })
      .catch(err => {
        console.log(err)
        // throw err
      })
  }

  /**
   * 新增商品
   * @static
   * @param {any} p
   * @returns
   * @memberof PublicDefines
   */
  static createProduct(p) {
    let pub = {}
    let child_id = undefined
    let model_detail = mongoose.model('product_detail_info')

    return product_public
      .find({
        // 根据参数 p 的 name 属性查找是否已经存在该商品的 publicInfo
        name: p.name
      })
      .then(res => {
        // 若不存在, 则新增该商品的 publicInfo, 并返回新增项的 _id {ObjectId}
        // 若存在, 则返回该 publicInfo 的 _id  {ObjectId}
        if (!res.length) {
          return new product_public(p).save().then(res => (pub = res))
        }
        return (pub = res[0])
      })
      .then(() => {
        p.product_public_info_id = pub._id
        return new model_detail(p).save().then(result => {
          return (child_id = result._id)
        })
      })
      .then(() => {
        console.log(pub)
        pub['products'].push(child_id)
        return pub.save().then(res => {
          return ['sucess', res]
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

ProductPublicInfoSchema.loadClass(PublicDefines)

const product_public = mongoose.model('product_public_info', ProductPublicInfoSchema)
module.exports = product_public
