const express = require('express');
const productsRouter = require("./routers/products.router");
const cartRouter = require('./routers/carrito.router');
const realTimeProductsRouter = require('./routers/realTimeProducts.router');
const homeViewsRouter = require('./routers/homeViews.router')
const app = express();

const handlebars = require('express-handlebars');
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const socketServer = new Server(server);

socketServer.on('connection', (socket) => {
  console.log('Cliente conectado')
})

app.use(express.static(__dirname+'/public'))
 
//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers
app.use(productsRouter);
app.use(cartRouter);
app.use(homeViewsRouter)
app.use(realTimeProductsRouter);

//Listen
server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
