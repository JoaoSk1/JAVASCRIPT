const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
require('./services/swagger');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', (req,res) => {
    res.cookie('meuCookie2024', 'abcde');
    res.send('Hello World!'); 
});

require('./routers/index')(app);
app.get('/', (req,res) =>{ res.send('Hello World');});

app.use('/v1/docs', express.static('src/views'))
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'))

app.listen(port, () => {
    console.log(`Aplicação rodando na porta ${port}`);
});
 
