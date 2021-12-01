const connection = require("./db/connection");
const yargs = require("yargs");
const { addMovies, listMovies, findMovies, updateMovie, deleteMovies } = require("./utils");

const command = process.argv[2];

class movie {
    constructor(title, actor, genre) {
        this.title = title;
        this.actor = actor;
        this.genre = genre;
    }
}

const app = async () => {

    
    switch(command) {
        case "add":
            /*const newMovie = {
                title: yargs.argv.title,
                actor: yargs.argv.actor,
                genre: yargs.argv.genre
            };*/
            let movies = [];
            let titles = yargs.argv.title;
            titles.forEach((title, i) => {
                movies.push(new movie(title, yargs.argv.actor[i], yargs.argv.genre[i]));
            });
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
            const updates = {
                oldTitle: yargs.argv.title,
                newTitle: yargs.argv.newTitle
            };
            await connection(updateMovie, updates);
            break;
        default:
            console.log("Invalid Command");
    }

}

app();