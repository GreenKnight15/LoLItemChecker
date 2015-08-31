angular.module('myApp', ['ngMaterial', 'ngMdIcons', 'ngAria', 'ngRoute', 'ngAnimate'])

.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue',{
        	'default':'800',
        	'hue-1':'500',
        })
        .accentPalette('orange');
})

.controller('AppCtrl', function($scope, $http) {

    this.champTiles = (function() {

        var tiles = [];
        $http.post('/allchamps', {
                msg: 'image'
            })
            .success(function(response) {

                $.each(response.data, function() {
                    console.log(this);
                    tiles.push({
                        id: this.id,
                        champName: this.name,
                        link: "/stats/" + this.id,
                        aria: this.name,
                        img: "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/champion/" + this.image.full,

                    });
                    tiles.sort(compare);
                })
            });


        function compare(a, b) {
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
        $scope.name = url[5];
        $http.post('/stats', {
            msg: url
        })

        .success(function(response) {

                $scope.levels = [{
                    level: '1',
                    value: '1'
                }, {
                    level: '2',
                    value: '2'
                }, {
                    level: '3',
                    value: '3'
                },
                {
                    level: '4',
                    value: '4'
                },
                {
                    level: '5',
                    value: '5'
                },
                {
                    level: '6',
                    value: '6'
                },
                {
                    level: '7',
                    value: '7'
                },
                {
                    level: '8',
                    value: '8'
                },
                {
                    level: '9',
                    value: '9'
                },
                {
                    level: '10',
                    value: '10'
                },
                {
                    level: '11',
                    value: '11'
                },
                {
                    level: '12',
                    value: '12'
                },
                {
                    level: '13',
                    value: '13'
                },
                {
                    level: '14',
                    value: '14'
                },{
                    level: '15',
                    value: '15'
                },{
                    level: '16',
                    value: '16'
                },{
                    level: '17',
                    value: '17'
                },{
                    level: '18',
                    value: '18'
                },
                ];

                $scope.name = response.name;
                $scope.title = response.title;
                $scope.imgLink = "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/champion/" + response.image.full;

                $scope.range = response.stats.attackrange;
                $scope.atkDmg = response.stats.attackdamage;
                $scope.health = response.stats.hp;
                $scope.mana = response.stats.mp;

                $scope.levelChamp = function() {
                    $scope.atkDmgLvl = Math.round(response.stats.attackdamageperlevel * $scope.level + $scope.atkDmg);
                    $scope.hpLvl = Math.round(response.stats.hpperlevel * $scope.level + $scope.health);
                    $scope.manaLvl = Math.round(response.stats.mpperlevel * $scope.level + $scope.mana);
                }
            })
            .error(function() {
                $scope.name = "error";
            })
    };

    this.itemTiles = (function() {
        var tiles = [];
        $http.post('/allitems', {
                msg: 'all'
            })
            .success(function(response) {

                $.each(response.data, function() {

                    tiles.push({
                        id: this.id,
                        name: this.name,
                        aria: this.name,
                        img: "http://ddragon.leagueoflegends.com/cdn/5.16.1/img/item/" + this.image.full,
                        descLong: this.sanitizedDescription,
                        cost: this.gold.total,
                        stats: this.stats,

                    });
                    tiles.sort(compare);

                })
            });


        function compare(a, b) {
            if (a.cost < b.cost)
                return -1;
            if (a.cost > b.cost)
                return 1;
            return 0;
        }

        return tiles;
    })();

    

    
    getStats();
    $scope.itemSet = [];
    
    
    /*
    $scope.itemStats1 = [];
    $scope.itemStats2 = [];
    $scope.itemStats3 = [];
    $scope.itemStats4 = [];
    $scope.itemStats5 = [];
    $scope.itemStats6 = [];
    
function changeEffectName(key, value) {
        switch (key != "") {
            case key == "FlatPhysicalDamageMod":
                key = "Damage"
                value = value;
                break;
            case key == "FlatArmorMod":
                key = "Armor"
                break;
            case key == "FlatMagicDamageMod":
                key = "Ability Power"
                break;
            case key == "FlatSpellBlockMod":
                key = "Magic Resit"
                break;
            case key == "PercentLifeStealMod":
                key = "Life Steal"
                value = (value * 100)+"%";
                break;
            case key == "FlatHPPoolMod":
                key = "Health"
                break;
            case key == "FlatCritChanceMod":
                key = "Critical Chance"
                value = (value * 100) + "%";
                break;
            case key == "FlatMPPoolMod":
                key = "Mana"
                break;
            case key == "FlatMPRegenMod":
                key = "Mana Regen"
                value = value + " Per Second"
                break;
            case key == "FlatHPPoolMod":
                key = "Health Regen"
                value = value + " Per Second"
                break;
            case key == "PercentAttackSpeedMod":
                key = "Percent Attack Speed"
                value = (value * 100) + "%";
                break;
            case key == "PercentMovementSpeedMod":
                key = "Percent Movment Speed"
                value = (value * 100) + "%";
                break;
            case key == "FlatMovementSpeedMod":
                key = "Movment Speed"
                break
            default:
                key = "";
                break;


        }
        return ({
            "key": key,
            "value": value
        });
    }
*/
    
$scope.showShop = function(ev) {
    $mdDialog.show({
            controller: DialogController,
            templateUrl: '/items',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
        .then(function(answer) {
        	/*
            $scope.status = answer;
            $scope.itemName = "Name:" + answer.name;
            $scope.itemImage = answer.img;
            */
        	if($scope.itemSet.length >= 6 ){
            	$scope.itemSet.splice(5,1,{
                	answer,
                });
            }else{
            	$scope.itemSet.push({
            		answer,
            	}); 
            }
        })
            console.log($scope.itemSet);
        	
        }

$scope.addDmg =[];
$scope.addMagicDmg = [];

$.each($scope.itemSet, function(){
	$.each(this.answer.stats, function(key,value){
switch (key != "") {
case key == "FlatPhysicalDamageMod":
    key = "Damage";
    $scope.addDmg.push({
    	value,
    })
    break;
case key == "FlatArmorMod":
    key = "Armor"
    break;
case key == "FlatMagicDamageMod":
    key = "Ability Power"
    break;
case key == "FlatSpellBlockMod":
    key = "Magic Resit"
    break;
case key == "PercentLifeStealMod":
    key = "Life Steal"
    value = (value * 100)+"%";
    break;
case key == "FlatHPPoolMod":
    key = "Health"
    break;
case key == "FlatCritChanceMod":
    key = "Critical Chance"
    value = (value * 100) + "%";
    break;
case key == "FlatMPPoolMod":
    key = "Mana"
    break;
case key == "FlatMPRegenMod":
    key = "Mana Regen"
    value = value + " Per Second"
    break;
case key == "FlatHPPoolMod":
    key = "Health Regen"
    value = value + " Per Second"
    break;
case key == "PercentAttackSpeedMod":
    key = "Percent Attack Speed"
    value = (value * 100) + "%";
    break;
case key == "PercentMovementSpeedMod":
    key = "Percent Movment Speed"
    value = (value * 100) + "%";
    break;
case key == "FlatMovementSpeedMod":
    key = "Movment Speed"
    break
default:
    key = "";
    break;


}
	})
})

 console.log($scope.addDmg);

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

$scope.deleteItem = function(ev){
	var index=ev.target.getAttribute('id');
	$scope.itemSet.splice(index,1);
	
}

var itemSetJson = [
{
    "title": $scope.itemSetName,
    "type": "custom",
    "map": "any",
    "mode": "any",
    "priority": false,
    "sortrank": 0,
    "blocks": [
        {
            "type": "A block with just boots",
            "recMath": false,
            "minSummonerLevel": -1,
            "maxSummonerLevel": -1,
            "showIfSummonerSpell": "",
            "hideIfSummonerSpell": "",
            "items": [
                {
                    "id": $scope.itemSet[0].id,
                    "count": 1
                },
                {
                    "id": "1001",
                    "count": 1
                },
            ]
        },
          // Additional blocks
    ]
}
  ]



	
$scope.getItemSet = function () {
		var textFile = null,
		  makeTextFile = function (text) {
		    var data = new Blob([text], {type: 'application/json'});

		    // If we are replacing a previously generated file we need to
		    // manually revoke the object URL to avoid memory leaks.
		    if (textFile !== null) {
		      window.URL.revokeObjectURL(textFile);
		    }

		    textFile = window.URL.createObjectURL(data);

		    return textFile;
		  };


		  var create = document.getElementById('create');
		    

		  create.addEventListener('click', function () {
		    var link = document.getElementById('downloadlink');
		    link.href = makeTextFile(itemSetJson);
		    link.style.display = 'block';
		  }, false);
		};
}


})


.controller('runeController', function( $http,$scope,$mdToast, $animate, $interval) {

    $scope.getRunesPages = function(id) {
    	$scope.runePages = [];
    	
 	   $scope.mode = 'query';
	    $scope.determinateValue = 5;
	    $interval(function() {
	    	 var e = document.getElementById(id);
	    	  e.style.display = 'block';
	    	  if($scope.summonerName == ""){
	  	        e.style.display = 'none';
	    	  }
	      $scope.determinateValue += 5;
	      if ($scope.determinateValue > 100) {

	        e.style.display = 'none';
	      }
	    }, 100, 0, true);
	    
	  
    	
    	$scope.sumName=  ($scope.summonerName).toLowerCase();
        $http.post('/getsummonerid', {
                msg: $scope.sumName,
            })
            .success(function(response) {
                $scope.summonerId = response[$scope.sumName].id;
                $http.post('/getsummonerrunes', {
                        msg: response[$scope.sumName].id ,
                    })
                    .success(function(response) {
                        $.each(response[$scope.summonerId].pages, function() {
                            $scope.runePages.push({
                                name: this.name,
                                id:this.id,
                                slots:this.slots,
                            }) 
                        });
                    })
            	})    
    		};

   $scope.currentRunes = [];
    		
   $scope.getRuneStats = function(){ 
	   var counter = 0;
	  
	   $.each($scope.page.slots, function(){
		    
    	$http.post('/getrunestats', {
            msg: this.runeId
        })
        .success(function(response) {
        	
        	if(counter === 0){
                $scope.currentRunes.push({
                    names:response.name,
                    desc:response.description,
                    img:"http://ddragon.leagueoflegends.com/cdn/5.2.1/img/rune/"+response.image.full,
                    
                });
        	} else{
        		counter -= 1
        		$scope.currentRunes.splice(counter,1,{
                    names:response.name,
                    desc:response.description,
                    img:"http://ddragon.leagueoflegends.com/cdn/5.2.1/img/rune/"+response.image.full,
                    
                });
        		
        	}
        	
            
        });
    	counter++
	   })
	   console.log($scope.currentRunes);
    
    	    
    };
    
})
    
.controller('footerController', function($scope) {
    $scope.disclosure = "LoL Item Checker isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.";

})