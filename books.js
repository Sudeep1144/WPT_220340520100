const express =require('express');
const app = express();
const mysql = require('mysql2');

app.listen(90,()=>{
    console.log("Listening to port number 90");
});

app.use(express.static("sf"));
let dbparams={
    host :'localhost',
    user:'root', 
    password:'cdac',
    database:'wpt',
    port : 3306
}
const conn = mysql.createConnection(dbparams);

app.get("/getdetails",(req,resp)=> 
{

    console.log("inside get details");
    let bookid = req.query.bookid;
    console.log(bookid);
    console.log("connection succesfull");
    let output = {status:false,bookdetails:{bookid:0,bookname:"",price:0}}
    conn.query('select * from book where bookid=?',[bookid],
    (error,rows)=>{
        if(error){
            console.log("Some Error"+error)
        }
        else{
            if(rows.length>0){
                output.status=true;
                output.bookdetails=rows[0];
            }
            else{
                console.log("Books not found");
    
            }
            
        }
        resp.send(output);
    });
    
});

app.get("/updatebook",(req,resp)=>{
   console.log("Inside Update Function");
   let bookdetails = {bookid :req.query.bookid,bookname:req.query.bookname,price:req.query.price}
   let output = {status:false}

   conn.query('update book set bookid=?,bookname=?,price=?',[bookdetails.bookid,bookdetails.bookname,bookdetails.price],
   (error,res)=>{
      if(error){
        console.log(error);
    }
     else {
        if(res.affectedRows>0){
            console.log("update succesfull");
            output.status =true; 
        }
        else{
            console.log('update failed');
        }
     }
     resp.send(output);
   });  
 
   });

 

