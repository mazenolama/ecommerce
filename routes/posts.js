const express = require('express')
const { send } = require('express/lib/response')
const router = express.Router()
const valit = require('valit')
const Post = require('../models/Post')

 const postSchema = {
    title: valit.createField(valit.string, {
        required: true,
        max:50, 
        min:5,
    }),
    description: valit.createField(valit.string, {
        required:true,
        min: 5,
        max: 100,
    })
 }
/*let posts = [
    {id:1 , title:'title 1'},
    {id:2 , title:'title 2'},
    {id:3 , title:'title 3'},
    {id:4 , title:'title 4'},
]*/

// GET 
router.get('/posts' , async (req , res)=>{
    const posts = await Post.find()
   res.send(posts)
}) 

//GET by id
router.get('/posts/:id' , async (req , res)=> {
    const {id} = req.params;
    const post = await Post.findById(id)
    //const post = posts.filter(p => p.id === parseInt(id))
    if(!post) return res.status(404).send('Not Found !!');
    res.send(post)
})

// POST
router.post('/post' , async (req , res)=>{
  
    const {title, description} = req.body;
   let post = new Post({title,description,})

   /*const errors = valit.validate(req.body, postSchema)
   if(Object.keys(errors).length > 0 ) return res.status(400).send(errors)
   const post = {id : posts.length + 1}
   posts.push(post)*/

   try {
        post = await post.save();
   } catch (error) {
        res.send(error)
   }
   res.send(post)
})

//PUT 
router.put('/post/:id', async(req,res) => {
    const {id} = req.params
    const {title,description} = req.body
    const options = {new:true}

    const errors = valit.validate(req.body, postSchema)
    if(Object.keys(errors).length > 0 ) return res.status(400).send(errors)

    let post = await Post.findByIdAndUpdate(id, {
        title,description
    }, options, 
    (err, model) => {
        if (err) {
            console.error(err);
            return res.status(404).send(`ID (${id}) Of Post Not Found !!.\n`+err);
        } else {
            res.send(model);
        }
    }).clone(); 
})

//DELETE
router.delete('/post/:id', async (req, res) => {
    const {id} = req.params
    const options = {new:true}

    const post = await Post.findByIdAndDelete(id, options , (err,model) => {
        if(!err) return res.send(`Post Of (${id}) Has Been Deleted`)
        res.status(404).send(`ID:${id} May Not Found \n` + err)
    }).clone(); 

})


module.exports = router