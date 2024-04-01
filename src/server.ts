import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
const port = process.env.PORT || 8001;

const rawData = fs.readFileSync(path.join(__dirname, 'data.json'));
const data = JSON.parse(rawData.toString());

app.use(bodyParser.json());

app.use(cors())

function generateNewId(enterprises) {
  const ids = enterprises.map(enterprise => enterprise.id);
  const nextId = Math.max(...ids.map(id => parseInt(id.slice(2)))) + 1;
  return 'PA' + String(nextId).padStart(3, '0');
}

// Fetch all enterprises
app.get('/enterprises', (req, res) => {
    if(data.enterprises){
      res.status(200).json(data.enterprises);
    } else {
      res.status(404).json({ message: 'Enterprises not found' })
    }
  });

// Edit a existent enterprise
app.put('/enterprises/:id', (req, res) => {
  const id = req.params.id;
  const updatedEnterprise = req.body;

  const enterpriseIndex = data.enterprises.findIndex(enterprise => enterprise.id === id);

  if (enterpriseIndex !== -1) {
    data.enterprises[enterpriseIndex] = { ...data.enterprises[enterpriseIndex], ...updatedEnterprise };
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Enterprise updated successfully' });
  } else {
    res.status(404).json({ message: 'Enterprise not found' });
  }
})

//Add a new enterprise
app.post('/enterprises', (req, res) => {
  const newEnterprise = req.body;

  const requiredFields = ['name', 'status', 'purpose', 'ri_number', 'address'];

  const missingFields = requiredFields.filter(field => !newEnterprise.hasOwnProperty(field));

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }

  newEnterprise.id = generateNewId(data.enterprises)

  data.enterprises.push(newEnterprise);
  fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
  res.status(200).json({ message: 'Enterprise added successfully', enterprise: newEnterprise });
});

//Delete a existent enterprise
app.delete('/enterprises/:id', (req, res) => {
  const id = req.params.id;

  const enterpriseIndex = data.enterprises.findIndex(enterprise => enterprise.id === id);

  if (enterpriseIndex !== -1) {
    data.enterprises.splice(enterpriseIndex, 1);
    fs.writeFileSync(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Enterprise deleted successfully' });
  } else {
    res.status(404).json({ message: 'Enterprise not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});