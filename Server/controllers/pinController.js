// const Pin = require("../models/archieve");
const Pin = require("../models/pin");

exports.createPin = async (req, res) => {
    try {
        const createPin = await new Pin({
            Pin: []
        });

        await createPin.save();
        res.send(createPin);
        console.log(createPin);
        return;
    } catch (error) {
        res.send(error);
        console.log(error)
    }
}


exports.addToPin = async (req, res) => {
    try {
        const id = req.params.id;
        const addToPin = await Pin.findOneAndUpdate({ id }, { $push: req.body }, { new: true }).populate('Pin');
        res.send(addToPin);
        console.log(addToPin);
        return;
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}



exports.getPin = async (req, res) => {
    try {
        const getPin = await Pin.find();
        res.send(getPin);
        console.log(error);
        return;
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

