
var tallObj = document.getElementById("tall");
var weightObj = document.getElementById("weight");

var resultBtn = document.querySelector(".result_Btn");
var restInputbtn = document.querySelector(".rest_Btn");
var clearBMIbtn = document.querySelector(".clear_Btn");

//parse: string → object
var localData = JSON.parse(localStorage.getItem("BMI")) || [];
renderBMI(localData);

resultBtn.addEventListener("click", function(e) {
    
    var tallNum = tallObj.value;
	var weightNum = weightObj.value;
	
    //Calculation BMI
	var bmi = weightNum / (Math.pow(tallNum / 100, 2));
	bmi = bmi.toFixed(2);

    setLocalStorage(tallNum, weightNum, bmi);

	// reset input.
	restInputbtn.style.display = "inline-block";
});

// set LocalStorage
function setLocalStorage(tallNum, weightNum, bmi) {
    
    var bmiObj = { 

    };
    bmiObj.bmi = bmi;
	bmiObj.height = tallNum + "cm";
	bmiObj.weight = weightNum + "kg";
    
    switch (true) {
        
        case (bmi < 18.5):
			bmiObj.word = "過輕";
			bmiObj.colorStyle = "BMI_border1";
			bmiObj.resultStyle = "result_Show1";
			break;
        
        case (bmi >= 18.5 && bmi < 24):
			bmiObj.word = "理想";
			bmiObj.colorStyle = "BMI_border2";
			bmiObj.resultStyle = "result_Show2";
            break;
            
		case (bmi >= 24 && bmi < 27):
			bmiObj.word = "過重";
			bmiObj.colorStyle = "BMI_border3";
			bmiObj.resultStyle = "result_Show3";
            break;
            
		case (bmi >= 27 && bmi < 30):
			bmiObj.word = "輕度肥胖";
			bmiObj.colorStyle = "BMI_border4";
			bmiObj.resultStyle = "result_Show4";
            break;
            
		case (bmi >= 30 && bmi < 35):
			bmiObj.word = "中度肥胖";
			bmiObj.colorStyle = "BMI_border5";
			bmiObj.resultStyle = "result_Show5";
            break;
            
		case (bmi >= 35):
			bmiObj.word = "過度肥胖";
			bmiObj.colorStyle = "BMI_border6";
			bmiObj.resultStyle = "result_Show6";
            break;
            
		default:
			alert("bmi計算有問題，請重新測試。");
			return;
    }
    localData.push(bmiObj);

    //stringify: object → string
    localStorage.setItem("BMI", JSON.stringify(localData));
    
    // show result
    renderBMI(localData);
    
    //show the result icon-image
    document.querySelector(".result").classList.add(bmiObj.resultStyle);
    document.querySelector(".result_Num").textContent = bmiObj.bmi;
    document.querySelector(".result_Word").textContent = bmiObj.word;

    if(bmiObj.word.length > 2){

        document.querySelector(".result_Word").setAttribute("class", "result_Word-4");
    }
    
}

// render BMI result
function renderBMI(localData) {
    
    var renderBmiObj = document.querySelector(".render_BMI");

    var buffer_Str = " ";

    // innerHTML
    for(var i = 0; i < localData.length; i++){
       var innerHTML = 
        "<li>"+
            "<div class=" + localData[i].colorStyle + "></div>"+
            "<div class= 'bar_BMI'>"+
                "<span class= 'BMI_Index1'>" + localData[i].word + "</span>"+
                "<span class= 'BMI_Index2 h6'>BMI</span>"+
                "<span class= 'BMI_Index3'>" + localData[i].bmi + "</span>"+
                "<span class= 'BMI_Index4 h6'>weight</span>"+
                "<span class= 'BMI_Index5'>" + localData[i].weight + "</span>"+
                "<span class= 'BMI_Index6 h6'>height</span>"+
                "<span class= 'BMI_Index7'>" + localData[i].height + "</span>"+
            "</div>"
        "</li>";

        //replace the css style
        if (localData[i].word.length == 4) {
        
            innerHTML = innerHTML.replace("BMI_Index2", "BMI_Index2-1");
        }
        buffer_Str += innerHTML;
    }    
    renderBmiObj.innerHTML = buffer_Str;
}

// reload html
restInputbtn.addEventListener("click", function(e){
    
    location.reload();
}, false);

// clear localStorage-data and reload html
clearBMIbtn.addEventListener("click", function(e){
    
    localStorage.clear();
	location.reload();
}, false);

