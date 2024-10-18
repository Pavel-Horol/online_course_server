import { NextFunction, Request, Response } from 'express';
import { storage } from '../setup/firebase-setup';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { ApiError } from '../exceptions/api-error';

class ImageController {

    async upload (req: Request, res: Response, next: NextFunction){
        try {
            if(!req.file){ throw ApiError.BadRequest('no photo') }
            const storageRef = ref(storage, `files/${req.file.originalname}`);            
        
            const metadata = {
                contentType: req.file.mimetype
            }
        
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        
            const downloadUrl = await getDownloadURL(snapshot.ref)
            return res.send({
                message: 'file uploaded to firebase storage',
                name: req.file.originalname,
                type: req.file.mimetype,
                downloadURL: downloadUrl
            })
        } catch (error) {
           next(error) 
        }
    }
}

export default new ImageController()