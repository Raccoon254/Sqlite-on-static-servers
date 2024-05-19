const express = require('express');
const Todo = require('./todo');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors('*'));
app.use(express.static('public'));

app.post('/todos', async (req, res) => {
  let myTodo = new Todo(req.body.name, req.body.description, req.body.status);
  try {
    await myTodo.save();
    res.status(201).send('Todo created');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.getAll();
    res.json(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.getById(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    await Todo.update(req.params.id, req.body.name, req.body.description, req.body.status);
    res.send('Todo updated');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    await Todo.delete(req.params.id);
    res.send('Todo deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
