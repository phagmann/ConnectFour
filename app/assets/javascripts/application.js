// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.

//TODO: fix eval and alpha beta

//Rand(0,1)
//
function ifArrayWin(data){

    for ( var col = 0; col <= data[0].length - 1; col++){
    for ( var row = 0; row <= data.length -1; row++){
      var target = data[col][row];
      //var gDex = col*data[col].length + row
      if (target == 0){
        continue;
      }
      for ( var y = -1; y <= 1; y++){
        for ( var x = -1; x <= 1; x++){
          var curX= row + x;
          var curY= col + y;
          if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data[0].length){
            if (data[curY][curX] == target  && !(x == 0 && y == 0) ){
              curX = curX + (curX - row);
              curY = curY + (curY - col);
          if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data.length){
            if (data[curY][curX] == target && data[curY][curX]!= 0 && !(x == 0 && y == 0) ){
              curX = curX + (curX - row - x);
              curY = curY + (curY - col - y);

              if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data[0].length){
                if (data[curY][curX] == target){
                 return target

                }

              }
              }
}
}
              }
             }
  
        }
      }

}

}
function evalutation(datab,spot){
    var pos = 0;
    //spot = [realY][realX]
    if(ifArrayWin(datab) == 1 || ifArrayWin(datab) == 2){
        //("luck")
        return  1000000
        }
        
        for ( var y = -1; y <= 1; y++){
            for ( var x = -1; x <= 1; x++){
                //check out of bounds
                if (spot[1] + x  >= 0 && spot[1] + x < datab.length  && spot[0] + y >= 0 && spot[0] + y< datab.length && !(x==0 && y==0)){
                    //check if next to a taken spot
                    if(datab[spot[0] + y][spot[1] + x] > 0){

                    pos++
            }

              }
            }
        }
    return pos 
}


// drops peice in a given collom in connect four
function dropPiece(dataw, g, depth){
  //(depth.toString()+g)
  var change_col =   ((parseInt(g.substring(1)) - 1)% dataw[0].length) 
  //1,2,3,4,0

  //0,1,2,3,4
  var player = depth % 2 + 1
  if(ifArrayWin(dataw) == 1 || ifArrayWin(dataw) == 2){
    return [dataw,100000]
  }
  for ( var i= dataw.length -1; i >= 0 ; i--){
    if (dataw[i][change_col] == 0){
        dataw[i][change_col] = player
        return [dataw,evalutation(dataw,[i,change_col])]
    }
  }
  return [dataw,0]
}

function findChoices(data){
  var store =[]
  for ( var change_col= 0 ; change_col < data[0].length ; change_col++){
    for ( var i= data.length -1; i >= 0 ; i--){
      if (data[i][change_col] == 0){
        store.push("g" + (i*data[0].length + change_col + 1).toString())
        break
      } 
    }
  }
  return store
}

function Tree(){
    this.currentNode = null;
    this.depth = 0
    this.leading = -Infinity
}

Tree.prototype.PreviousNodeAt = function(index){
     return this.currentNode.previous[index]
     
}


// Tree.prototype.firstPrevious = function(index){
//     this.currentNode.visted = true;
// }

Tree.prototype.Next = function(){
    this.depth--
    this.currentNode = this.currentNode.next
}

Tree.prototype.Value = function(){
    return this.currentNode.value
}

Tree.prototype.newadd = function(value,dataa){
    var node = {
        value: value,
        next: null,
        previous: [],
        alpha: -Infinity,
        beta: Infinity,
        board: null,
        uncontested: [],
        total: 0,
        gdex: 0

    };
    if(this.currentNode === null){
        this.currentNode = node;
        this.depth++
        this.currentNode.board = dataa.map(function(arr) {
    return arr.slice();
})
        this.currentNode.uncontested = findChoices(this.currentNode.board.map(function(arr) {
    return arr.slice();
}))
        //("base")
        //(this.currentNode.board)
        //("base")
        this.currentNode
        return;
    } 
    
    
    node.next = this.currentNode;
    this.currentNode.previous.push(node)
    this.currentNode = node
    this.currentNode.alpha = this.currentNode.next.alpha
    this.currentNode.beta = this.currentNode.next.beta
    // //(this.currentNode.next.gdex)
    var b = dropPiece(this.currentNode.next.board.map(function(arr) {
    return arr.slice();
}), this.currentNode.next.uncontested[this.currentNode.next.gdex], this.depth)

    
    this.currentNode.board = b[0]
    if (this.depth % 2 == 1){
        this.currentNode.total = this.currentNode.next.total + b[1]
    }
    else{
        this.currentNode.total = this.currentNode.next.total - b[1]
    }
    
    this.currentNode.uncontested = findChoices(this.currentNode.board.map(function(arr) {
    return arr.slice();
}))
    //(this.currentNode.board)
    //(this.currentNode.uncontested)
    this.currentNode.next.gdex++
    this.depth++
    return;
}


