var inquirer=require('inquirer');
var mysql=require('mysql');


var connection=mysql.createConnection({
  host:"localhost",
  port: 3306,
  user:"root", 
  password:"barber123", 
  database:"Bamazon"})


connection.connect(function(err){
  if(err){
    console.error("error connecting: "+err.stack);}
  makeTable();})


var makeTable=function(){
  
  connection.query('SELECT * FROM products',function(err,res){
    if(err)throw err;
    //PRINTS THE TABLE TO THE CONSOLE WITH MINIMAL STYLING//
    var tab="\t";
   
    for(var i=0;i<res.length;i++){
      console.log(res[i].ItemID+tab+res[i].ProductName+tab+res[i].DepartmentName+tab+res[i].Price+tab+res[i].StockQuantity);}
    
    promptCustomer(res);})}


var promptCustomer=function(res){
 
  inquirer.prompt([
    {type:'input',
    name:'choice',
    message:'What would you like to purchase? [Quit with Q]'}]).then(function(val){
    
    var correct=false;

    for(var i=0;i<res.length;i++){
      
      if(res[i].ProductName==val.choice){
        var correct=true;
        var product=val.choice;
        var id=i;
       
        inquirer.prompt([
          {type:'input',
          name:'quantity',
          message:"How many would you like to buy?"}]).then(function(val){
          
          if((res[id].StockQuantity-val.quant)>0){
            
            connection.query("UPDATE products SET StockQuantity='"+(res[id].StockQuantity-val.quant)+"' WHERE ProductName='"+product+"'", function(err, res2){
              if(err)throw err;
              
              console.log("PRODUCT BOUGHT!");
            
              makeTable();})}
          
          else{
            console.log("NOT A VALID SELECTION!");
            promptCustomer(res);}})}
      
      if(val.choice=="Q"||val.choice=="q"){process.exit()}}
    
    if(i==res.length&&correct==false){
      console.log("NOT A VALID SELECTION");
      promptCustomer(res);}
    })}