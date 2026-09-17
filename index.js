const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.use(express.static(path.join('public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/:email', async (req, res) => {
  try {
  const email = req.query.email;
  console.log(email);
  const options = {method: 'GET'};
  
  
    const API_KEY='36b2063f4d854aca9a74b72d524ee3f5';
    const url =`https://emailreputation.abstractapi.com/v1/?api_key=${API_KEY}&email=${email}`;

     const response = await fetch(url, {method: 'GET'});
  const data = await response.json(); 

  console.log(data);
  res.json(data);
  }

   catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching email details.' });
  }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    
});
