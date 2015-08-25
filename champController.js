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
                    img:"http://ddragon.leagueoflegends.com/cdn/5.16.1/img/champion/"+this.image.full,

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
         $http.post('/stats', {msg:url})
         
            .success(function(response){
            
            $scope.levels = [
            { level: '1', value: '1' },
            { level: '2', value: '2' },
            { level: '18', value: '18' },
            ];
                
             $scope.name = response.name;
             $scope.title = response.title;
             $scope.imgLink = "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/champion/"+response.image.full;
             
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
                    img:"http://ddragon.leagueoflegends.com/cdn/5.16.1/img/item/"+this.image.full,
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
   
    $scope.itemStats1 =[];
    $scope.itemStats2 =[];


	  var addedDmg = [0,0,0,0,0,0,0];
	  var dmg = 0;
	  $scope.totalDmgAdded = dmg;
	 
	  for(i=0; i<= addedDmg.length; i++){
		  dmg += Number(addedDmg[i]);
		  console.log("in loop"+dmg );
	  }
	 
	  console.log("All Damaged added Arry=" + $scope.totalDmgAdded);
	  
   
   function changeEffectName(key,value){
	   switch(key != "") {
	    case key=="FlatPhysicalDamageMod":
	        key = "Damage"
	        break;
	    case key== "FlatArmorMod":
	        key = "Armor"
	        break;
	    case key== "FlatMagicDamageMod":
	        key = "Ability Power"
	        break;
	    case key== "FlatSpellBlockMod":
	        key = "+Magic Resit"
	        break;
	    case key== "PercentLifeStealMod":
	        key = "Life Steal"
	        value = (value*100)+"%";
	        break;
	    case key== "FlatHPPoolMod":
	        key = "+Health"
	        break;
	    case key== "FlatCritChanceMod":
	        key = "Critical Chance"
	        value = (value*100)+"%";
	        break;
	    case key== "FlatMPPoolMod":
	        key = "+Mana"
	        break;
	    case key== "FlatMPRegenMod":
	        key = "Mana Regen"
	        value = value+" Per Second"
	        break;
	    case key== "FlatHPPoolMod":
	        key = "Health Regen"
	        value = value+" Per Second"
	        break;
	    case key== "PercentAttackSpeedMod":
	        key = "Percent Attack Speed"
	        value = (value*100)+"%";
	        break;
	    case key== "PercentMovementSpeedMod":
	        key = "Percent Movment Speed"
	        value = (value*100)+"%";
	        break;
	    case key== "FlatMovementSpeedMod":
	        key = "+Movment Speed"
	        break
	    default:
	    	key = key;
	    	break;
	    	
	        
	}
	  return({"key":key,"value":value});
   }
    
    $scope.showAdvanced1 = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/items',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = answer;
      $scope.itemName1 = "Name:"+answer.name;
      $scope.itemImage1 = answer.img;
      var counter = 0;
      $.each(answer.stats,function(key,value){
    	  counter = counter + 1;
    	  var names = changeEffectName(key,value);
    	  
    	  if(Object.keys(answer.stats).length === 0){
    		  $scope.itemStats1 =[];
    	  }
    	//item with 1 attributes 
    	  if(Object.keys(answer.stats).length === 1){
    		  if($scope.itemStats1.length === 0 ){
    			  $scope.itemStats1.push({
        			  "statName":names.key,
        			  "statValue":names.value,
        		  });
    			  console.log("0-1");
    		  }
    		  else if($scope.itemStats1.length === 1 ){
    			  $scope.itemStats1.splice(0,1,{
        			  "statName":names.key,
        			  "statValue":names.value,
        		  });
    			  console.log("1-1");
    		  }
    		  else if($scope.itemStats1.length > 1){
    			 $scope.itemStats1.splice(0,Number.MAX_VALUE,{
       			  "statName":names.key,
       			  "statValue":names.value,
       		  });
    			 console.log("2-1");
    			 
    		  }
    	  }
    	  
    	  
    	  //item with 2 attributes
    	  if(Object.keys(answer.stats).length === 2){
    		  if($scope.itemStats1.length === 0 ){
    			  $scope.itemStats1.push({
        			  "statName":names.key,
        			  "statValue":names.value,
        		  });
    			  console.log("0-2");
    		  }
    		  else if($scope.itemStats1.length === 1){
    			  if(counter === 1){
    				  $scope.itemStats1.splice(0,1,{
    					  "statName":names.key,
    					  "statValue":names.value,
    				  });
    				  console.log("1-2-1");
    			  }
    			  if(counter === 2){
    				  $scope.itemStats1.push({
    					  "statName":names.key,
    					  "statValue":names.value,
    				  });
    			  }
    			  console.log("1-2-2");
    		  }
    		  else if($scope.itemStats1.length === 2){
    			  if(counter === 1){
    				  $scope.itemStats1.splice(0,1,{
    					  "statName":names.key,
    					  "statValue":names.value,
    				  });
    				  console.log("2-2-1");
    			  }
    			  if(counter === 2){
    				  $scope.itemStats1.splice(1,1,{
    					  "statName":names.key,
    					  "statValue":names.value,
    				  });
    				  console.log("2-2-1");
    			  }
    		  }  
    		  else if($scope.itemStats1.length === 3){
    			  if(counter === 1){
    				  $scope.itemStats1.splice(0,2,{
    					  "statName":names.key,
    					  "statValue":names.value,
    				  });
    			  }
    			  console.log("2-3");
    		  }
    		  else if($scope.itemStats1.length === 4){
    			  if(counter === 1){
    				  $scope.itemStats1.splice(0,3,{
    					  "statName":names.key,
    					  "statValue":names.value,
    				  });
    			  }
    			  console.log("2-4");    	  
    		}
    	  }
    	  //3 item attributes
    	  if(Object.keys(answer.stats).length === 3){ 
    		  if($scope.itemStats1.length === 0 ){ 
    			  $scope.itemStats1.push({
        			  "statName":names.key,
        			  "statValue":names.value,
        		  });
    			  console.log("0-3");
    		  }
    		  else if($scope.itemStats1.length === 1){
    			  if(counter === 1){
    			  $scope.itemStats1.splice(0,1,{
        			  "statName":names.key,
        			  "statValue":names.value,
        		  });
    			  console.log("1-3");
    			  }
    			  if(counter === 2){
        			  $scope.itemStats1.push({
            			  "statName":names.key,
            			  "statValue":names.value,
            		  });
        			  console.log("1-3-2");
        			 }
    		  }
    		  else if($scope.itemStats1.length === 2){
    			  if(counter === 2){
        			  $scope.itemStats1.splice(0,1,{
            			  "statName":names.key,
            			  "statValue":names.value,
            		  });
        			  console.log("2-3");
        			 }
    			  if(counter === 3){
        			  $scope.itemStats1.push({
            			  "statName":names.key,
            			  "statValue":names.value,
            		  });
        			  console.log("1-3");
        			 }
    		  }   
    		  else if($scope.itemStats1.length === 3){
    			  if(counter === 3){
        			  $scope.itemStats1.splice(0,2,{
            			  "statName":names.key,
            			  "statValue":names.value,
            		  });
        			  console.log("3-3");
        			 }
    		  } 
    		  else if($scope.itemStats1.length === 4){
    			  $scope.itemStats1 =[];
    			  $scope.itemStats1.push({
        			  "statName":names.key,
        			  "statValue":names.value,
        		  });
    			  console.log("3-4");
    		  }
    	  }
    	 
    	  
    	  
    	  if(names.key === "Damage"){
    			 var addDmg = 0;
    			 addDmg  = Number(names.value);
    			 console.log("names.value="addedDmg);
    			 addedDmg.splice(0,1,{
    				 addDmg
    			 });
    			 
    			 console.log("addDmg="+ addDmg);
    			 console.log( addDmg);
    			 console.log(addedDmg);
    		}
    	  
    	  
      });
      
      
      
      
      
      
      
      
      
      
      
      $scope.showAdvanced2 = function(ev) {
    	    $mdDialog.show({
    	      controller: DialogController,
    	      templateUrl: '/items',
    	      parent: angular.element(document.body),
    	      targetEvent: ev,
    	      clickOutsideToClose:true
    	    })
    	    .then(function(answer) {
    	      $scope.status = answer;
    	      $scope.itemName2 = "Name:"+answer.name;
    	      $scope.itemImage2 = answer.img;
    	      var counter = 0;
    	      $.each(answer.stats,function(key,value){
    	    	  counter = counter + 1;
    	    	  var names = changeEffectName(key,value);
    	    	  
    	    	  if(Object.keys(answer.stats).length === 0){
    	    		  $scope.itemStats2 =[];
    	    	  }
    	    	//item with 1 attributes 
    	    	  if(Object.keys(answer.stats).length === 1){
    	    		  if($scope.itemStats2.length === 0 ){
    	    			  $scope.itemStats2.push({
    	        			  "statName":names.key,
    	        			  "statValue":names.value,
    	        		  });
    	    			  console.log("0-1");
    	    		  }
    	    		  else if($scope.itemStats2.length === 1 ){
    	    			  $scope.itemStats2.splice(0,1,{
    	        			  "statName":names.key,
    	        			  "statValue":names.value,
    	        		  });
    	    			  console.log("1-1");
    	    		  }
    	    		  else if($scope.itemStats2.length > 1){
    	    			 $scope.itemStats2.splice(0,Number.MAX_VALUE,{
    	       			  "statName":names.key,
    	       			  "statValue":names.value,
    	       		  });
    	    			 console.log("2-1");
    	    			 
    	    		  }
    	    	  }
    	    	  
    	    	  
    	    	  //item with 2 attributes
    	    	  if(Object.keys(answer.stats).length === 2){
    	    		  if($scope.itemStats2.length === 0 ){
    	    			  $scope.itemStats2.push({
    	        			  "statName":names.key,
    	        			  "statValue":names.value,
    	        		  });
    	    			  console.log("0-2");
    	    		  }
    	    		  else if($scope.itemStats2.length === 1){
    	    			  if(counter === 1){
    	    				  $scope.itemStats2.splice(0,1,{
    	    					  "statName":names.key,
    	    					  "statValue":names.value,
    	    				  });
    	    				  console.log("1-2-1");
    	    			  }
    	    			  if(counter === 2){
    	    				  $scope.itemStats2.push({
    	    					  "statName":names.key,
    	    					  "statValue":names.value,
    	    				  });
    	    			  }
    	    			  console.log("1-2-2");
    	    		  }
    	    		  else if($scope.itemStats2.length === 2){
    	    			  if(counter === 1){
    	    				  $scope.itemStats2.splice(0,1,{
    	    					  "statName":names.key,
    	    					  "statValue":names.value,
    	    				  });
    	    				  console.log("2-2-1");
    	    			  }
    	    			  if(counter === 2){
    	    				  $scope.itemStats2.splice(1,1,{
    	    					  "statName":names.key,
    	    					  "statValue":names.value,
    	    				  });
    	    				  console.log("2-2-1");
    	    			  }
    	    		  }  
    	    		  else if($scope.itemStats2.length === 3){
    	    			  if(counter === 1){
    	    				  $scope.itemStats2.splice(0,2,{
    	    					  "statName":names.key,
    	    					  "statValue":names.value,
    	    				  });
    	    			  }
    	    			  console.log("2-3");
    	    		  }
    	    		  else if($scope.itemStats2.length === 4){
    	    			  if(counter === 1){
    	    				  $scope.itemStats1.splice(0,3,{
    	    					  "statName":names.key,
    	    					  "statValue":names.value,
    	    				  });
    	    			  }
    	    			  console.log("2-4");    	  
    	    		}
    	    	  }
    	    	  //3 item attributes
    	    	  if(Object.keys(answer.stats).length === 3){ 
    	    		  if($scope.itemStats2.length === 0 ){ 
    	    			  $scope.itemStats2.push({
    	        			  "statName":names.key,
    	        			  "statValue":names.value,
    	        		  });
    	    			  console.log("0-3");
    	    		  }
    	    		  else if($scope.itemStats2.length === 1){
    	    			  if(counter === 1){
    	    			  $scope.itemStats2.splice(0,1,{
    	        			  "statName":names.key,
    	        			  "statValue":names.value,
    	        		  });
    	    			  console.log("1-3");
    	    			  }
    	    			  if(counter === 2){
    	        			  $scope.itemStats2.push({
    	            			  "statName":names.key,
    	            			  "statValue":names.value,
    	            		  });
    	        			  console.log("1-3-2");
    	        			 }
    	    		  }
    	    		  else if($scope.itemStats2.length === 2){
    	    			  if(counter === 2){
    	        			  $scope.itemStats2.splice(0,1,{
    	            			  "statName":names.key,
    	            			  "statValue":names.value,
    	            		  });
    	        			  console.log("2-3");
    	        			 }
    	    			  if(counter === 3){
    	        			  $scope.itemStats2.push({
    	            			  "statName":names.key,
    	            			  "statValue":names.value,
    	            		  });
    	        			  console.log("1-3");
    	        			 }
    	    		  }   
    	    		  else if($scope.itemStats2.length === 3){
    	    			  if(counter === 3){
    	        			  $scope.itemStats2.splice(0,2,{
    	            			  "statName":names.key,
    	            			  "statValue":names.value,
    	            		  });
    	        			  console.log("3-3");
    	        			 }
    	    		  } 
    	    		  else if($scope.itemStats2.length === 4){
    	    			  $scope.itemStats2 =[];
    	    			  $scope.itemStats2.push({
    	        			  "statName":names.key,
    	        			  "statValue":names.value,
    	        		  });
    	    			  console.log("3-4");
    	    		  }
    	    	  }
    	    	 
    	    	  
    	    	  
    	    	  if(names.key === "Damage"){
    	    			 var addDmg = 0;
    	    			 addDmg  += Number(names.value);
    	    			 addedDmg.splice(1,1,{
    	    				 addDmg
    	    			 });
    	    			 
    	    			 console.log("addDmg="+ addDmg);
    	    			 console.log( addDmg);
    	    			 console.log(addedDmg);
    	    		}
    	    	  
    	    	  
    	      });


    	    }, function() {
    	      $scope.status = 'You cancelled the dialog.';
    	    });
    	    
    	 };
    	    
      
      
      


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





