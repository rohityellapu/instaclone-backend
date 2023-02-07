const router = require('express').Router();
const Post = require('../models/post');
const bodyParser = require('body-parser');
const multer = require('multer');
const { storage } = require('./cloudinary');
// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
router.use(bodyParser.json())


const parser = multer({ storage: storage });

router.post('/', parser.single('file'), async (req, res) => {
    const { name, location, description } = req.body;
    try {
        let post = await Post.create({
            name: name,
            location: location,
            description: description,
            PostImage: req.file.path,

        })
        res.json({
            status: "Success",
            post
        })
        console.log(post);
    }
    catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err.message
        })

    }
})

router.get('/', async (req, res) => {
    try {
        if (req.query.load) {

            let posts = await Post.find().sort({ createdAt: -1 }).skip(req.query.load).limit(5);
            res.json({
                status: "Success",
                posts
            })
        }
        else {
            let posts = await Post.find().sort({ createdAt: -1 });
            res.json({
                status: "Success",
                posts
            })
        }
    }
    catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err.message
        })
    }
})


module.exports = router;
