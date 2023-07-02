const moment = require("moment");
const transactionModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, selectDate,type } = req.body;
    const transaction = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectDate[0],
              $lte: selectDate[1],
            },
          }),
        userid: req.body.userid,...(type !== 'all' && {type})
    });
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const editTransaction = async(req, res) => {
  try {
    await transactionModel.findByIdAndUpdate({ _id: req.body.transactionId },
      req.body.payload);
    res.status(200).send('Edit successfully');
    
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

// delete controller 
const deleteTransaction = async (req, res) => {
  //console.log(req.body);
  try {
    console.log(req.body.transactionId);
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId })
    
    res.status(200).json('deleted successfully');
  } catch (error) {
    
    console.log(error);
    res.status(500).send('something went wrong');
  }
}

const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("transaction created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
