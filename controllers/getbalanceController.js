import tradeData from '../Models/Trade.js';

export const getbalance = async (req, res) => {
    try {
        const { timestamp } = req.body;
        if (!timestamp) {
            return res.status(400).send({ success: false, msg: 'Timestamp is required' });
        }

        const queryDate = new Date(timestamp);
        const trades = await tradeData.find({ utcTime: { $lt: queryDate } });

        const balances = trades.reduce((acc, trade) => {
            const { baseCoin, operation, amount } = trade;
            if (!acc[baseCoin]) {
                acc[baseCoin] = 0;
            }

            acc[baseCoin] += operation.toLowerCase() === 'buy' ? amount : -amount;
            return acc;
        }, {});

        // Filtering out zero balances
        const filteredBalances = {};
        for (const key in balances) {
            if (balances[key] !== 0) {
              filteredBalances[key] = balances[key];
        }
     }


        res.json(filteredBalances);
    } catch (error) {
        console.error("Error calculating balance:", error.message);
        res.status(500).send({ success: false, msg: error.message });
    }
};
