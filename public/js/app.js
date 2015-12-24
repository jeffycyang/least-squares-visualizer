var app=angular.module('app',[]);

app.controller('appCtrl',function($scope){
  $scope.x_val=null;
  $scope.y_val=null;
  $scope.xVals=[];
  $scope.yVals=[];
  $scope.funcType;
  $scope.order=null;
  $scope.solution;
  $scope.ftype;
  $scope.saveftype;
  $scope.trigOrder=[1];
  $scope.hasCalc=false;
  $scope.isValid=true;
  $scope.noYZero=true;
  $scope.noXZero=true;
  $scope.plottedPoints=[];
  $scope.foundYVal;
  $scope.arb_x_val;
  $scope.eq;

  $scope.addPoint=function(){
  	$scope.xVals.push($scope.x_val);
  	$scope.yVals.push($scope.y_val);
    $scope.plotPoint($scope.x_val,$scope.y_val);
  };

  $scope.removePoint=function(ind){
    $scope.noXZero=true;
    $scope.noYZero=true;
    $scope.isValid=true;
    $scope.hasCalc=false;
  	$scope.xVals.splice(ind,1);
  	$scope.yVals.splice(ind,1);
    $scope.removePlotPoint(ind);
  };

  $scope.calcRegress=function(){
  	$scope.saveftype=$scope.ftype;
    //fix this order v vals thing
    if($scope.saveftype==='0'){
    	if($scope.order+1>$scope.xVals.length){
    	  $scope.isValid=false;
    	}else{
    	  $scope.isValid=true;
    	}
    }

    if($scope.saveftype==='1'){
      $scope.noYZero=true;
      for(var i=0;i<$scope.yVals.length;i++){
        if($scope.yVals[i]<=0){
          $scope.noYZero=false;
        }
      }
      if(!$scope.noYZero||$scope.xVals.length<2){
        $scope.isValid=false;
      }else{
        $scope.isValid=true; 
      }
    }

    if($scope.saveftype==='3'){
      $scope.noXZero=true;
      for(var i=0;i<$scope.xVals.length;i++){
        if($scope.xVals[i]<=0){
          $scope.noXZero=false;
        }
      }
      if(!$scope.noXZero||$scope.xVals.length<2){
        $scope.isValid=false;
      }else{
        $scope.isValid=true; 
      }
    }

    //handle order error for trigonometric fit
    // if($scope.saveftype==='2'){
    //   if($scope.order>$scope.xVals.length){
    //     $scope.isValid=false;
    //   }else{
    //     $scope.isValid=true;
    //   }
    // }

    if($scope.xVals.length!==0&&$scope.yVals.length!==0&&$scope.isValid){
      if($scope.saveftype==='1'||$scope.saveftype==='3'){
        $scope.solution=leastSqr(Number($scope.ftype),$scope.xVals,$scope.yVals);
        $scope.plotGraph();
      }else if($scope.saveftype==='2'){
        $scope.solution=leastSqr(Number($scope.ftype),$scope.xVals,$scope.yVals,$scope.order);
        //doesn't always work when the order is 2 less than the number of points, not sure why
        $scope.plotGraph();
      }else{
        $scope.solution=leastSqr(Number($scope.ftype),$scope.xVals,$scope.yVals,$scope.order+1);
        $scope.plotGraph();
      }
    }

    if($scope.saveftype==='2'){
      var order=1;
      for(var i=0;i<$scope.solution.length;i++){
        if(i!==0&&i%2===1){
          $scope.trigOrder[i]=order;
        }else if(i!==0&&i%2===0){
          $scope.trigOrder[i]=order;
          order++;
        }
      }
    }
  };

  $scope.plotPoint=function(cX,cY){
    myGraph.drawPoint(cX,cY);
    $scope.plottedPoints.push([cX,cY]);
  };

  $scope.removePlotPoint=function(ind){
    $scope.plottedPoints.splice(ind,1);
    $scope.solution="";
    myGraph.redrawGraph();
    for(var i=0;i<$scope.plottedPoints.length;i++){
      myGraph.drawPoint($scope.plottedPoints[i][0],$scope.plottedPoints[i][1]); 
    }
  };

  $scope.onLoadExample=function(){
    var xEx=[0.5,1.2,1.565,2.22,2.357,2.87,3.15,3.549,3.77,4.17,3.698,4.314,4.87,5.101,5.309,5.662,5.72,6.12,6.809,6.59,7.0875,7.571,7.954];
    var yEx=[0.333,2.16,2.77,4.447,3.929,5.33,4.671,4.56,5.233,5.83,5.517,5.786,5.13,5.32,4.977,4.597,4.83,4.013,3.577,3.309,2.764,2.106,1.397];
    for(var i=0;i<xEx.length;i++){
      $scope.xVals.push(xEx[i]);
      $scope.yVals.push(yEx[i]);
      $scope.plotPoint(xEx[i],yEx[i]);      
    }
    $scope.ftype='2';
    $scope.order=7;
    //call eval onload somehow
    $scope.hasCalc=true;
    $scope.calcRegress();
  };

  $scope.calcYVal=function(xVal){
    var x=xVal;
    if($scope.hasCalc){
      // var solution=$scope.solution;
      // var currTerm="";
      // var eq="";
      // if($scope.ftype==='0'){
      //   for(var i=0;i<solution.length;i++){
      //     currTerm="";
      //     for(var j=0;j<i;j++){
      //       if(j!==i-1){
      //         currTerm+="x*";
      //       }else{
      //         currTerm+="x";
      //       }
      //     }
      //     if(currTerm){
      //       eq+=JSON.stringify(solution[i][0])+"*"+currTerm;
      //       if(i!==solution.length-1){
      //         eq+="+";
      //       }
      //     }else{
      //       eq+=JSON.stringify(solution[i][0]);
      //       if(i!==solution.length-1){
      //         eq+="+";
      //       }
      //     }
      //   }
      //   console.log("solution "+eq);
      //   $scope.foundYVal=eval(eq);
      // }
      $scope.foundYVal=eval($scope.eq);
    }
  };

  $scope.removeCurves=function(){
    $scope.solution=null;
    $scope.hasCalc=false;
    myGraph.redrawGraph();
    for(var i=0;i<$scope.plottedPoints.length;i++){
      myGraph.drawPoint($scope.plottedPoints[i][0],$scope.plottedPoints[i][1]); 
    }
  };

  $scope.removePoints=function(){
    while($scope.xVals.length>0){
      $scope.removePoint(0);
    }
    $scope.solution=null;
    $scope.hasCalc=false;
    myGraph.redrawGraph();
  };

  $scope.plotGraph=function(){
    //different colors for different function spaces
    var color={
      '0':'blue', //polynomial
      '1':'red', //exponential
      '2':'orange', //trigonometric
      '3':'green' //logarithmic
    }

    myGraph.drawEquation(function(x) {
      if($scope.hasCalc){
        var solution=$scope.solution;
        var currTerm="";
        var eq="";
        if($scope.ftype==='0'){
          for(var i=0;i<solution.length;i++){
            currTerm="";
            for(var j=0;j<i;j++){
              if(j!==i-1){
                currTerm+="x*";
              }else{
                currTerm+="x";
              }
            }
            if(currTerm){
              eq+=JSON.stringify(solution[i][0])+"*"+currTerm;
              if(i!==solution.length-1){
                eq+="+";
              }
            }else{
              eq+=JSON.stringify(solution[i][0]);
              if(i!==solution.length-1){
                eq+="+";
              }
            }
          }
          $scope.eq=eq;
          console.log("solution "+eq);
          return eval(eq);
        }
        if($scope.ftype==='1'){
          eq=JSON.stringify(solution[0][0])+"*Math.exp("+JSON.stringify(solution[1][0])+"*x)";
          $scope.eq=eq;
          console.log("solution "+eq);
          return eval(eq);
        }
        if($scope.ftype==='2'){
          var order=1;
          for(var i=0;i<solution.length;i++){
            currTerm="";
            if(i===0){
              eq+=JSON.stringify(solution[i][0]);
            }else if(i%2===1){
              eq+=JSON.stringify(solution[i][0])+"*Math.sin("+JSON.stringify(order)+"*x)";
            }else if(i%2===0){
              eq+=JSON.stringify(solution[i][0])+"*Math.cos("+JSON.stringify(order)+"*x)";
              order++;
            }
            if(i!==solution.length-1){
              eq+="+";
            }
          }
          $scope.eq=eq;
          console.log("solution "+eq);
          return eval(eq);
        }
        if($scope.ftype==='3'){
          eq=JSON.stringify(solution[0][0])+"+"+JSON.stringify(solution[1][0])+"*Math.log(x)";
          $scope.eq=eq;
          console.log("solution "+eq);
          return eval(eq);
        }
      }
    }, color[$scope.ftype], 3);
  };
});