Tree.prototype.add = function(value){
    var node = {
        value: value,
        next: null,
        previous: [],
        alpha: -Infinity,
        beta: Infinity,
        board: null,
        uncontested: [],
        total: 0,
        gdex: 0
    };
     
    node.next = this.currentNode;
    this.currentNode.previous.push(node)
    var b = dropPiece(this.currentNode.board.map(function(arr) {
    return arr.slice();
}), this.currentNode.uncontested[this.currentNode.gdex], this.depth)
    
      if (this.depth % 2 == 1){
        this.PreviousNodeAt(this.currentNode.gdex).value =  b[1] + this.currentNode.total

      }
      else{
        this.PreviousNodeAt(this.currentNode.gdex).value = (-1*b[1]) + this.currentNode.total
      }
    this.currentNode.gdex++
    return;
};


Tree.prototype.getDepth = function(){
    var start = this.currentNode;
    var depth = 1;
    while (start.next !== null){
        start = start.next;
        depth++
    }
    return depth;
}




Tree.prototype.ifPrune = function(){
    if (this.currentNode.alpha >= this.currentNode.beta){
        return true
    }
    else{
        return false
    }

}

Tree.prototype.getAlphaBeta = function(depth,index){
    if (depth % 2 == 0){
        if( this.PreviousNodeAt(index).value < this.currentNode.beta){
            this.currentNode.beta = this.PreviousNodeAt(index).value
            this.currentNode.value = this.currentNode.beta
        }

    }
    else{
        if (this.PreviousNodeAt(index).value > this.currentNode.alpha){
            this.currentNode.alpha = this.PreviousNodeAt(index).value
            this.currentNode.value = this.currentNode.alpha
        }


    }

    }

Tree.prototype.moveAlphaBetaUp = function(depth){
    if (depth % 2 == 0){
        if ( this.currentNode.beta > this.currentNode.next.alpha){
            this.currentNode.next.alpha = this.currentNode.beta
            this.currentNode.next.value = this.currentNode.next.alpha 
     }
    }
    else{
        if (this.currentNode.alpha < this.currentNode.next.beta){
            this.currentNode.next.beta = this.currentNode.alpha
            this.currentNode.next.value = this.currentNode.next.beta
            }
        }
    

    }


function AlphaBetaPruning (dataa, depth){
    
    var q = new Tree();
    q.newadd(null,dataa.map(function(arr) {
    return arr.slice();
}));
    var childern = q.currentNode.uncontested.length
    var countdown = childern; //how many childern for starting point
    var leader = q.currentNode.uncontested[0]
    //(countdown)
      while( countdown > 0){
          if (q.currentNode.uncontested !==null && q.getDepth() < depth - 1 && q.currentNode.gdex < q.currentNode.uncontested.length ){
            if (q.ifPrune()){
                
                q.currentNode.uncontested = [];
                continue;
            }
            q.newadd();
            continue;
          }        
          else if ( q.getDepth() >= depth - 1){
            for ( var z=0; z < q.currentNode.uncontested.length; z++){
                q.add()
                //(q.PreviousNodeAt(z).value)
                if ( q.ifPrune()){
                    q.getAlphaBeta(q.getDepth(),z);
                    break;
                }
                q.getAlphaBeta(q.getDepth(),z);
            }
            q.moveAlphaBetaUp (q.getDepth())
            q.Next();
          }
          else{
            q.moveAlphaBetaUp (q.getDepth())     
            q.Next();
          };
         if (q.currentNode.next === null){
            //("yyyyy")
            //(q.Value())
            //(q.leading)
            //("yyyyy")
            if (q.leading < q.Value() ){
                leader = q.currentNode.uncontested[childern - countdown]
                q.leading = q.Value()
            }
            countdown--
            //(countdown)
            if(countdown <= 0){
                //("winner")
                //(leader)
                return leader;
            }         
            q.newadd();
            
         }
      }
      return leader;

            }

// ###################################################################################################################################################################################################


function getOffset( currDiv ) {
    var rect = currDiv.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || currDiv.offsetWidth,
        height: rect.height || currDiv.offsetHeight
    };
}

