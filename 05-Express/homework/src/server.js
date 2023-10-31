// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (author && title && contents) {
    const post = { author, title, contents, id: id };
    posts.push(post);
    id++;
    res.status(200).json(post);
  } else {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
});
server.post("/posts/author/:author", (req, res) => {
  const { author } = req.params;
  const { title, contents } = req.body;
  if (author && title && contents) {
    const post = { author, title, contents, id: id };
    posts.push(post);
    id++;
    res.status(200).json(post);
  } else {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
});
server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    const post = [];
    posts.forEach((p) => {
      if (p.title.includes(term) || p.contents.includes(term)) {
        post.push(p);
      }
    });
    res.status(200).json(post);
  } else {
    res.status(200).json(posts);
  }
});
server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  const post = posts.filter((p) => p.author === author);
  if (post.length) {
    res.status(200).json(post);
  } else {
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post del autor indicado",
    });
  }
});
server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  const post = posts.filter((p) => p.author === author && p.title === title);
  if (post.length) {
    res.status(200).json(post);
  } else {
    res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
});
server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  } else {
    const post = posts.find((p) => p.id === parseInt(id)); //por si el id me viene en el body en forma de String
    if (!post) {
      res.status(STATUS_USER_ERROR).json({
        error: "El id recibido no coincide con ningun Post",
      });
    } else {
      post.title = title;
      post.contents = contents;
      post.id = id;
      res.status(200).json(post);
    }
  }
});
server.delete("/posts", (req, res) => {
  const { id } = req.body;
  const post = posts.find((p) => p.id === parseInt(id)); //por si el id me viene en el body en forma de String
  if (!id || !post) {
    res.status(STATUS_USER_ERROR).json({
      error: "Id no proporcionado o no coincide con algun post a modificar",
    });
  } else {
    posts = posts.filter((p) => p.id !== parseInt(id)); //por si el id me viene en el body en forma de String
    res.status(200).json({ success: true });
  }
});
server.delete("/author", (req, res) => {
  const { author } = req.body;
  const authorPosts = posts.filter((p) => p.author === author);
  if (!author || !authorPosts.length) {
    res.status(STATUS_USER_ERROR).json({
      error: "No existe el autor indicado",
    });
  } else {
    posts = posts.filter((p) => p.author !== author);
    res.status(200).json(authorPosts);
  }
});

// TODO: your code to handle requests

module.exports = { posts, server };
