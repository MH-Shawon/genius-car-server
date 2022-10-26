const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.4gymayc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

  try {
    const serviceCollection = client.db("geniusCar").collection("service");
    const orderCollection = client.db('geniusCar').collection('order');
    app.get('/service', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);

    });

    app.get('/service/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    // post
    app.post ('/service', async(req, res)=>{
      const newService = req.body;
      const result = await serviceCollection.insertOne(newService);
      res.send(result);
    });

    // Delete

    app.delete('/service/:id', async(req, res)=>{
      const id =req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await serviceCollection.deleteOne(query);
      res.send(result);
    });

    // order collection API 

    app.post('/order', async(req,res)=>{
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    })





    app.get('/', (req, res) => {
      res.send('Crud Server is running')
    })
  }
  finally {

  }
}






app.listen(port, () => {
  console.log('Listenig to Crud')
})

run().catch(console.dir);