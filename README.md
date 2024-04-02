# Challenge-dev-api

This is a simple API for managing a list of enterprises. It uses a JSON file to store the data and provides four endpoints to interact with the data.

## Getting Started
To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/trpiano/challenge-dev-api.git
cd challenge-dev-api
npm install
# or
pnpm i
# or
yarn install

# Run the project
npm start
# or
pnpm start
# or
yarn start

# The server will initialize in the <http://localhost:8001>
```
## Fetch all enterprises
### GET - '/enterprises'

```typescript
const Enterprises = async () => {
  await axios.get(`http://localhost:8001/enterprises`)
    .then((response) => {
      console.log(response.data)
    });
  }
```

## Edit a existent enterprise
### PUT - '/enterprises/:id'

```typescript
const formData = {
  name: 'string',
  launch: 'string',
  purpose: 'string',
  address: {
    street: 'string',
    number: 'string',
    district: 'string',
    city: 'string',
    state: 'string',
    cep: 'string',
  }
}

await axios.put(`http://localhost:8001/enterprises/:id`, formData)
  .then((response) => {
    console.log(response.data)
  })
  .catch((err) => {
    console.error(err)
  })
```

## Add a new enterprise
### POST - '/enterprises'

```typescript
const formData = {
  name: 'string',
  launch: 'string',
  purpose: 'string',
  address: {
    street: 'string',
    number: 'string',
    district: 'string',
    city: 'string',
    state: 'string',
    cep: 'string',
  }
}

await axios.post(`http://localhost:8001/enterprises`, formData)
  .then((response) => {
    console.log(response.data)
  })
  .catch((err) => {
    console.error(err)
  })
```

## Delete a existent enterprise
### DELETE - '/enterprises/:id'

```typescript
await axios.delete(`http://localhost:8001/enterprises/:id`)
  .then((response) => {
    console.log(response.data)
  })
  .catch((err) => {
    console.error(err)
  })
```
