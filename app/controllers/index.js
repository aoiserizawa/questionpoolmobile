Alloy.Globals.drawer = $.drawer;
//open window
function goToNav(e){
	Ti.API.debug(e.source._page);
    //NavigationWindow id for IOS View id for Android, same silang nav_win so no problem
    //THIS IS YOUR HOME SO YOU CAN STILL ACCESS IT VIA ID but you should put it in a global variable for the child windows.
    Alloy.Globals.navWin = $.nav_win;

    var win =  Alloy.createController(e.source._page).getView()
    //$.nav_win.openWindow(win);
    //to disable animation just use
   	//$.nav_win.openWindow(win,{animated:false});
    
    //FOR CHILD WINDOWS JUST USE
    //Alloy.Globals.navWin instead of $.nav_win
    //$.drawer.toggleLeftWindow();

    $.nav_win.openWindow(win);
   

    return true;
};

//close window // ilalagay mo to sa mga child windows
function closeWindow(){
    //for IOS, automatic na yung back niya
/////////////

    //for Android, since gumamit kayo ng custom Action Bar ganto dapat,
    $.backButtonfromActionbar.addEventListener('singletap',function(){
        Alloy.Globals.navWin.closeWindow($.currentController);
    });
    //yung android hardware back naman
    $.windowID.addEventListener('androidback',function(){
        Alloy.Globals.navWin.closeWindow($.currentController);
    });
}

$.drawer.open();


//NOTE DISREGARD MO KUNG NASA LOOB SILA NG FUNCTION, PWEDENG WALA DUN. PWEDENG  RING NASA FUNCTION.