var app = angular.module('app', []);

app.controller('appCtrl',function($scope){
  $scope.xVals=[];
  $scope.yVals=[];
  $scope.funcType;
  $scope.order;
  $scope.solution;

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
  	$scope.funcType=$scope.ftype;
  	// console.log("fuck you");
  	// console.log($scope.funcType);
  	if($scope.order>$scope.xVals.length){
  	  $scope.isValid=false;
  	}else{
  	  $scope.isValid=true;
  	}
  	if($scope.xVals.length!==0&&$scope.yVals.length!==0&&$scope.isValid){
  	  $scope.solution=leastSqr(0,$scope.xVals,$scope.yVals,$scope.order);
  	}
  };

});