const express = require('express');
const { OPEN_READWRITE } = require('sqlite3');
const db = require('./userDb')
const postdb = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  try {
    await db.insert(req.newUser)
      .then(
        res.status(201).json(req.newUser)
      ) .catch (error => {
        console.log(error.message)
      })
  } catch (error) {
    console.log(error.message)
  }
  
});

router.post('/:id/posts', [validateUserId ,validatePost], (req, res) => {
  const post = req.body
  postdb.insert(post)
    .then(data => {
      res.status(201).json(data)
    }) .catch(error => {
      console.log(error.message)
      res.status(500).json({message: 'oops looks like something went wrong'})
    })
});

router.get('/', async (req, res) => {
  try{
    const users = await db.get()
    if (!users) {
      res.status(404).json({ message: 'resource not found'})
    } else {
      res.status(200).json(users)
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({message: 'oops looks like something went wrong with the server'})
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  const posts = await db.getUserPosts(req.id)
  res.status(200).json(posts)
});

router.delete('/:id', validateUserId, async (req, res) => {
  const deleted = await db.remove(req.id)
  res.status(202).json(deleted)
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try{
    const newUser = await db.update(req.id, req.body)
    res.status(201).json(newUser)
  } catch (error){
    console.log(error.message)
  }
  
});

//custom middleware

async function validateUserId  (req, res, next){
  const { id } = req.params
  try {
    const user = await db.getById(id)
    if (user){
      req.user = user
      req.id = id
      next()
    } else {
      res.status(404).json({ message: `User with id ${id} does not exist`})
    }
  } catch (error){
    console.log(error.message)
    res.status(500).json({ message: 'oops looks like something went wrong with the server'})
  }
}

function validateUser(req, res, next) {
  if (!req.body) {
    next({code: 400, message: 'missing user data'})
  } else if (!req.body.name) {
    next({code: 400, message: 'missing required name field'})
  } else {
    req.newUser = req.body
    next()
  }
}

async function validatePost(req, res, next) {
  if(!req.body){
    next({code: 400, message: 'missing user data'})
  } else if (!req.body.text){
    next({code: 400, message: 'missing required text field'})
  } else {
    next()
  }
}

module.exports = router;
