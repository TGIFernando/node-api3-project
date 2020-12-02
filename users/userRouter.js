const express = require('express');
const { OPEN_READWRITE } = require('sqlite3');
const db = require('./userDb')

const router = express.Router();

router.post('/', validateUser, async (req, res) => {
  // do your magic!
  res.status(201).json(req.newUser)
});

router.post('/:id/posts', async (req, res) => {
  // do your magic!
});

router.get('/', async (req, res) => {
  // do your magic!
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
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, async (req, res) => {
  // do your magic!
  const deleted = await db.remove(req.id)
  res.status(202).json(deleted)
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
});

//custom middleware

async function validateUserId  (req, res, next){
  // do your magic!
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

async function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    next({code: 400, message: 'missing user data'})
  } else if (!req.body.name) {
    next({code: 400, message: 'missing required name field'})
  } else {
    await db.insert(req.body)
      .then(data => {
        req.newUser = data
        next()
      }) .catch (error => {
        next({code: 500, message: 'oops something is wrong with the server'})
      })
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
