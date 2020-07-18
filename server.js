require('dotenv').config()
const express=require('express');
const app=express();
const morgan=require('morgan');
const mongoose=require('mongoose');
const port=process.env.port || 4000
const productRoutes=require('./routes/products')
const orderRoutes=require('./routes/orders');
const userRoutes = require('./routes/user')

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/rest-shop",{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//Routes which handle request
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next();
})



app.use((req,res,next) =>{
    const error=new Error('not found');
    error.status=404;
    next(error)
})
app.use((error,req,res,next) =>{
res.status(error.status || 500);
res.json({
    error:{
        message:error.message
    }
})
})

app.listen(port,(req,res) =>{
    console.log('server is started')
})