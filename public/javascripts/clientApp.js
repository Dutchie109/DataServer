    // create the module and name it scotchApp
    var dsApp = angular.module('dsApp', ['ngRoute']);

    // configure our routes
    dsApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })
			
			// route for the IPs page
            .when('/ips', {
                templateUrl : 'pages/ips.html',
                controller  : 'ipsController'
            })
			
			
			// route for the IPs page
            .when('/ips/:id', {
                templateUrl : 'pages/ip.html',
                controller  : 'ipController'
            });
    });	
	
    // create the controller and inject Angular's $scope
    dsApp.controller('mainController', function($scope) {

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
    });
	
	dsApp.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    dsApp.controller('contactController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });
	
    dsApp.controller('ipsController', function($scope) {
        $scope.message = 'IPs page';
		
		$(function () {
            $('[data-toggle="table"]').bootstrapTable();
        });

	
    });	
	
    dsApp.controller('ipController', ['$scope','$routeParams',function($scope,$routeParams) {
        $scope.message = 'Single IP page: ' + $routeParams.id;
		
		
		var palette = new Rickshaw.Color.Palette();
		
	
		var jqxhr = $.getJSON( "/ips/" + $routeParams.id, function(data) {
			console.log( "success" + data );

			var xValues = [];
			
			for(i in data.HistoricalProgress){
				
				var typeEntry = data.HistoricalProgress[i];

				for(j in typeEntry.series){
					if(typeEntry.series[j].name=="TotalCount"){
						for(k in typeEntry.series[j].labels){
							var xValue = Date.parse(typeEntry.series[j].labels[k])/1000;
							if(xValues.indexOf(xValue)==-1){
								xValues[xValues.length]=xValue;
							}
						}
					}
				}
			}
			xValues.sort();
			
			var series = [];
			var count = 0;
			for(i in data.HistoricalProgress){
				
				var typeEntry = data.HistoricalProgress[i];
				
				var graphData = [];
				series[series.length] = {name :typeEntry.name, color: palette.color(), data : graphData};
				
				console.log( "Entry " + typeEntry.name );
				for(j in typeEntry.series){
					if(typeEntry.series[j].name=="TotalCount"){
						
						
						
						for(l in xValues){
						
							xValue = xValues[l];
							var yValue = 0;
							
							if(graphData.length>0){
								yValue = graphData[graphData.length-1].y;
							}
						
							for(k in typeEntry.series[j].labels){
								if(xValue==Date.parse(typeEntry.series[j].labels[k])/1000){
									yValue = Number(typeEntry.series[j].values[k]);
									break;
								}
							}
							
							graphData[graphData.length] = {x: xValue , y : yValue };
						}
					}
				}
				if(count++ >1){
					//break;
				}
			}


			var graph = new Rickshaw.Graph( {
				element: document.querySelector("#chart"),
				width: 750,
				height: 300,
				series: series
			} );

var axes = new Rickshaw.Graph.Axis.Time( { graph: graph } );

			var legend = new Rickshaw.Graph.Legend( {
					element: document.querySelector('#legend'),
					graph: graph
			} );
			
var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
	graph: graph,
	legend: legend
} );

/*var order = new Rickshaw.Graph.Behavior.Series.Order( {
	graph: graph,
	legend: legend
} );*/

var highlighter = new Rickshaw.Graph.Behavior.Series.Highlight( {
	graph: graph,
	legend: legend
} );			
			
//graph.setRenderer('line');
var y_ticks = new Rickshaw.Graph.Axis.Y( {
    graph: graph,
    orientation: 'left',
    tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
    element: document.getElementById('y_axis'),
} );

var hoverDetail = new Rickshaw.Graph.HoverDetail( {
	graph: graph,
	formatter: function(series, x, y) {
		var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
		var swatch = '<span class="detail_swatch" style="background-color: ' + series.color + '"></span>';
		var content = swatch + series.name + ": " + parseInt(y) + '<br>' + date;
		return content;
	}
} );
			
			
          
			
			graph.render();			  
		  
		})
		  .fail(function() {
			console.log( "Failed to read from the DB" );
		  });	

	  
		
    }]);	
	