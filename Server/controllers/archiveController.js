const Archive = require("../models/archieve");

exports.createArchive = async (req, res) => {
    try {
        const createArchive = await new Archive({
            Archive: []
        });

        await createArchive.save();
        res.send(createArchive);
        console.log(createArchive);
        return;
    } catch (error) {
        res.send(error);
        console.log(error)
    }
}


exports.addToArchive = async (req, res) => {
    try {
        const id = req.params.id;
        const addToArchive = await Archive.findOneAndUpdate({ id }, { $push: req.body }, { new: true }).populate('Archive');
        res.send(addToArchive);
        console.log(addToArchive);
        return;
    } catch (error) {
        res.send(error)
        console.log(error);
    }
}

exports.removeToArchive = async (req, res) => {
    try {
        const id = req.params.id;
        const removeToArchive = await Archive.findOneAndUpdate({ id }, { $pull: { Archive: { _id: req.params.id } } }, { new: true }).populate('Archive')
        res.send(removeToArchive);
        console.log(removeToArchive)
        return;
    } catch (error) {
        res.send(error);
        console.log(error)
    }
}

exports.getArchive = async (req, res) => {
    try {
        const getArchive = await Archive.find().populate('Archive').exec();
        res.send(getArchive);
        console.log(getArchive);
        return;
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

