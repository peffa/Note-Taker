const fs = require('fs');
const util = require("util");
const { v4: uuidv4 } = require('uuid');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

class NoteTaker {
    read() {
        return readFileAsync('./db/db.json', 'utf8');
    }

    getNotes() {
        return this.read().then(function(notes) {
            return JSON.parse(notes);
        });
    }

    addNote(note) {
        console.log(note);
        note.id = uuidv4();
        readFileAsync('./db/db.json', 'utf8').then(function(contents){
            let newNotes = JSON.parse(contents);
            newNotes.push(note);
            writeFileAsync('./db/db.json', JSON.stringify(newNotes)).then(function() {
                console.log("Note added!");
            });
        });
    }

    deleteNote(id) {
        readFileAsync('./db/db.json', 'utf8').then(function(existingNotes){
                existingNotes = JSON.parse(existingNotes);
                let newNotes = existingNotes.filter(note => note.id != id);
                writeFileAsync('./db/db.json', JSON.stringify(newNotes)).then(function() {
                    console.log("Note deleted!");
                });
        });
    }
}
module.exports = NoteTaker;