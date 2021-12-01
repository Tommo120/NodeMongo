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
        /*
        const titleResults = await collection.find({ title: dataObj }, { projection: { _id: 1, title: 1, actor: 1, genre: 1}}).toArray();
        const actorResults = await collection.find({ actor: dataObj }, { projection: { _id: 1, title: 1, actor: 1, genre: 1}}).toArray();
        const genreResults = await collection.find({ genre: dataObj }, { projection: { _id: 1, title: 1, actor: 1, genre: 1}}).toArray();

        let results = [];

        if(titleResults.length > 0)
            results.push(...titleResults);
        if(actorResults.length > 0)
            results.push(...actorResults);
        if(genreResults.length > 0)
            results.push(...genreResults);
        */

        //const results = await collection.find({ $or: [ {title: dataObj}, {actor: dataObj}, {genre: dataObj} ]}).toArray();

        const results = await collection.find({ $text: { $search: dataObj }}, {score: {$meta: "textScore"}}).toArray();

        /*
        const uniqueResults = Array.from(new Set(results.map(a => a._id)))
            .map(_id => {
                return results.find(a => a._id === _id)
            });
        */

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

exports.updateMovie = async (collection, dataObj, key) => {
    try {
        // Doesn't work properly, fix later
        const key = dataObj.key;
        await collection.updateOne({ title: dataObj.title }, { $set: { title: dataObj.data }});
        console.log(`Updated the  ${dataObj.oldTitle} to ${dataObj.newTitle}`);
    } catch (error) {
        console.log(error);
    }
}

exports.updateActors = async (collection, dataObj) => {
    try {

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