function connect(div1, div2, color, thickness) { // draw a line connecting elements
    var off1 = getOffset(div1);
    var off2 = getOffset(div2);
    // bottom right
    var x1 = off1.left ;
    var y1 = off1.top ;
    // top right
    var x2 = off2.left ;
    var y2 = off2.top;
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1))) + 300;
    // center
    var cx = ((x1 + x2) / 2) - (length / 2) + 25;
    var cy = ((y1 + y2) / 2) - (thickness / 2) + 25;
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = "<div style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute ; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    //
    // alert(htmlLine);
    document.body.innerHTML += htmlLine;
}

function Range(min,max){

var foo = [];

for (var i = min; i <= max; i++) {
   foo.push(i);
}
return foo
}


function Rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function press(div,track) {

  var className = div.getAttribute("class");
  if(className == "col-sm-5 egg" && track % 2 == 0) {
      //("bam")
      div.className = "col-sm-5 circle";
      div.disabled = true;
  }
  else if(className == "col-sm-5 egg" && track % 2 == 1){
      //("wam")
      div.className =  "col-sm-5 cross";
      div.disabled = true;
  }
}
function stackUp(div,num1,num2){
     datID = div.id.substring(1);
     newdiv = document.getElementById("g" + (parseInt(datID) - num2).toString())
     //newdiv.body.style.color = "gray";
     if (parseInt(datID) - num2 > 0){
        newdiv.disabled = false
     }  
     return
   }


function shutdown(curX,curY,row,col,num1,num2,data){
  for (var i = 1; i <= num1*num2; i++){

    var currentDivId = "g";
    currentDivId += i.toString(); 
    document.getElementById(currentDivId).disabled = true;

  }
  var origin=document.getElementById("g" + ((col)*data[col].length + (row+1)).toString()); 
  var end=document.getElementById("g" + ((curY)*data[curY].length + (curX+1)).toString()); 
  connect(origin, end, "blue", 20)
  return 
}
function datasArray(num1,num2){
  var d = [];
  var r =[];

  for (var ii = 1; ii <= num1*num2; ii++) {
    var currentDivId = "g";
    currentDivId += ii.toString();
    ////(currentDivId);
    var className = document.getElementById(currentDivId).getAttribute("class");
    if(className == "col-sm-5 egg" ) {
      
      r = r.concat(0);
     }
    else if(className == "col-sm-5 circle" ){
      
      r = r.concat(1);
       }
    else if(className == "col-sm-5 cross" ){
      
      r = r.concat(2);
       }
    
    if( ii % num1 == 0) {
      
      d= d.concat([r]);
      r = [];
}

    
};
//(d);
return d;
};


function ifWin(track,switching,num1,num2){

  var data = datasArray(num1,num2);
 //var data = dataa.slice(1)
  //stage 1: stores 0 1's and 2's in a 2d array called data
  //("WISSSSSSSSSSSSSSSSS")
  //(data)
//evalutation(dive,data)
  //stage 2: TODO: 
  //    a) establish evaluation function DONE
  //    b) find a way to smoothly integrate alpha beta pruning with eval function HARD
  //    c) have button pressed    { div.click() }  EASY
  if (switching ==1){
    var g = AlphaBetaPruning(data,7)
    var winning = document.getElementById(g);
    //winning.click();
    press(winning,track);
    stackUp(winning,num1,num2);
    data = datasArray(num1,num2);

}
  //stage 3: figures out if a player has won



  for ( var col = 0; col <= data[0].length - 1; col++){
    for ( var row = 0; row <= data.length -1; row++){
      var target = data[col][row];
      //var gDex = col*data[col].length + row
      if (target == 0){
        continue;
      }
      for ( var y = -1; y <= 1; y++){
        for ( var x = -1; x <= 1; x++){
          var curX= row + x;
          var curY= col + y;
          if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data[0].length){
            if (data[curY][curX] == target  && !(x == 0 && y == 0) ){
              curX = curX + (curX - row);
              curY = curY + (curY - col);
          if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data.length){
            if (data[curY][curX] == target && data[curY][curX]!= 0 && !(x == 0 && y == 0) ){
              curX = curX + (curX - row - x);
              curY = curY + (curY - col - y);

              if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data[0].length){
                if (data[curY][curX] == target){
                  if( switching == 1){
                  shutdown(curX,curY,row,col,num1,num2,data)
                  return
                 }
                 return target

                }

              }
              }
}
}
              }
             }
  


        }


      }


}

}

























//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
