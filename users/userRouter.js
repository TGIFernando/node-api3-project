const express = require('express');
const db = require('./userDb')

const router = express.Router();

router.post('/', async (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
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

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
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
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
