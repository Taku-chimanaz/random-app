const express = require("express");
const router = express.Router();
const usersController = require("../controllers/userController");

router.post('/:id', usersController.createUser);

router.delete("/:id", usersController.deleteUser);

router.post('/update/:id', usersController.updateUser);

router.post('/login/:id', usersController.handleLogin);

router.get('/:id', usersController.returnUser);

router.get('/unfollowed/:id', usersController.returnUnfollowedUsers);

router.post('/follow/:id', usersController.follow);

router.get('/following/:id', usersController.returnFollowedUsers);

router.post('/unfollow/:id', usersController.unfollow)

router.get('/followers/:id', usersController.returnFollowers);

router.post('/remove-follower/:id', usersController.removeFollower);


module.exports = router;