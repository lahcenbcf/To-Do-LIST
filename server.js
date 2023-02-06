const express=require('express');
const { ObjectId } = require('mongodb');
const app=express()
const path = require('path');
const sanitize=require('sanitize-html')
const {connect,client}=require('./config')
const db=client.db()
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
connect().then(()=>{
    console.log('is connected')
})
const passwordProtection=(req,res,next)=>{
    const auth = {login: 'admin', password: 'admin'} // change this

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    return next()
  }

  // Access denied...
  res.set('WWW-Authenticate', 'Basic realm="401"') // change this
  res.status(401).send('Authentication required.') // custom message

}
app.use(passwordProtection)
app.get('/',async(req,res)=>{
    const items=await db.collection('items').find().toArray()
    res.render('index',{
        items:items
    })
})
app.post('/create',(req,res)=>{
    const InsertedId=new ObjectId()
    const safedata=sanitize(req.body.text,{allowedTags:[],allowedAttributes:{}})
    db.collection('items').insertOne({_id:InsertedId,text:safedata}).then(()=>{
        return res.send(InsertedId)
    })
})
app.post('/update',(req,res)=>{
    const safedata=sanitize(req.body.text,{allowedTags:[],allowedAttributes:{}})
    db.collection('items').findOneAndUpdate({_id:new ObjectId(req.body._id)},{$set:{text:safedata}},()=>{
        res.redirect('/')
    })
})  
app.post('/delete',(req,res)=>{
    db.collection('items').deleteOne({_id:new ObjectId(req.body._id)},()=>{
        res.redirect('/')
    })
    
})
app.listen(3000)


