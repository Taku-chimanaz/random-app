const router = require('express').Router();
const postsController = require('../controllers/postsController');

router.post('/create/:id', postsController.submitPost);
router.delete('/delete/:id', postsController.deletePost);
router.post('/like-post/:id', postsController.likePost);
router.post('/retweet-post/:id', postsController.retweetPost)
router.get('/following-posts/:id', postsController.followingPosts)

module.exports = router;