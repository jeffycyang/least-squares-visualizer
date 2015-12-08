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
  };

  $scope.removePoint=function(ind){
  	$scope.xVals.splice(ind,1);
  	$scope.yVals.splice(ind,1);
  };

  $scope.calcRegress=function(){
  	$scope.saveftype=$scope.ftype;
    //fix this order v vals thing
  	if($scope.order>$scope.xVals.length){
  	  $scope.isValid=false;
  	}else{
  	  $scope.isValid=true;
  	}
    if($scope.xVals.length!==0&&$scope.yVals.length!==0&&$scope.isValid){
      if($scope.saveftype==='1'||$scope.saveftype==='3'){
        $scope.solution=leastSqr(Number($scope.ftype),$scope.xVals,$scope.yVals);
      }else{
        $scope.solution=leastSqr(Number($scope.ftype),$scope.xVals,$scope.yVals,$scope.order);
        console.log("trig solut "+$scope.solution);
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
});
