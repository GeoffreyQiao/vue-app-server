let s = {
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
let json = JSON.stringify(s)
console.log(json)
