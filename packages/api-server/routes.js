const express = require("express");
const modifyGit=require('./gits/index')

const router = express.Router();

router.get('/skeleton/get', (req, res) => {
  res.send('GET router request skeleton')
})

router.post('/skeleton/save', (req, res) => {
    // create('test')
 
 const rawHtml=Buffer.from(req.body.rawHtml, 'base64').toString('utf-8')
   modifyGit({componentName:req.body.componentName, rawHtml:rawHtml,pageName:req.body.pageName})
  res.send('POST router request123')
})

module.exports=router;
