const express =  require('express')  ;  
const  Razorpay  = require('razorpay')  ;  
const  bodyParser =  require('body-parser') ; 
const  cors =  require('cors')  ;  
const crypto   = require('crypto') ;  

const app   =  express() ;   
app.use(bodyParser.json())  ; 
app.use(cors())  ; 

// Initialize Razorpay instance with your API key and secret
const razorpay = new Razorpay({
  key_id: 'YOUR_RAZORPAY_KEY_ID',
  key_secret: 'YOUR_RAZORPAY_SECRET_KEY',
});


// endpoint  ot  create   a  new  order 
app.post('api/create-order'  ,  async (req , res )  => {
    const  {amount ,   currency  } =  req.body  ; 

    try {
        const  options =  {
            amount: amount * 100, // amount in the smallest currency unit
            currency: currency,
            receipt: `receipt_order_${Math.random() * 10 ** 10 }`,
        };  
        const  order =  await razorpay.orders.create(options )  ; 
        res.json(order)  ; 
        
    }catch(error ){
        res.status(500).send(error)  ; 

    }
})  ;  

// endpoint ot verify  payment signature 

app.post('api/verify-payment'  , (req , res )  =>{
    const {order_id,  payment_id ,  signature }   =  req.body  ; 

    const  generatedSignature   = crypto
    .createHmac('sha256'  ,  razorpay.key_secret)
    .update(order_id  + '|' + payment_id)   
    .digest('hex')    ; 


    if (generatedSignature === signature ){
        res.json({ status  : 'success' })   ;

    }else {
    res.status(400).json({ status: 'failure' });
    }


    
});  


// start the  server 
const  PORT = process.env.PORT || 5000 ;  
app.listen(PORT ,  () => {
    console.log(`Server  is  running  on  port  ${PORT}`)  ; 

}); 
