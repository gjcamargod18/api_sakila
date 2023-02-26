const express = require('express')
const mysql = require('mysql2')
const myconn = require('express-myconnection')
const routes = require('./routes')
const app = express()

app.set('port', process.env.PORT || 9000)

const dbOptions = {
    host: '127.0.0.1',
    port: 3306,
    database: 'sakila',
    user: 'root',
    password:'1234',
    insecureAuth : true
}

app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('welcome to my api')
})

app.use('/api', routes)

app.listen(app.get('port'), ()=>{
    console.log('Ejecutando en puerto', app.get('port'))
})