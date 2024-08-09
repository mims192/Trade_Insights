import express from 'express';
import multer from 'multer';
import { importTradeData }  from '../controllers/tradeController.js';
import { getbalance }  from '../controllers/getbalanceController.js';

const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });


router.post('/import', upload.single('file'), importTradeData);
router.post('/balance',getbalance)

export default router;
