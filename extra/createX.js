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
				xArray[k].push([1,xValues[k]]);
			}else if(type===3){
				xArray[k].push([1,Math.log(xValues[k])]);
			}
		}
	}
	return xArray;
}