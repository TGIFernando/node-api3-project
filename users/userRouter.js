const express = require('express');

const router = express.Router();

const User = require('./userDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  res.status(201).json(req.newUser);
});

router.post('/:id/posts',[validateUserId, validatePost], (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      console.log('made it here')
      res.status(500).json({message: 'Couldnt create post'})
    })
  
});

router.get('/', (req, res) => {
  // do your magic!
  try {
  User.get()
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json({
        message: 'what did i do wrong?!'
      });
    })
  } catch (error) {
      res.status(500).json({
        message: 'erorrrr'
      })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.userData);

});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  User.getUserPosts(req.params.id)
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json({message: 'no good!!!!'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.remove(req.params.id)
  .then(data=>{
    res.status(200).json({message: 'it didnt work'});
  })
  .catch(err=>{
    res.status(404).json({message: 'no good'})
  })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  if (!req.body) {
    res.status(400).json({message: 'you gotta give me some info'})
  } else {
    User.update(req.params.id, req.body)
    .then(data=>{
      res.status(201).json(data);
    })
    .catch(err=>{
      res.status(500).json({message: 'wow no good'})
    })
  }
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  User.getById(id)
    .then(data => {
      if (data) {
        req.userData = data;
        next();
      } else {
        next({code: 404, message: 'there is no user with the id of ' + id})
      }
    })


}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    next({
      code: 400,
      message: 'missing user data'
    })
  } else if (!req.body.name) {
    next({
      code: 400,
      message: 'missing required name field'
    })
  } else {
    User.insert(req.body)
      .then(data=>{
        req.newUser = data;
        next()
      })
      .catch(error=>{
        next({
          code: 500,
          message: 'error!!!!!'
        })
      })
  }
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    next({
      code: 400,
      message: 'missing post data'
    })
  } else if (!req.body.text) {
    next({
      code: 400,
      message: 'missing required text field'
    })
  } else {
    console.log(req.body);
    next();
  }
}

router.use((err, req, res, next) => {
  res.status(err.code).json({
    message: err.message
  })
});

module.exports = router;
