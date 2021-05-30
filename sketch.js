var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed,time;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feedDog= createButton("Feed The Dog");
  feedDog.position(700,95);
  feedDog.mousePressed(feedDogs);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  time=hour();
  console.log("currenttime"+time);

}

function draw() {
  background(46,139,87);
  foodObj.display();
//console.log("hello")
  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data)
  {
    lastFed=data.val();
  })
 
  //write code to display text lastFed time here
  fill("red");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed===0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 //console.log(lastFed);
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDogs(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var food_stock_val=foodObj.getFoodStock();
if(food_stock_val<=0){
  foodObj.updateFoodStock(food_stock_val *0);
}else{
  foodObj.updateFoodStock(food_stock_val -1);

}
lastFed=hour();
console.log(hour())
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:time

})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
