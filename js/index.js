
var lastEntry = "";
var equation = "";
var decimalInLastEntry = false;
var maxEntrySize = 8;


window.onload = GeneralSetup;
function GeneralSetup()
{
	document.onkeyup = function(event){ProcessInput(event.key)};
	$(".Regular").focus(function(){this.blur()} );
	
	var buttons = document.getElementsByTagName("button");
	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].onclick = function(){ProcessInput(this.value)};
	}
}

/*=================================================================================*/

function ProcessInput(input)
{	
	if(isNaN(input) == false)
	{
		if(lastEntry.length >= maxEntrySize){return;}
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
		if(lastEntry.length >= maxEntrySize){return;}
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
		lastEntry = Round(eval(equation + lastEntry), 4) + "";
		equation = "";
		if(lastEntry.length >= maxEntrySize)
		{
			console.log("LOVER");
			lastEntry = Number(lastEntry).toExponential(4);
			return;
		}
		console.log("Equation evaluated to: " + lastEntry);
	}
}

/*=================================================================================*/

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

function Round(value, decimals) 
{
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

