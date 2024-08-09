
import csvtojson from 'csvtojson';
import tradeData from '../Models/Trade.js';


export const importTradeData = async (req, res) => {
    try {
      
        const response = await csvtojson().fromFile(req.file.path);

      
        const tradedata = response.map(item => {
            const [baseCoin, quoteCoin] = item.Market.split('/'); // Splitting market into base and quote coins
            return {
                userid: item.User_ID,
                utcTime: new Date(item.UTC_Time), 
                operation: item.Operation,
                market: item.Market,
                baseCoin: baseCoin,
                quoteCoin: quoteCoin,
                amount: parseFloat(item['Buy/Sell Amount']), 
                price: parseFloat(item.Price),
            };
        });

       
        await tradeData.insertMany(tradedata);

        
        res.send({ status: 200, success: true, msg: 'CSV imported successfully' });
    } catch (error) {
        
        console.error("Error importing CSV:", error.message);
        res.status(400).send({ success: false, msg: error.message });
    }

};

