function leastSqr(type,xVal,yVal,order){
    xM=createX(type,xVal,order);
    yV=createY(type,yVal);
    xT=transposeArray(xM);
    xTX=matrixMultiply(xT,xM);
    invXTX=matrix_invert(xTX);
    xTY=matrixMultiply(xT,yV);
    return matrixMultiply(invXTX,xTY);
}