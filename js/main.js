/* main js */
/* write by chacha */

(function () {
   var support = { animations : Modernizr.cssanimations },
       container = document.getElementById( 'ip-container' ),
       header = container.querySelector( 'header.ip-header' ),
       loader = new PathLoader(document.getElementById( 'ip-loader-circle' )),
       animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
       animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ]
    
    function init() {
        var onEndInitalAnimation = function() {
            if( support.animations ){
                this.removeEventListener( animEndEventName, onEndInitalAnimation);
            }
            
            startLoading();
        };
        
        //禁用scroll
        window.addEventListener( 'scroll', noscroll );
        
        //初始化动画
        classie.add( container, 'loading' );
        
        if( support.animations ){
            container.addEventListener( animEndEventName, onEndInitalAnimation );
        }else {
            onEndInitalAnimation();
        }
        
    };
    
    //没有scroll
    function noscroll (){
        window.scrollTo( 0, 0 );
    };
    
    function startLoading() {
        //模拟正在加载内容    
        var simulationFn = function( instance ){
            var progress = 0,
                interval = setInterval( function(){
                    progress = Math.min( progress + Math.random() * 0.1, 1 );
                    instance.setProgress( progress );
                    console.log(progress);
                    if( progress === 1 ) {
                        classie.remove( container, 'loading' );
                        classie.add( container, 'loaded' );
                        clearInterval( interval );
                        
                        var onEndHeaderAnimation = function( ev ){
                            if( support.animations ){
                                if( ev.target !== header ) return;
                                this.removeEventListener( animEndEventName, onEndHeaderAnimation );
                            }
                            
                            classie.add( document.body, 'switch-layout' );
                            window.removeEventListener( 'scroll', noscroll );
                        };
                        if( support.animations ){
                            header.addEventListener( animEndEventName, onEndHeaderAnimation );
                        }else {
                            onEndHeaderAnimation();
                        }
                    }
               }, 250 );
            
        };
        
        loader.setProgressFn( simulationFn );
    };
    
    init();
})();