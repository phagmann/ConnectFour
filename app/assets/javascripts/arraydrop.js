
var d = [[0,0,0],[0,0,1],[0,1,1]]


function reader(data){
    data.forEach(function(entry) {
    debug(entry);
})
}

reader(d)
function ifArrayWin(data){

    for ( var col = 0; col <= data[0].length - 1; col++){
    for ( var row = 0; row <= data.length -1; row++){
      var target = data[col][row];
      //var gDex = col*data[col].length + row
      for ( var y = -1; y <= 1; y++){
        for ( var x = -1; x <= 1; x++){
          var curX= row + x;
          var curY= col + y;
          if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data[0].length){
            if (data[curY][curX] == target && data[curY][curX]!= 0 && !(x == 0 && y == 0) ){
              curX = curX + (curX - row);
              curY = curY + (curY - col);
          // if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data.length){
          //   if (data[curY][curX] == target && data[curY][curX]!= 0 && !(x == 0 && y == 0) ){
          //     curX = curX + (curX - row - x);
          //     curY = curY + (curY - col - y);

              if (curX  >= 0 && curX < data.length  && curY  >= 0 && curY < data[0].length){
                if (data[curY][curX] == target){
                 return target

                }

              }
              }
// }
// }
              }
             }
  
        }
      }

}

}
function evalutation(data,spot){
    var pos = 0;
    //spot = [realY][realX]
    if(ifArrayWin(data) == 1){
        return  -1000000
        }
    if(ifArrayWin(data) == 2){
        return  1000000
        }
        
        for ( var y = -1; y <= 1; y++){
            for ( var x = -1; x <= 1; x++){
                //check out of bounds
                if (spot[1] + x  >= 0 && spot[1] + x < data.length  && spot[0] + y >= 0 && spot[0] + y< data.length && !(x==0 && y==0)){
                    //check if next to a taken spot
                    if(data[spot[0] + y][spot[1] + x] > 0){

                    pos++
            }

              }
            }
        }

    
    return pos 
}


// drops peice in a given collom in connect four
function dropPiece(data, change_col, depth){
  
  var player = depth % 2 +1
  for ( var i= data.length -1; i >= 0 ; i--){
    if (data[i][change_col] == 0){
        data[i][change_col] = player
        return [data,evalutation(data,[i,change_col])]
    }
  }
  return [data,-1000]
}

function findChoices(data){
  var store =[]
  for ( var change_col= 0 ;change_col < data[0].length ; change_col++){
    for ( var i= data.length -1; i >= 0 ; i--){
      if (data[i][change_col] == 0){
        store.push("g" + (i*data[0].length + change_col + 1).toString())
        break
      } 
    }
  }
  return store
}
debug("")
debug(findChoices(d.slice()))
debug("")
var win = dropPiece(d.map(function(arr) {
    return arr.slice();
}), 0, 1)
reader(win[0])
debug("")
debug(win[1])
debug("")
debug(findChoices(win[0].slice()))
debug("")
debug("")
var p = dropPiece(d.map(function(arr) {
    return arr.slice();
}), 1, 1)
reader(p[0])
debug("")
debug(p[1])


