var lastEntry = "";
var equation = "";
var decimalInLastEntry = false;


window.onload = GeneralSetup;
function GeneralSetup()
{
	document.onkeyup = function(event){ProcessInput(event.key)};
	$(".Regular").focus(function(){this.blur()} );
	//Prevent focus so enter key does not toggle buttons
	
	var buttons = document.getElementsByTagName("button");
	for(var i = 0; i < buttons.length; i++)
	{
		// "this" refers to the specific button making the call
		buttons[i].onclick = function(){ProcessInput(this.value)};
	}
}


function ProcessInput(input)
{
	console.log("Input: " + input + " :received");
	
	//Was the last entered input a number
	if(isNaN(input) == false)
	{
		if(IsOperator(lastEntry) )
		{
			equation += lastEntry;
			lastEntry = input;
		}
		else
		{
			lastEntry += input;
		}
	}
	else if(input === ".")
	{
		if(IsOperator(lastEntry) )
		{
			equation += lastEntry;
			lastEntry = "0.";
		}
		else if(decimalInLastEntry == false)
		{
			decimalInLastEntry = true;
			if(lastEntry === "")
			{
				lastEntry += "0.";
			}
			else
			{
				lastEntry += input;
			}
		}
	}
	else if(IsOperator(input) )
	{
		if(IsOperator(lastEntry) == false && lastEntry !== "" && lastEntry !== "0.")
		{
			equation += lastEntry;
			lastEntry = input;
			decimalInLastEntry = false;
		}
	}
	else if(input === "=" || input === "Enter")
	{
		EvaluateEquation();
	}
	else if(input === "Clear" || input === "Escape" || input === "Backspace")
	{
		lastEntry = "";
		equation = "";
		decimalInLastEntry = false;
	}
	
	UpdateUI();
}


function EvaluateEquation()
{
	if(isNaN(equation) && IsOperator(lastEntry) == false && lastEntry !== "0.")
	{
		lastEntry = eval(equation + lastEntry);
		equation = "";
		console.log("Equation evaluated to: " + lastEntry);
	}
}

function UpdateUI()
{
	var entryUI = document.getElementById("Entry");
	var equationUI = document.getElementById("Equation");
	
	entryUI.textContent = lastEntry;
	equationUI.textContent = equation;
}

function IsOperator(value)
{
	if(value == "+" || value == "-" || value == "*" || value == "/")
	{
		return true;
	}
	return false;
}

