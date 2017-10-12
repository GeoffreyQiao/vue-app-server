const mongoose = require('mongoose')
// const ObjectId = mongoose.Types.ObjectId
const ObjectId = mongoose.Schema.Types.ObjectId
const Schema = mongoose.Schema
const product_public = require('./productPublic')
/*
    export interface ProductDetail {
        product_public_info_id: mongoose.SchemaTypeOpts<ObjectId>,
        spec_id?: mongoose.SchemaTypeOpts<ObjectId>,
        barCode?: mongoose.SchemaTypeOpts<string>,
        price?: mongoose.SchemaTypeOpts<number>,
        quantity?: mongoose.SchemaTypeOpts<number>,
        unit_id?: mongoose.SchemaTypeOpts<ObjectId>,
        has_parts?: mongoose.SchemaTypeOpts<Boolean>,
        product_level?: mongoose.SchemaTypeOpts<number>,
        times_of_lower_product?: mongoose.SchemaTypeOpts<number>
    }

    export interface product_detail extends mongoose.Model<mongoose.Document> {
        hasSub?: ( id: ObjectId ) => Promise<Boolean>
        getLevelsByOnePID?: ( pid: ObjectId ) => Promise<mongoose.Document[]>
    }
*/

const productDetailInfoDefine = {
  //  商品公共信息ID
  product_public_info_id: {
    type: ObjectId,
    // required: true,
    ref: 'product_public_info'
  },
  // 规格ID
  spec_id: {
    type: ObjectId,
    // required: true,
    ref: 'spec'
  },
  //  条码
  barCode: {
    type: String,
    trim: true
  },
  //  售价
  price: {
    // required: true,
    type: Number
  },
  //  数量
  quantity: {
    // required: true,
    type: Number
  },
  //  单位ID
  unit_id: {
    type: ObjectId,
    // required: true,
    ref: 'unit'
  },
  //  是否能拆零
  has_parts: {
    type: Boolean,
    default: false
  },
  // 如果可拆零. 下级商品ID
  product_level: {
    type: Number,
    default: 1
  },
  // 如果可拆零. 等于下级商品倍数
  times_of_lower_product: {
    type: Number,
    min: 2
  }
}

const schemaOptions = {
  versionKey: false,
  timestamps: {
    createdAt: 'create',
    updatedAt: 'update'
  }
}

const ProductDetailInfoSchema = new Schema(productDetailInfoDefine, schemaOptions)

class DetailDefines {
  static hasSub(id) {
    return mongoose
      .model('product_detail_info')
      .findById(id)
      .then(p => {
        return p.has_parts ? true : false
      })
  }

  static getLevelsByOnePID(pid) {
    return mongoose
      .model('product_detail_info')
      .find({
        product_public_info_id: pid
      })
      .then(res => {
        if (!res.length) return 0
        return res.sort((a, b) => {
          return a.product_level - b.product_level
        })
      })
  }

  static validator(p, existedItemList) {
    if (existedItemList) {
      existedItemList.find({})
    }
  }
}

ProductDetailInfoSchema.loadClass(DetailDefines)

/**
 * Save()的 pre 钩子方法, 帮助判断要修改的目标商品目前各属性对新增这部分是否许可
 */
ProductDetailInfoSchema.pre('save', function(next) {
  return this.model('product_detail_info')
    .getLevelsByOnePID(this.product_public_info_id)
    .then(res => {
      if (res && res.length) {
        for (let i of res) {
          if (!i.has_parts) return next(new Error(`此种商品不能拆得更小啦`))
        }
        if (this.has_parts && this.product_level > 1 && this.times_of_lower_product >= 2 && this.unit_id) {
          for (let i of res) {
            if (i.unit_id.toString() === this.unit_id.toString()) return next(new Error(`已经存在相同计量单位的商品`))
            if (this.barCode && i.barCode === this.barCode) return next(new Error(`条形码已存在`))
          }
        }
      }
      return next()
    })
})

const product_detail = mongoose.model('product_detail_info', ProductDetailInfoSchema)

module.exports = product_detail
