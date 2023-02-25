require('./config/Db')
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const NotesRoute = require('./routes/notesRoute')
const ArchiveRoute = require('./routes/archiveRoute')
const PinRoute = require('./routes/pinRoute')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/notes', NotesRoute);
app.use('/archive', ArchiveRoute);
app.use('/pin', PinRoute);
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))