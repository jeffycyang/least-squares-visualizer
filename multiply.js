function matrixMultiply(Q,P){
    var qRows=Q.length;
    var qCols=Q[0].length;
    var pRows=P.length;
    var pCols=P[0].length;
    var prod=new Array(qRows);
    if(qCols!==pRows){
        return;
    }
    if(pCols===1){
        for(var j=0;j<qRows;j++){
            prod[j]=[0];
            for(var k=0;k<pCols;k++){
                for(var l=0;l<qCols;l++){
                    prod[j][0]+=Q[j][l]*P[l][k];
                }
            }
        }
        return prod;
    }else if(pRows===qCols){
        for(var i=0;i<qRows;i++){
            prod[i]=[0];
            for(var j=0;j<pCols;j++){
                prod[i][j]=0;
                for(var k=0;k<qCols;k++){
                    prod[i][j]+=Q[i][k]*P[k][j];
                }
            }
        }
    }else{
        for(var i=0;i<qCols;i++){
            prod[i]=new Array(pCols);
            for(var j=0;j<pRows;j++){
                prod[i][j]=0;
                for(var k=0;k<qCols;k++){
                    prod[i][j]+=Q[i][k]*P[k][j];
                }
            }
        }
    }
    return prod;
}