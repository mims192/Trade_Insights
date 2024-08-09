import mongoose from 'mongoose';

const tradeSchema = new mongoose.Schema({
    utcTime: Date,
    userid: String,
    operation: String,
    market: String,
    baseCoin: String,
    quoteCoin: String,
    amount: Number,
    price: Number,
});

const tradeData = mongoose.model('tradeData', tradeSchema);
export default tradeData;