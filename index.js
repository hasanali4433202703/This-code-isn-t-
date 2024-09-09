const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;

let schema = mongoose.Schema;

const contactschema = new Schema({
  userip: String, 
  useragent: String
});

const Contact = mongoose.model('Contact', contactschema);

// delete method route
app.delete('/:id', (req, res) => {
  let {id} = req.params;
  connect.findOneAndDelete({_id:id})
    .then(connect => {
      res.json(connect);
    })
    .catch(e => {
        res.json(e);
      })
});

// POST method route
app.post('/poster', (req, res) => {
  let {userip,useragent} = req.body;
  let connect = new Contact({
      userip,
      useragent
  });
  
  connect.save()
    .then(c => {
      res.json(c);
    })
    .catch(e => {
      res.json(e);
    })
});

// GET method route
app.get('/', (req, res) => {
  connect.find()
    .then(connects => {
      res.json(connects);
    })
    .catch(e => {
          res.json(e);
        })
});



/* mongoose connect*/

async function main() {
  await mongoose.connect('mongodb+srv://leonardjon39:rCyQM5Xk5HOsotqz@cluster0.fdcfo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main()
.then(()=> {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})
.catch(err => console.log(err));


