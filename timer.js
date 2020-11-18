// golbal variables
var wrkArr = [];
    answer = 0;
    calc = false;

function updateFormula(digit) {
    
    // get last element in array
        var lastElem = getLastElement(wrkArr);
        var disp = true;

        // handle keyboard entry
        digit = chkDigit(digit);
      
    switch(digit) {
        //invalid entry (from keyboard)
        case "x":
            return

        case "Escape":
            initialize()
            break;

        case "Backspace":
            calc = false
            wrkArr = backSpace(wrkArr,lastElem)
            // array is empty
            if (wrkArr.length === 0){
                initialize()
                }
            else {
                // if last element an operator set answer to zero otherwise calculate new answer
                if (isOpertor(getLastElement(wrkArr))){
                    answer = 0;
                }
                else{
                    answer = calculate(wrkArr);
                }
            }
            break;

        case "+":
        case "-":
        case "/":
        case "*":
            calc = false
            wrkArr = handleOperator(wrkArr,digit,lastElem)
            break;

        case ".":
           if (calc){
                initialize();
                lastElem = "";
                }
            calc = false
            wrkArr = handleDecimal(wrkArr,lastElem)
            break;

        case "%":
            calc = false
            wrkArr = handlePercentage(wrkArr,lastElem)
            answer = calculate(wrkArr);
            break;

         // positive / negative
        case "pn":
            wrkArr = handlePosNeg(wrkArr,lastElem)
            answer = calculate(wrkArr);
            calc = false
            break;

        case "Enter":
            answer = calculate(wrkArr);
            // remove commas from working array
            var ansStr = answer.toString()
                            .replace(/,/g,"")
            wrkArr =[ansStr];
            disp =false;
            calc = true;
            break;

        default:
            // if calc already happened initialize
            if (calc){
                initialize();
                 }
            calc = false
            wrkArr = handleNumber(wrkArr,digit,lastElem)
            answer = calculate(wrkArr);
            break;
    }

    // update display (not working formula if disp false)
    if (disp){
        updateDisp(wrkArr,answer);
        }
    else{
        updateDisp([],answer);
    }
}

function handleNumber(locWrkArr,locDigit,lastElem){

    // last element is null or an operator - push digit 
    if (!lastElem || isOpertor(lastElem)){
        locWrkArr.push(locDigit)
        }
    else{
        // last element is 0 update with digit else append digit
        if (lastElem === "0"){
            locWrkArr[locWrkArr.length -1] = locDigit;
        }
        else {
            locWrkArr[locWrkArr.length -1] = lastElem + locDigit;
        }
    }
    return locWrkArr
}

function handleDecimal(locWrkArr,lastElem){
    // if empty array or last element is operator add "0."
    if (!lastElem || isOpertor(lastElem)){
        locWrkArr.push("0.")
        }
    else {
    //if no decimal in element append
        if (lastElem.indexOf(".") === -1 ){
            locWrkArr[locWrkArr.length -1] = lastElem + ".";
            }
        }
    return locWrkArr
}

function handleOperator(locWrkArr,locDigit,lastElem){
    // if array not empty and last element is not operator push operator
    if (!isOpertor(lastElem) && lastElem){
        locWrkArr.push(locDigit);
        }
    return locWrkArr
}

// calculates % as decimal
function stripPer(str){
    return str.slice(0,str.length -1) /100
}

function checkPer(str){
    if (str.charAt(str.length -1) === "%"){
        return true
    }
    else{
        return false
    }
}

