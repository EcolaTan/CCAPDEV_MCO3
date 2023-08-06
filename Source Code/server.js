const dotenv = require('dotenv')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bcrypt = require('bcrypt')
const multer = require('multer')
const cors = require('cors')
const app = express()
const port = 2000

const Comment = require('./src/model/Comment')
const User = require('./src/model/User')
const Post = require('./src/model/Post')
const Community = require('./src/model/Community')
const Counter = require('./src/model/Counter')

const max_age = 1000 * 60 * 60 * 24 * 7 * 3

dotenv.config();
const saltRounds = parseInt(process.env.SALT)
const dir = process.env.DIRECTORY
const mongo = process.env.MONGOURI
const secretKey = process.env.SECRET

var postIndex = -1
var commentIndex = -1
var indexerId

const server = app.listen(port, () => {
    console.log("Server ready")
})

let closeDetected = false

mongoose.connect(mongo, { dbName: 'CCAPDEV'})
    .then(async () => {
        console.log('Connected to MongoDB!')
        const indices = await Counter.findOne({})
        indexerId = indices._id
        commentIndex = indices.commentIndex
        postIndex = indices.postIndex
    })

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(session({
    secret: secretKey,
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        collectionName: 'Sessions'
    })
}))

function shutDown() {
    if(!closeDetected) {
        server.close(() => {
            console.log("Shutting Down")
            mongoose.disconnect()
            process.exit(0)
        })
        closeDetected = true
    }
}

process.on("SIGINT", shutDown)
process.on("SIGTERM", shutDown)
process.on("SIGQUIT", shutDown)

