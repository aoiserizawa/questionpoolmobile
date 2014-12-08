if (!OS_IOS) {

    var View = function(args) {
        var view = Ti.UI.createView(args);
        view.args = args;
        
        view.openWindow = function(window, options) {
	        var that = this;

	        var options = options || {};
	        options.swipeBack = (typeof options.swipeBack === 'boolean') ? options.swipeBack : that.args.swipeBack;
	        options.displayHomeAsUp = (typeof options.displayHomeAsUp === 'boolean') ? options.displayHomeAsUp : that.args.displayHomeAsUp;

	        if (OS_ANDROID && options.animated !== false) {
	            options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
	            options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
	        }

	        if (options.swipeBack !== false) {
	            // window.addEventListener('swipe', function(e) {
	            //     if (e.direction === 'right') {
	            //         that.closeWindow(window, options);
	            //     }
	            // });
	        }

	        if (OS_ANDROID && options.displayHomeAsUp !== false && !window.navBarHidden) {
	            // window.addEventListener('open', function() {
	            //     var activity = window.getActivity();
	            //     if (activity) {
	            //         var actionBar = activity.actionBar;
	            //         if (actionBar) {
	            //         	actionBar.setLogo('/images/arrow.png');
             //           		actionBar.setTitle('');
             //            	actionBar.setBackgroundImage('/images/actionbarbg.9.png')
	            //             actionBar.displayHomeAsUp = false;
	            //             actionBar.onHomeIconItemSelected = function() {
	            //                 that.closeWindow(window, options);
	            //             };
	            //         }
	            //     }
	            // });
	        }

	        return window.open(options);
   		 };
   		 view.closeWindow = function(window, options) {
	        var options = options || {};

	        if (OS_ANDROID && options.animated !== false) {
	            options.activityEnterAnimation = Ti.Android.R.anim.slide_in_left;
	            options.activityExitAnimation = Ti.Android.R.anim.slide_out_right;
	        }

	        return window.close(options);
	    };
 		//NB: Must be called before .open()
	    view.setRightNavButton = function(window){
        
         window.addEventListener("open", function(e) {
            var activity = window.getActivity();
            activity.onCreateOptionsMenu = function(e) {
                var itemTransfer = e.menu.add({
                        icon : '/images/booktransfer.png',
                        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
                   });
                itemTransfer.addEventListener('click', function(){
                    var win = Alloy.createController('booktransfer').getView();
                   	win.open();
           
                });
                itemTransfer = e.menu.add({
                        icon : '/images/myvouchers.png',
                        showAsAction: Ti.Android.SHOW_AS_ACTION_ALWAYS
                   });
                itemTransfer.addEventListener('click', function(){
					var win = Alloy.createController('myvouchers').getView();
                    Alloy.Globals.navigationHOME.openWindow(win);                
                });

            };
        });
        
        //returns "invalideOptionsMenu() does not exist":
        //activity.invalidateOptionsMenu();
    }
        return view;
    };

   
   
}

exports.createView = function(args) {
    var navWin = OS_IOS ? Ti.UI.iOS.createView(args) : new View(args);
    
    if (args && args.id) {
        Alloy.Globals[args.id] = navWin;
    }

    return navWin;
};
