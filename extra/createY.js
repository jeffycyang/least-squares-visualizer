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