var mySliderApp=angular.module('mySliderApp',['ngAnimate']);
mySliderApp.directive('mySlider',function($timeout){
    return {
        restrict: 'AE',
        replace: true,
        scope: {
            images: '='
        },
        link: function (scope, elem, attrs) {
            scope.interval=1000;
            scope.counter=0;

            scope.right=function(){
                scope.counter++;
                var widthPhoto=$(".slider-list").find('img').outerWidth();
                scope.images.push(scope.images.shift());
                $(".slider-list").animate({"left":'-'+widthPhoto+'px'}, function (){
                    $(".slider-list").css({'left':'0px'});
                });
                scope.setAnimDuration();
            };

            scope.setAnimDuration=function(){
                $('.firstEl').css({"-webkit-animation-duration":scope.interval+"ms"});
                $('.firstLeftEl').css({"-webkit-animation-duration":scope.interval+"ms"});
                $('.centerElStart').css({"-webkit-animation-duration":scope.interval+"ms"});
                $('.firstRightStart').css({"-webkit-animation-duration":scope.interval+"ms"});
                $('.prevLastEl').css({"-webkit-animation-duration":scope.interval+"ms"});
                $('.lastEl').css({"-webkit-animation-duration":scope.interval+"ms"});
                $('.imagecontainer').find('img').css({"-webkit-animation-duration":scope.interval+"ms"});
            }

            scope.left=function(){
                var widthPhoto=$(".slider-list").find('img').outerWidth();
                scope.images.unshift(scope.images.pop());
                $(".slider-list").animate({"left":'-'+widthPhoto+'px'}, function (){
                    $(".slider-list").css({'left':'0px'});
                });
            };

            var timer;
             var sliderFunc=function(){
                 timer=$timeout(function(){
                     scope.right();
                     timer=$timeout(sliderFunc,scope.interval/2);
                 },scope.interval);
             };

             sliderFunc();
             scope.$on('$destroy',function() {
                $timeout.cancel(timer);
             });
        },
        templateUrl: 'templates/templateurl.html'
    };
});

mySliderApp.controller('MySliderController',function($scope){
    $scope.images = [
        {src: 'img/img1.jpg',alt: 'Pic 1'},
        {src: 'img/img2.jpg',alt: 'Pic 2'},
        {src: 'img/img3.jpg',alt: 'Pic 3'},
        {src: 'img/img4.jpg',alt: 'Pic 4'},
        {src: 'img/img5.jpg',alt: 'Pic 5'},
        {src: 'img/img6.jpg',alt: 'Pic 6'}
    ];
});