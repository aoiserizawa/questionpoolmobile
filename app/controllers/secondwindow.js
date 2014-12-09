var args = arguments[0] || {};

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

