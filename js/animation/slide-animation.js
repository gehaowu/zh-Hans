app.animation('.my-slide-animation', ['$timeout', function ($timeout) {
    return {
        enter: function(element, done) {
            //run the animation here and call done when the animation is complete
            element.hide().slideDown(1000);
            
            return function(cancelled) {
                //this (optional) function will be called when the animation
                //completes or when the animation is cancelled (the cancelled
                //flag will be set to true if cancelled).
            };
        },
        leave: function(element, done) {
            $timeout(function() {
                element.slideUp(700);
            }, 100);

        }
    };
}]);