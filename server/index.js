const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment,
        getFortune,
        getAllInspirations,
        deleteInspiration,
        createInspiration,
        updateInspiration,
} = require('./controller.js')


app.get("/api/compliment", getCompliment);
app.get('/api/fortune', getFortune);
app.get('/api/inspirations', getAllInspirations)
app.delete('/api/inspirations/:id', deleteInspiration)
app.post('/api/inspirations', createInspiration)
app.put('/api/inspirations/:id', updateInspiration)



app.listen(4000, () => console.log("Server running on 4000"));