// calculate answer 
function calculate(wrkArr) {
    
    var locWrkArr = wrkArr.slice();
    var locAnswer = 0;

    // if  first element in array end in percentage turn to decimal
    if ( checkPer(locWrkArr[0])){
        locWrkArr[0] = stripPer(locWrkArr[0]);
    }

    // percentage calcl - check other elements if array longer than 2 (num + operator)
    if (locWrkArr.length > 2){
        for (var i = 2; i < locWrkArr.length; i++){
        
            // check if element is % and peform correct calc
            if ( checkPer(locWrkArr[i])){
                // get previous operator
                let chkOp = locWrkArr[i -1];
                let prevnum = locWrkArr[i-2];
                let num = stripPer(locWrkArr[i]);

                if (chkOp === "+" || chkOp === "-" ){
                    locWrkArr[i] = prevnum * (num);
                }
           
                if (chkOp === "*" || chkOp === "/" ){
                    locWrkArr[i] = num;
                }
            }
        }
    }

    // convert array to string
    var locStr = locWrkArr.join("");
    
    // evaluate answer
    if (locStr !== ""){
        locAnswer = parseFloat(eval(locStr));
    }

    // set answer to exp if v large or small 
    if(locAnswer >= 1000000000000 || locAnswer <= -1000000000000 || (locAnswer <= 0.00001 && locAnswer >= -0.00001 && locAnswer !== 0)){
        locAnswer =  Number.parseFloat(locAnswer).toExponential(6);
    }

    else {
        // max 8 decimal places
        locAnswer = locAnswer.toFixed(8);
        
          // set to max 12 precision (convert answer back to a number datatype)
        locAnswer = Number(locAnswer).toPrecision(12);
         
        // remove rounding anomalies
        locAnswer = (locAnswer *1000) / 1000;

         // format large +ve and negative 
        if (locAnswer > 999 || locAnswer < -999){
            locAnswer = new Intl.NumberFormat().format(locAnswer)
            }
        }
    return locAnswer
}

function backSpace(wrkArr,lastElem){

    var locWrkArr = wrkArr.slice()
   
    // if element has length 1 delete last element else delete last char
    if (lastElem.length === 1){
        locWrkArr.pop()
    }
    else{
        locWrkArr[locWrkArr.length -1] = lastElem.slice(0,lastElem.length -1);
    }
    return locWrkArr
}

// initialize display and formula
function initialize() {
    wrkArr = [];
    answer = 0;
    updateDisp(wrkArr,answer)
}

// update display 
function updateDisp(locWrkArr,ans) {
    
    var dispStr = "";
    var dispArr = locWrkArr.slice();
   
    // loop through array and format element if not operator or < 0 (negative number)
    for (var i = 0; i < dispArr.length;i++){
        var decStr = "";
        if (!isOpertor(dispArr[i])){
            // if element ends in "%" truncate for format then add
            if (dispArr[i].charAt(dispArr[i].length -1) === "%"){
                dispArr[i] = dispArr[i].slice(0,dispArr[i].length -1)
                decStr = "%"
                }

            // if element has a decimal split string and format pre decimal then concatenate   
            let j = dispArr[i].indexOf(".");
            
            if ( j !== -1 ){
                let numStr = dispArr[i].slice(0,j);
                numStr = new Intl.NumberFormat().format(numStr);
                numStr = numStr + dispArr[i].slice(j)
                dispArr[i] = numStr + decStr
            }
            else{
                dispArr[i] = new Intl.NumberFormat().format(dispArr[i]) + decStr;
            }
        }
    }

    dispStr = dispArr.join(" ")
    document.getElementById("idans").value = ans;
    document.getElementById("iddisp").innerHTML = dispStr;
}

function getLastElement(locWrkArr){

    if (locWrkArr.length === 0){
        return null
        }
    else{
        return locWrkArr[locWrkArr.length -1]
        }
}

function handlePosNeg(locwrkArr,lastElem){

//  if last element is operator ignore 
    if (isOpertor(lastElem)){
        return locwrkArr
    }

    if (lastElem.charAt(0) === "-"){
        locwrkArr[locwrkArr.length - 1] = lastElem.slice(1);
        }
    else{
        locwrkArr[locwrkArr.length - 1] = "-" + lastElem;
        }
    return locwrkArr
}

function handlePercentage(locWrkArr,lastElem){

    // if last element not operator and last char not % add "%"
    if (!isOpertor(lastElem)){
        if (lastElem.slice(lastElem.length -1) !== "%"){
            locWrkArr[locWrkArr.length-1] = lastElem + "%"
        }
    }
    return locWrkArr
}

// check if valid digit - maybe invalid keyboard entry
function chkDigit(chkDig){

    const regexDig = /[0-9]|\.|\%|Escape|Backspace|Enter|pn|=/;
   
    // if operator or meets keys in regexDig 
    if (regexDig.test(chkDig) || isOpertor(chkDig)){
        if (chkDig === "="){
            return "Enter";
            }
        else {
            return chkDig
            }
        }
    else
        {
            return "x"
        }
}

function isOpertor(str){

    const regex = new RegExp(/\+|\-|\*|\//);

    if (regex.test(str) && str.length === 1){
        return true
        }
    else{
        return false
        }
}


