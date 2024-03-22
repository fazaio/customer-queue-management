const DB = require("../config/db");
const VISITORS = require("../models/visitor.model");

const TEST = async(req,res) => {
    res.send('hellow')
}

const READS_VISITORS = async (req, res) => {
  try {
    console.log('read');
    await DB.connectToDB();
    let result = await VISITORS.find();

    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
};

const QUEUE_VISITORS = async (req, res) => {
  try {
    console.log('Get Queue');
    await DB.connectToDB();
    const result = await VISITORS.findOne().sort({ createdAt: -1 }).limit(1);

    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
};

const CREATES_VISITORS = async (req, res) => {
  try {
    console.log('create!');
    await DB.connectToDB();

    const latestVisitor = await VISITORS.findOne().sort({ createdAt: -1 }).limit(1);
    
    const visitors = new VISITORS({
      full_name: req.body.full_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      address: req.body.address,
      queue_number: latestVisitor.queue_number+1
    });



    let result = await visitors.save();
    console.log(result);
    res.send(result);
  } catch (e) {
    res.status(400).send("Bad Request");
  }
};


module.exports = {
  READS_VISITORS,
  CREATES_VISITORS,
  TEST,
  QUEUE_VISITORS
};