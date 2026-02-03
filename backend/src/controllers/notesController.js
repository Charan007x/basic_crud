export async function getNotes(req, res) {
    res.status(200).send('Here are your notes!!');
};

export async function createNote(req, res) {
    res.status(201).send('Note created successfully!!');
};

export async function updateNote(req, res) {
    res.status(200).send('Note updated successfully!!');
};

export async function deleteNote(req, res) {
    res.status(200).send('Note deleted successfully!!');
};