/* Comment Endpoints */
app.get('/getUserCommentCount/:user', async (req, res) => {
    try {
        const data = await Comment.count({poster: req.params.user})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Get all comments of a user
app.get('/comment/user/:user/:page', async (req, res) => {
    try {
        const data = await Comment.find({poster: req.params.user})
            .populate('poster', '-password')
            .populate('replies')
            .populate('parentPostId')
            .populate('parentCommunity')
            .skip((req.params.page - 1) * 15)
            .limit(15)
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Get all comments of a post
app.get('/comment/post/:post', async (req, res) => {
    try {
        var data = await Comment.find({parentPostId: req.params.post, layer: 1})
            .populate('poster', '-password')
            .populate({
                path: 'replies',
                populate: {
                    path: 'poster replies',
                    select: '-password'
                }
            })
            .populate('parentPostId')
            .populate('parentCommunity')
        
        //Get replies of replies
        for(const rootComment of data) {
            for(const reply1 of rootComment.replies) {
                reply1.replies = await Comment.find({replyingTo: reply1})
                    .populate('poster', '-password')
                    .populate({
                        path: 'replies',
                        populate: {
                            path: 'poster replies',
                            select: '-password'
                        }
                    })
                    .populate('parentPostId')
                    .populate('parentCommunity')
            }
        }
        
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/comment/post/viewComment/:comment', async (req, res) => {
    try {
        var data = await Comment.findById(req.params.comment)
            .populate('poster', '-password')
            .populate({
                path: 'replies',
                populate: {
                    path: 'poster replies',
                    select: '-password'
                }
            })
            .populate('parentPostId')
            .populate('parentCommunity')
        
        //Get replies of replies
        for(const reply1 of data.replies) {
            reply1.replies = await Comment.find({replyingTo: reply1})
                .populate('poster', '-password')
                .populate({
                    path: 'replies',
                    populate: {
                        path: 'poster replies',
                        select: '-password'
                    }
                })
                .populate('parentPostId')
                .populate('parentCommunity')
        }

        res.status(200).json([data])
    } catch(error) {
        res.status(500).send()
    }
})

//Reload comment
app.get('/reload/comment/:comment', async (req, res) => {
    try {
        const data = await Comment.findById(req.params.comment)
            .populate('poster', '-password')
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//New comment
app.post('/comment', async (req, res) => {
    try {
        req.body._id = req.body.parentPostId + '_' + commentIndex
        const data = await Comment.create(req.body)
        commentIndex++
        await Counter.findByIdAndUpdate(indexerId, {'commentIndex': commentIndex})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

app.patch('/comment/reply/:comment', async (req, res) => {
    try {
        req.body._id = req.body.parentPostId + '_' + commentIndex
        const temp = await Comment.create(req.body)
        let parent = await Comment.findById(req.params.comment)
        parent.replies.push(req.body._id)
        await Comment.findByIdAndUpdate(req.params.comment, parent, {new: true})
        commentIndex++
        await Counter.findByIdAndUpdate(indexerId, {'commentIndex': commentIndex})
        const data = await Comment.findById(temp.id).populate('poster', '-password')
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Edit comment
app.patch('/comment/:comment', async (req, res) => {
    try {
        const data = await Comment.findByIdAndUpdate(req.params.comment, req.body, {new: true}) 
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Delete comment
app.delete('/comment/:comment', async (req, res) => {
    try {
        var data = await Comment.findById(req.params.comment)

        for(let reply of data.replies) {
            await Comment.findByIdAndDelete(reply)
        }

        data = await Comment.findByIdAndDelete(req.params.comment)
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

/* Community Endpoints */
//Get current community
app.get('/community/:community', async (req, res) => {
    try {
        const data = await Community.findById(req.params.community)
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Get all communities
app.get('/community', async (req, res) => {
    try {
        const data = await Community.find({_id: {$not: /recurve-main/}})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//New community
app.post('/community', async (req, res) => {
    try {
        const data = await Community.create(req.body)
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Edit community
app.patch('/community/:community', async (req, res) => {
    try {
        const data = await Community.findByIdAndUpdate(req.params.community, req.body, {new: true})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Delete community
app.delete('/community/:community', async (req, res) => {
    try {
        const data = await Community.findByIdAndDelete(req.params.community)
        res.status(200).json()
    } catch(error) {
        res.status(500).send()
    }
}) 

/* User Endpoints */
//Get current user
app.get('/user/:user', async (req, res) => {
    try {
        const data = await User.findById(req.params.user)
        if(data !== null) {
            res.status(200).json(data)
        } else {
            res.status(404).json(undefined)
        }
    } catch(error) {
        res.status(500).send()
    }
})

//Get all users (Might not be used)
app.get('/user', async (req, res) => {
    try {
        const data = await User.find({})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Get all users of a community
app.get('/user/community/:community', async (req, res) => {
    try {
        const community = await Community.findById(req.params.community)
        const data = community?.members
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Check for valid signup
app.get('/signup/:user', async (req, res) => {
    try {
        const data = await User.findById(req.params.user)

        if(data === null) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }
    } catch(error) {
        res.status(500).send()
    }
})

//new user
app.post('/user', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        const data = await User.create(req.body)
        res.status(200).json(data) 
    } catch(error) {
        res.status(500).send()
    }
})

//Login
app.post('/login', async (req, res) => {
    try {
        const data = await User.findById(req.body.userId, {password: 1})

        if(data !== null) {
            const loginSuccess = await bcrypt.compare(req.body.password, data.password)
            if(loginSuccess) {            
                req.session.username = data._id
                if(req.body.rememberFlag === true) {
                    req.session.cookie.maxAge = max_age
                }
                
                res.status(200).json(data._id)
            } else {
                res.status(200).json("")
            }
        } else {
            res.status(200).json("")
        }
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/logout', async (req, res) => {
    try {
        req.session.destroy()
        res.clearCookie('connect.sid')
        res.status(200).send()
    } catch(error) {
        res.status(500).send()
    }
})

//Edit user
app.patch('/user/:user', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, saltRounds)
        const data = await User.findByIdAndUpdate(req.params.user, req.body, {new: true})
        res.status(200).json(data)
    } catch(error) {
        console.error(error)
        res.status(500).send()
    }
})

//Update password
app.patch('/user/password/:user', async (req, res) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, saltRounds)
        const data = await User.findByIdAndUpdate(req.params.user, {password: hashed}, {new: true})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Delete user
app.delete('/user/:user', async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.user)

        if(data._id === req.session.username) {
            req.session.destroy()
        }

        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

/* Post Endpoints */
app.get('/getAllUserPosts/:user', async (req, res) => {
    try {
        const data = await Post.count({poster: req.params.user})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/getAllPosts', async (req, res) => {
    try {
        const data = await Post.count({})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/getAllPosts/:community', async (req, res) => {
    try {
        const data = await Post.count({community: req.params.community})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/post/home/:page/:settings', async (req, res) => {
    try {
        var filter
        switch(parseInt(req.params.settings)) {
            case 1: //New
                filter = {postDate: -1}
                break
            case 2: //Top
                filter = {upvotes: -1}
                break 
            default:
                filter = {postDate: -1}
        }

        const data = await Post.find({}).skip(parseInt(req.params.page) * 15).limit(15)
            .populate('community')
            .populate('poster', '-password')
            .populate('commenters')
            .sort(filter)

        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Get all posts of a community
app.get('/post/community/:community/:page', async (req, res) => {
    try {
        const data = await Post.find({community: req.params.community}).skip((parseInt(req.params.page) - 1) * 15).limit(15).sort({postDate: 'desc'})
            .populate('community')
            .populate('poster', '-password')
            .populate('commenters')
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Get all posts of a user
app.get('/post/user/:user/:page', async (req, res) => {
    try {
        const data = await Post.find({poster: req.params.user})
            .populate('community')
            .populate('poster', '-password')
            .populate('commenters')
            .skip((req.params.page - 1) * 15)
            .limit(15)
            .sort({postDate: 1})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})



//Get loaded post
app.get('/post/:post', async (req, res) => {
    try {
        const data = await Post.findById(req.params.post)
            .populate('community')
            .populate('poster', '-password')
            .populate('commenters')
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//New Post
app.post('/post', async (req, res) => {
    try {
        req.body._id = req.body.community._id + '_' + postIndex
        const data = await Post.create(req.body)
        postIndex++
        await Counter.findByIdAndUpdate(indexerId, {'postIndex': postIndex})
        res.status(200).json(data) 
    } catch {
        res.status(500).send()
    }
})

//Edit post
app.patch('/post/:post', async (req, res) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.post, req.body, {new: true})
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Delete post
app.delete('/post/:post', async (req, res) => {
    try {
        await Comment.deleteMany({parentPostId: req.params.post})
        const data = await Post.findByIdAndDelete(req.params.post)
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

/* Query Endpoints */
app.get('/results/count', async (req, res) => {
    try {
        const regex = new RegExp(req.params.query, "gi")
        const data = await Post.count({}).or([{title: regex}, {body: regex}])
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

//Get all post results
app.get('/post/query/:query/:page', async (req, res) => {
    try {
        const regex = new RegExp(req.params.query, "gi")
        const data = await Post.find({}).or([{title: regex}, {body: regex}]).skip(parseInt(req.params.page) * 15).limit(15)
            .populate('community')
            .populate('poster', '-password')
            .populate('commenters')
        res.status(200).json(data)
    } catch(error) {
        res.status(500).send()
    }
})

/* ID Services */
app.get('/postid/:community', async (req, res) => {
    try {
        const data = await Post.find({community: req.params.community})
        res.status(200).json(data.length)
    } catch(error) {
        res.status(500).send()
    }
})

app.get('/commentid/:post', async (req, res) => {
    try {
        const data = await Comment.find({parentPostId: req.params.post})
        res.status(200).json(data.length)
    } catch(error) {
        res.status(500).send()
    }
})

/* Session Management */
app.get('/get/sessions', async (req, res) => {
    try {
        if(req.session?.username) {
            const data = await User.findById(req.session.username)
            res.status(200).json(data)
        } else {
            res.status(200).send(null)
        }
    } catch(error) {
        res.status(500).send()
    }
})

  
// Configuration for avatar image upload
const avatarStorage = multer.diskStorage({
    destination: './dist/ccapdev-angular-rewrite/assets/images/avatars',
    filename: function(req, file, cb) {
        const username = req.params.username;
        cb(null, username + '.' + file.mimetype.split('/')[1]);
    }
});

const avatarUpload = multer({ storage: avatarStorage });

app.post('/user/:username/settings/avatar', avatarUpload.single('file'), (req, res) => {
    try {
        const username = req.params.username;
        res.json({ message: `Avatar file uploaded successfully for user: ${username}` });
    } catch (err) {
        res.status(500).json({ message: 'Avatar file upload failed.' });
    }
});

app.get('*.*', express.static(dir))
app.get('*', (req, res) => {
    res.status(200).sendFile('/', {root: dir})
})
