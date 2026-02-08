const API_URL = 'http://localhost:3000/api/notes';

// DOM Elements
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const noteIdInput = document.getElementById('note-id');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const notesList = document.getElementById('notes-list');

// State
let isEditing = false;

// Event Listeners
noteForm.addEventListener('submit', handleSubmit);
cancelBtn.addEventListener('click', resetForm);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchNotes();
});

// Fetch all notes
async function fetchNotes() {
    try {
        notesList.innerHTML = '<div class="loading">Loading notes...</div>';
        const response = await fetch(API_URL);
        const notes = await response.json();
        displayNotes(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        notesList.innerHTML = '<div class="no-notes">Failed to load notes. Make sure the server is running.</div>';
    }
}

// Display notes
function displayNotes(notes) {
    if (notes.length === 0) {
        notesList.innerHTML = '<div class="no-notes">No notes yet. Create your first note!</div>';
        return;
    }

    notesList.innerHTML = notes.map(note => `
        <div class="note-card" data-id="${note._id}">
            <h3>${escapeHtml(note.title)}</h3>
            <p>${escapeHtml(note.content)}</p>
            <div class="note-actions">
                <button class="edit-btn" onclick="editNote('${note._id}')">Edit</button>
                <button class="delete-btn" onclick="deleteNote('${note._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();

    const noteData = {
        title: titleInput.value.trim(),
        content: contentInput.value.trim()
    };

    try {
        if (isEditing) {
            // Update existing note
            await updateNote(noteIdInput.value, noteData);
        } else {
            // Create new note
            await createNote(noteData);
        }
        
        resetForm();
        fetchNotes();
    } catch (error) {
        console.error('Error saving note:', error);
        alert('Failed to save note. Please try again.');
    }
}

// Create new note
async function createNote(noteData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
    });

    if (!response.ok) {
        throw new Error('Failed to create note');
    }

    return await response.json();
}

// Update note
async function updateNote(id, noteData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noteData)
    });

    if (!response.ok) {
        throw new Error('Failed to update note');
    }

    return await response.json();
}

// Edit note
async function editNote(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const note = await response.json();

        titleInput.value = note.title;
        contentInput.value = note.content;
        noteIdInput.value = note._id;

        isEditing = true;
        formTitle.textContent = 'Edit Note';
        submitBtn.textContent = 'Update Note';
        cancelBtn.style.display = 'inline-block';

        // Scroll to form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        console.error('Error loading note for edit:', error);
        alert('Failed to load note. Please try again.');
    }
}

// Delete note
async function deleteNote(id) {
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete note');
        }

        fetchNotes();
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Failed to delete note. Please try again.');
    }
}

// Reset form
function resetForm() {
    noteForm.reset();
    noteIdInput.value = '';
    isEditing = false;
    formTitle.textContent = 'Add New Note';
    submitBtn.textContent = 'Add Note';
    cancelBtn.style.display = 'none';
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
