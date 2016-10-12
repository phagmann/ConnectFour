//ToDo: implement droppiece, evaluation, and then keep track of which move wins after search 

function Tree(){
    this.currentNode = null;
    this.depth = 0
}
Tree.prototype.nowVisted = function(index){
    this.currentNode.visted = true;
}
Tree.prototype.ifVisted = function(index){
    if (this.currentNode.visted == true){
        return true
    }
    else{
        return false
    }
}

Tree.prototype.PreviousNodeAt = function(index){
     return this.currentNode.previous[index]
     
}
Tree.prototype.PreviousSetLength = function(){
    return this.currentNode.previous.length
}

Tree.prototype.ScoutFirstPreviousOpen = function(){
    for (i=0; i < this.currentNode.previous.length; i++){
        
        if (this.PreviousNodeAt(i).visted == false){
            return this.PreviousNodeAt(i)
        }
    }
    return;
}

Tree.prototype.PreviousValues = function(){
    var set = []
    for (i=0; i < this.currentNode.previous.length; i++){
        set.push(this.PreviousNodeAt(i).value)



    }
    return set
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

Tree.prototype.newadd = function(value){
    var node = {
        value: value,
        next: null,
        previous: [],
        alpha: -Infinity,
        beta: Infinity,
        board: null,
        uncontested: [],
        gdex: 0

    };
    if(this.currentNode === null){
        this.currentNode = node;
        this.depth++
        this.currentNode.board = this.currentNode.value
        this.currentNode.value = null
        this.currentNode.uncontested = findChoices(this.currentNode.board)
        this.currentNode
        return;
    } 
    
    this.gdex++
    node.next = this.currentNode;
    this.currentNode.previous.push(node)
    this.currentNode = node
    this.currentNode.alpha = this.currentNode.next.alpha
    this.currentNode.beta = this.currentNode.next.beta
    var b = dropPiece(this.currentNode.board.next, this.currentNode.next.uncontested[this.gdex], this.depth)
    this.currentNode.board = b[0]
    if (this.depth % 2 == 1){
        this.currentNode.value == this.currentNode.value + b[1]
    }
    else{
        this.currentNode.value == this.currentNode.value - b[1]
    }
    this.currentNode.uncontested = findChoices(th-is.currentNode.board)
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
        pruned: 0,
        board: null,
        uncontested: [],
        gdex: 0
    };
    this.gdex++ 
    node.next = this.currentNode;
    this.currentNode.previous.push(node)
    var b = dropPiece(this.currentNode.board, this.currentNode.uncontested[this.gdex], this.depth)
    if (this.depth % 2 == 1){
        this.currentNode.value == this.currentNode.value + b[1]
    }
    else{
        this.currentNode.value == this.currentNode.value - b[1]
    }
    
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

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function maxmin (list, depth){
    // debug(list)
    //Math.min.apply(Math, list)
    if (depth % 2 == 1){
        
        return Math.max.apply(Math, list) 
      }
    else{
        
        return Math.min.apply(Math, list)
    }
}

function AplhaBetaPruning (data, depth){
    var childern = data[0].length
    var q = new Tree();
    q.newadd(data);
    var countdown = childern; //how many childern for starting point
    var leader = -Infinity
      while( countdown > 0){
          if (q.currentNode.uncontested !==null && q.getDepth() < depth - 1 ){
            if (q.ifPrune()){
                q.currentNode.uncontested = []
                continue;
            }
            q.newadd();
            continue;
          }        
          else if ( q.getDepth() >= depth - 1){
            for ( var z=0; z < q.currentNode.uncontested.length; z++){
                q.add()
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
            if (q.PreviousNodeAt(childern - countdown) == q.Value() ){
                Leader = q.currentNode.uncontested[childern - countdown]
            }
            countdown--

            if(countdown <= 0){
                debug("win")
                debug(q.Value())
                return Leader;
            }         
            q.newadd();
            
         }
      }
      return Leader;

            }










// debug(dfs(q))
debug("")
var d = 
AplhaBetaPruning ([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], 3)
// (childern, depth)
//code breaks if depth = 29

