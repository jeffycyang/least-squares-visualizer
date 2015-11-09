function transposeArray(arr,xLen){
    var newArray = [];
    var numCol = arr[0].length;
    for(var i = 0; i < numCol; i++){
        newArray[i]=[];
    }
    for(var j = 0; j < xLen ; j++){
        for(var k = 0; k < numCol; k++){
            newArray[k].push(arr[j][k]);
        }
    }
    return(newArray);
}