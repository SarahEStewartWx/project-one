function optionClicked(){
    let userPicked = document.getElementById("list").value;
    var div = document.getElementById("div");
    if(userPicked == 'one'){
        div.innerHTML = "You clicked Boston";
        if(userPicked =='one'){ let = 60-degrees };
    }else if(userPicked == 'two'){
        div.innerHTML = "You clicked Daytona Beach";
    }else if(userPicked == 'three'){
        div.innerHTML = "You clicked Naples";
    }else if (userPicked == 'four'){
        div.innerHTML = "You clicked Ocala";
    }else if (userPicked == 'five'){
        div.innerHTML = "You clicked Tampa";
    }

    }


onchange="getDropdownValue()"