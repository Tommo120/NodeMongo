const connection = require("./db/connection");
const yargs = require("yargs");
const { addMovies, listMovies, findMovies, updateMovie, updateActors, deleteMovies } = require("./utils");

const command = process.argv[2];

class Movie {
    constructor(title, actor, genre) {
        this.title = title;
        this.actor = actor;
        this.genre = genre;
    }
}

const app = async () => {

    switch(command.toLowerCase()) {
        case "add":
            let movies = [];
            let titles = yargs.argv.title;
            if(Array.isArray(titles)) {
                titles.forEach((title, i) => {
                    movies.push(new Movie(title, yargs.argv.actor[i], yargs.argv.genre[i]));
                });
            } else {
                movies.push(new Movie(yargs.argv.title, yargs.argv.actor, yargs.argv.genre));
            }
            await connection(addMovies, movies);
            break;
        case "list":
            await connection(listMovies);
            break;
        case "find":
            await connection(findMovies, yargs.argv.term);
            break;
        case "remove":
            await connection(deleteMovies, yargs.argv.title);
            break;
        case "update":
            let inputKey;
            let inputData;
            if (yargs.argv.replaceTitle) {
                inputKey = "title";
                inputData = yargs.argv.replaceTitle;
            } else if (yargs.argv.replaceActor) {
                inputKey = "actor";
                inputData = yargs.argv.replaceActor;
            } else if (yargs.argv.replaceGenre) {
                inputKey = "genre";
                inputData = yargs.argv.replaceGenre;
            } else {
                console.log("Invalid command used in conjunction with Update command");
            }
            const updates = {
                title: yargs.argv.title,
                key: inputKey,
                data: inputData
            };
            await connection(updateMovie, updates);
            break;
        case "updateactors":
            const actorUpdates = { actor: yargs.argv.actor, newActor: yargs.argv.newActor };
            await connection(updateActors, actorUpdates);
            break;
        default:
            console.log("Invalid Command");
    }

}

app();