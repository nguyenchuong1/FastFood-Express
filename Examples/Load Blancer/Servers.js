const express = require('express');
const app = express();

const cors = require('cors');

app.use(cors()); 

let  x = app.get('/', (req, res) => {
    res.send('Response from Server 1');
});



x.get('/health', (req, res) => {
  res.status(200).send('Server 1 is healthy'); // server number change karein
});




let  y = app.get('/', (req, res) => {
  res.send('Response from Server 2');
});

y.get('/health', (req, res) => {
  res.status(200).send('Server 2 is healthy'); // server number change karein
});





let  z = app.get('/', (req, res) => {
  res.send('Response from Server 3');
});

z.get('/health', (req, res) => {
  res.status(200).send('Server 3 is healthy'); // server number change karein
});





let  x1 = app.get('/', (req, res) => {
  res.send('Response from Server 4');
});

x1.get('/health', (req, res) => {
  res.status(200).send('Server 2 is healthy'); // server number change karein
});




x.listen(3001, () => {
    console.log('Server 1 listening on port 3001');
});


y.listen(3002, () => {
  console.log('Server 2 listening on port 3002');
});



z.listen(3003, () => {
  console.log('Server 3 listening on port 3003');
});



x1.listen(3004, () => {
  console.log('Server 4 listening on port 3004');
});
