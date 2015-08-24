angular.module('myApp',['ngMaterial','ngMdIcons','ngAria','ngRoute', 'ngAnimate'])

.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	  .primaryPalette('light-blue')
	   .accentPalette('orange');
	})

.controller('AppCtrl', function($scope, $http) {
    
  this.champTiles = (function() {
    
    var tiles = [];  
      $http.post('/allchamps', {msg:'image'})
            .success(function(response){
          
                $.each(response.data,function(){
                    console.log(this);
                    tiles.push({
                    id:this.id,
                    champName:this.name,
                    link:"/stats/"+this.id,
                    aria:this.name,
                    img:"http://ddragon.leagueoflegends.com/cdn/5.15.1/img/champion/"+this.image.full,

                    });
                    tiles.sort(compare);
                })
         });
      
         
function compare(a,b) {
  if (a.champName < b.champName)
    return -1;
  if (a.champName > b.champName)
    return 1;
  return 0;
}

      
return tiles;
  })();

})

.controller('statsController', function($scope, $http, $mdDialog) {

    function getStats() {
        var url = window.location.href; 
        url = url.split('/');
        $scope.name= url[5];
        console.log(url[5]);
         $http.post('/stats', {msg:url})
         
            .success(function(response){
            console.log(response);
            console.log(response);
              
            $scope.levels = [
            { level: '1', value: '1' },
            { level: '2', value: '2' },
            { level: '18', value: '18' },
            ];
                
                $scope.name = response.name;
             $scope.title = response.title;
                $scope.imgLink = "http://ddragon.leagueoflegends.com/cdn/5.15.1/img/champion/"+response.image.full;
             
                $scope.range = response.stats.attackrange;
                $scope.atkDmg = response.stats.attackdamage;
                $scope.health = response.stats.hp;
                $scope.mana = response.stats.mp;
        
             
                $scope.levelChamp = function(){   
                    
                    $scope.atkDmgLvl = Math.round(response.stats.attackdamageperlevel * $scope.level + $scope.atkDmg);
                    $scope.hpLvl = Math.round(response.stats.hpperlevel * $scope.level + $scope.health);
                    $scope.manaLvl = Math.round(response.stats.mpperlevel * $scope.level + $scope.mana);
                }
                    
            })
        .error(function(){
            $scope.name = "error";
            })
        };
    
         this.itemTiles = (function() {
        var tiles = [];  
      $http.post('/allitems', {msg:'all'})
            .success(function(response){
            	 
                $.each(response.data,function(){
                    
                    tiles.push({
                    id:this.id,
                    name:this.name,
                    link:"/stats/"+this.id,
                    aria:this.name,
                    img:"http://ddragon.leagueoflegends.com/cdn/5.15.1/img/item/"+this.image.full,
                    descLong:this.sanitizedDescription,
                    cost:this.gold.total,
                    stats:this.stats,

                    });
                    tiles.sort(compare);
                    
                })
            });
      

        function compare(a,b) {
          if (a.cost < b.cost)
            return -1;
          if (a.cost > b.cost)
            return 1;
          return 0;
            }
        
        return tiles;
         })();
       
      
  
    getStats();
   

	 
    var currentItems = [];
    $scope.itemStats1 =[];
   $scope.itemArray = currentItems;
    
    $scope.showAdvanced1 = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/items',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
        console.log(answer);
      $scope.status = answer;
      $scope.itemName1 = "Name:"+answer.name;
      $scope.itemImage1 = answer.img;
      
      $.each(answer.stats,function(){
    	  $scope.itemStats1.push({
    		  
    		  stat:JSON.parse(this);
    	  });
    	  console.log(this);
      }),
      
      currentItems.push({
    	  name:$scope.itemName,
 
      });
      console.log(currentItems);
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
        
    };
    
    $scope.showAdvanced2 = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: '/items',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        })
        .then(function(answer) {
            console.log(answer);
          $scope.status = answer;
          $scope.itemName2 = "Name:"+answer.name
          $scope.itemImage2 = answer.img;
          currentItems.push({
        	  name:$scope.itemName,
     
          });
          console.log(currentItems);
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
            
        };
        
        $scope.showAdvanced3 = function(ev) {
            $mdDialog.show({
              controller: DialogController,
              templateUrl: '/items',
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:true
            })
            .then(function(answer) {
                console.log(answer);
              $scope.status = answer;
              $scope.itemName3 = "Name:"+answer.name
              $scope.itemImage3 = answer.img;
              currentItems.push({
            	  name:$scope.itemName,
         
              });
              console.log(currentItems);
            }, function() {
              $scope.status = 'You cancelled the dialog.';
            });
                
            };
   
            $scope.showAdvanced4 = function(ev) {
                $mdDialog.show({
                  controller: DialogController,
                  templateUrl: '/items',
                  parent: angular.element(document.body),
                  targetEvent: ev,
                  clickOutsideToClose:true
                })
                .then(function(answer) {
                    console.log(answer);
                  $scope.status = answer;
                  $scope.itemName4 = "Name:"+answer.name
                  $scope.itemImage4 = answer.img;
                  currentItems.push({
                	  name:$scope.itemName,
             
                  });
                  console.log(currentItems);
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
                    
                };
                $scope.showAdvanced5 = function(ev) {
                    $mdDialog.show({
                      controller: DialogController,
                      templateUrl: '/items',
                      parent: angular.element(document.body),
                      targetEvent: ev,
                      clickOutsideToClose:true
                    })
                    .then(function(answer) {
                        console.log(answer);
                      $scope.status = answer;
                      $scope.itemName5 = "Name:"+answer.name
                      $scope.itemImage5 = answer.img;
                      currentItems.push({
                    	  name:$scope.itemName,
                 
                      });
                      console.log(currentItems);
                    }, function() {
                      $scope.status = 'You cancelled the dialog.';
                    });
                        
                    };
                    $scope.showAdvanced6 = function(ev) {
                        $mdDialog.show({
                          controller: DialogController,
                          templateUrl: '/items',
                          parent: angular.element(document.body),
                          targetEvent: ev,
                          clickOutsideToClose:true
                        })
                        .then(function(answer) {
                            console.log(answer);
                          $scope.status = answer;
                          $scope.itemName6 = "Name:"+answer.name
                          $scope.itemImage6 = answer.img;
                          currentItems.push({
                        	  name:$scope.itemName,
                     
                          });
                          console.log(currentItems);
                        }, function() {
                          $scope.status = 'You cancelled the dialog.';
                        });
                            
                        };
    
            function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

};
     

	
})

.controller('footerController', function($scope){
	$scope.disclosure = "LoL Item Checker isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.";
	
})





