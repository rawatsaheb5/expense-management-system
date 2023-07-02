const express = require('express');

const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../controllers/transactionController')
// router object;
const router = express.Router();


// routers

router.post('/add-transaction', addTransaction);
//edit transaction route 
router.post('/edit-transaction', editTransaction);

//delete transaction route 
router.post('/delete-transaction', deleteTransaction);

router.post('/get-transaction', getAllTransaction);







module.exports = router;