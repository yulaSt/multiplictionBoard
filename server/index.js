import express from 'express';

const port = process.env.PORT || 3000;

const app = express();
app.use('/fontawesome', express.static('node_modules/@fortawesome/fontawesome-free/css'));
app.use('/webfonts', express.static('node_modules/@fortawesome/fontawesome-free/webfonts'));
app.use('/', express.static('client'))

app.listen(port, () => {
    console.log(`listening on ${port}`);
})
