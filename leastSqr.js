// Returns the inverse of matrix `M`.
function matrix_invert(M){
    // I use Guassian Elimination to calculate the inverse:
    // (1) 'augment' the matrix (left) by the identity (on the right)
    // (2) Turn the matrix on the left into the identity by elemetry row ops
    // (3) The matrix on the right is the inverse (was the identity matrix)
    // There are 3 elemtary row ops: (I combine b and c in my code)
    // (a) Swap 2 rows
    // (b) Multiply a row by a scalar
    // (c) Add 2 rows
    
    //if the matrix isn't square: exit (error)
    if(M.length !== M[0].length){return;}
    
    //create the identity matrix (I), and a copy (C) of the original
    var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
    var I = [], C = [];
    for(i=0; i<dim; i+=1){
        // Create the row
        I[I.length]=[];
        C[C.length]=[];
        for(j=0; j<dim; j+=1){
            
            //if we're on the diagonal, put a 1 (for identity)
            if(i==j){ I[i][j] = 1; }
            else{ I[i][j] = 0; }
            
            // Also, make the copy of the original
            C[i][j] = M[i][j];
        }
    }
    
    // Perform elementary row operations
    for(i=0; i<dim; i+=1){
        // get the element e on the diagonal
        e = C[i][i];
        
        // if we have a 0 on the diagonal (we'll need to swap with a lower row)
        if(e===0){
            //look through every row below the i'th row
            for(ii=i+1; ii<dim; ii+=1){
                //if the ii'th row has a non-0 in the i'th col
                if(C[ii][i] !== 0){
                    //it would make the diagonal have a non-0 so swap it
                    for(j=0; j<dim; j++){
                        e = C[i][j];       //temp store i'th row
                        C[i][j] = C[ii][j];//replace i'th row by ii'th
                        C[ii][j] = e;      //repace ii'th by temp
                        e = I[i][j];       //temp store i'th row
                        I[i][j] = I[ii][j];//replace i'th row by ii'th
                        I[ii][j] = e;      //repace ii'th by temp
                    }
                    //don't bother checking other rows since we've swapped
                    break;
                }
            }
            //get the new diagonal
            e = C[i][i];
            //if it's still 0, not invertable (error)
            if(e===0){return}
        }
        
        // Scale this row down by e (so we have a 1 on the diagonal)
        for(j=0; j<dim; j++){
            C[i][j] = C[i][j]/e; //apply to original matrix
            I[i][j] = I[i][j]/e; //apply to identity
        }
        
        // Subtract this row (scaled appropriately for each row) from ALL of
        // the other rows so that there will be 0's in this column in the
        // rows above and below this one
        for(ii=0; ii<dim; ii++){
            // Only apply to other rows (we want a 1 on the diagonal)
            if(ii==i){continue;}
            
            // We want to change this element to 0
            e = C[ii][i];
            
            // Subtract (the row above(or below) scaled by e) from (the
            // current row) but start at the i'th column and assume all the
            // stuff left of diagonal is 0 (which it should be if we made this
            // algorithm correctly)
            for(j=0; j<dim; j++){
                C[ii][j] -= e*C[i][j]; //apply to original matrix
                I[ii][j] -= e*I[i][j]; //apply to identity
            }
        }
    }
    //we've done all operations, C should be the identity
    //matrix I should be the inverse:
    return I;
}
function matrixMultiply(Q,P){
    var qRows=Q.length;
    var qCols=Q[0].length;
    var pRows=P.length;
    var pCols=P[0].length;
    var prod=new Array(qRows);
    if(qCols!==pRows){
        return;
    }else if(pCols===1){
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
            prod[i]=[];
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
function createX(type,xValues,order){
	var xArray;
	if(order){
		xArray=new Array(order-1);
	}else{
		xArray=[];
	}
	//type 0 - polynomial, 1 - exponential, 2 - trigonometric, 3 - logarithmic
	//order only matters for polynomial & trigonometric
	if(type===0||type===2){
		for(var i=0;i<xValues.length;i++){
		    xArray[i]=new Array(order);
			for(var j=0;j<order;j++){
				if(type===0){
					xArray[i][j]=Math.pow(xValues[i],j);
				}else if(type===2){
					
				}
			}
		}
	}else{
		for(var k=0;k<xValues.length;k++){
			//case for exponential and logarithmic
			if(type===1){
				xArray.push([1,xValues[k]]);
			}else if(type===3){
				xArray[k].push([1,Math.log(xValues[k])]);
			}
		}
	}
	return xArray;
}
function createY(type,yValues){
	var yVector=[];
	for(var i=0;i<yValues.length;i++){
		yVector[i]=[];
		yVector[i].push(yValues[i]);
	}
	//type 0 - polynomial, 1 - exponential, 2 - trigonometric, 3 - logarithmic
	//only need to consider exponential
	for(var j=0;j<yValues.length;j++){
		if(type===1){
			yVector[j][0]=Math.log(yVector[j][0]);
		}	
	}
	return yVector;
}
function transposeArray(arr){
    var newArray = [];
    var numCol = arr[0].length;
    for(var i = 0; i < numCol; i++){
        newArray[i]=[];
    }
    for(var j = 0; j < arr.length ; j++){
        for(var k = 0; k < numCol; k++){
            newArray[k].push(arr[j][k]);
        }
    }
    return(newArray);
}
function leastSqr(type,xVal,yVal,order){
    xM=createX(type,xVal,order);
    yV=createY(type,yVal);
    xT=transposeArray(xM);
    xTX=matrixMultiply(xT,xM);
    invXTX=matrix_invert(xTX);
    xTY=matrixMultiply(xT,yV);
    if(type===0){
        return matrixMultiply(invXTX,xTY);
    }
    if(type===1){
        var solut=matrixMultiply(invXTX,xTY);
        solut[0][0]=Math.exp(solut[0][0]);
        return solut;
    }
}






