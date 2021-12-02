exports.addMovies = async (collection, dataObj) => {
    try {
        await collection.insertMany(dataObj);
    } catch(error) {
        console.log(error);
    }
}

exports.listMovies = async (collection) => {
    try {
        const listAll = await collection.find({}, {projection: { _id: 0 }}).toArray();
        console.log(listAll);
    } catch(error) {
        console.log(error);
    }
}

exports.findMovies = async (collection, dataObj) => {
    try {
        const results = await collection.find({ $text: { $search: dataObj }}, {score: {$meta: "textScore"}}).toArray();

        if (results.length > 0)
            results.forEach((result) => {
                console.log(result);
            });
        else
            console.log(`No results for the keyword ${dataObj}`);
    } catch (error) {
        console.log(error);
    }
}

exports.updateMovie = async (collection, dataObj) => {
    try {
        const replacementData = {};
        replacementData[dataObj.key] = dataObj.data;

        await collection.updateOne({ title: dataObj.title }, { $set: replacementData });
        console.log(`The movie ${dataObj.title} had it's ${dataObj.key} updated to ${dataObj.data}`);
    } catch (error) {
        console.log(error);
    }
}

exports.updateActors = async (collection, dataObj) => {
    try {
        const updatedEntries = await collection.updateMany({ actor: dataObj.actor }, { $set: { actor: dataObj.newActor }});
        console.log(`${updatedEntries.modifiedCount} instances of ${dataObj.actor} were updated to ${dataObj.newActor}`);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteMovies = async (collection, dataObj) => {
    try {
        const result = await collection.deleteMany({ title: dataObj });
        console.log(`Deleted ${result.deletedCount} instance(s) of ${dataObj}`);
    } catch (error) {
        console.log(error);
    }
}