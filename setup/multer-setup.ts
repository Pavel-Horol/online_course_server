import multer from "multer"
import { GridFsStorage } from "multer-gridfs-storage"

const url = process.env.MONGODB_CONNECTION_STRING!
const storage = new GridFsStorage({
    url,
    file: (req, file) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            return {
                bucketName: 'photos',
                filename: `${Date.now()}_${file.originalname}`
            }
        } else {
            return `${Date.now()}_${file.originalname}`
        }
    }
})

const upload = multer({storage})

export default upload