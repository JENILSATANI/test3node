const multer = require('multer')
const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/')
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${ext}`)
    }
})

const isimage = (req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true);
    }else{
        callback(new error('only image is allowed'))
    }
}
const upload = multer({
    storage:multerConfig,
    fileFilter:isimage

})

exports.uploadimage = upload.single('photo')
