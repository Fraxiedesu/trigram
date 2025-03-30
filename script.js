document.addEventListener("DOMContentLoaded", () => {
    const noteInput = document.getElementById("noteInput");
    const saveNoteButton = document.getElementById("saveNote");
    const notesList = document.getElementById("notesList");

    // Load notes from local storage
    loadNotes();

    // Save note button click event
    saveNoteButton.addEventListener("click", () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            saveNote(noteText);
            noteInput.value = ""; // Clear the input
        }
    });

    // Function to save note
    function saveNote(note) {
        const notes = getNotes();
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes();
    }

    // Function to load notes
    function loadNotes() {
        const notes = getNotes();
        notesList.innerHTML = ""; // Clear the list
        notes.forEach((note, index) => {
            const li = document.createElement("li");
            li.className = "note-item";
            li.textContent = note;

            // Create a delete button as an "X"
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", () => {
                removeNote(index);
            });

            li.appendChild(deleteButton);
            notesList.appendChild(li);
        });
    }

    // Function to remove note
    function removeNote(index) {
        const notes = getNotes();
        notes.splice(index, 1); // Remove the note at the specified index
        localStorage.setItem("notes", JSON.stringify(notes));
        loadNotes(); // Reload the notes
    }

    // Function to get notes from local storage
    function getNotes() {
        const notes = localStorage.getItem("notes");
        return notes ? JSON.parse(notes) : [];
    }
});