var app = angular.module('app', []);

app.controller('appCtrl',function($scope){
  $scope.xVals=[];
  $scope.yVals=[];
  $scope.funcType;
  $scope.order;
  $scope.solution;
  $scope.ftype;
  $scope.saveftype;
  $scope.trigOrder=[1];
  $scope.hasCalc=false;
  $scope.isValid=true;

  $scope.addPoint=function(){
  	$scope.xVals.push($scope.x_val);
  	$scope.yVals.push($scope.y_val);
    $scope.plotPoint($scope.x_val,$scope.y_val);
  };

  $scope.removePoint=function(ind){
  	$scope.xVals.splice(ind,1);
  	$scope.yVals.splice(ind,1);
  };

  $scope.calcRegress=function(){
  	$scope.saveftype=$scope.ftype;
    //fix this order v vals thing
    if($scope.saveftype==='0'){
    	if($scope.order>$scope.xVals.length){
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
      }else{
        $scope.solution=leastSqr(Number($scope.ftype),$scope.xVals,$scope.yVals,$scope.order);
        // console.log("trig solut "+$scope.solution);
        //doesn't always work when the order is 2 less than the fucking number of points, i don't know why
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
    var myGraph = new Graph({
      canvasId: 'myCanvas',
      minX: -5,
      minY: -15,
      maxX: 15,
      maxY: 5,
      unitsPerTick: 1
    });

    myGraph.drawPoint(cX,cY);
  }

  $scope.plotGraph=function(){
    var myGraph = new Graph({
      canvasId: 'myCanvas',
      minX: -5,
      minY: -15,
      maxX: 15,
      maxY: 5,
      unitsPerTick: 1
    });

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
          console.log("solution "+eq);
          return eval(eq);
        }
        if($scope.ftype==='1'){
          eq=JSON.stringify(solution[0][0])+"*Math.exp("+JSON.stringify(solution[1][0])+"*x)";
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
          console.log("solution "+eq);
          return eval(eq);
        }
        if($scope.ftype==='3'){
          eq=JSON.stringify(solution[0][0])+"+"+JSON.stringify(solution[1][0])+"*Math.log(x)";
          console.log("solution "+eq);
          return eval(eq);
        }
      }
    }, 'blue', 3);
  };
});
