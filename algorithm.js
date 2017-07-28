// a^2 + b^2 + c^2 + ... + n^2 = abc...n
// maxSquares = n
// maxIncrement = maximum value each squared variable may be

var output = document.getElementById("output");

/**
*	Seuentially generates multiple sets of values of exponents to test
*/
function startGenerator() {
	var maxIncrement = document.getElementById("maxIncrement").value;
	var maxSquares = document.getElementById("maxSquares").value;
	var matches = new Array();

	for(var numSquares = 1; numSquares<= maxSquares; numSquares++) {

		var squares = new Array(numSquares);
		var activeIndex = numSquares-1;

		// Initialize all values to 0
		for(var i = 0; i<numSquares; i++)
			squares[i] = 0;

		// While the most significant value hasn't reached its maximum value
		while(squares[0] < maxIncrement){

			// If the least significant value has reached its maximum
			if(squares[activeIndex] >= maxIncrement) {

				// Find the most significant value that wont reach its maximum in the incrementing process
				while(squares[activeIndex] >= (maxIncrement-1) && activeIndex != 0) { activeIndex--; }

				// Set all less significant values to the incremented version of this value
				var newValue = ++squares[activeIndex];

				if(numSquares > 1) { 
					activeIndex++;
					for(var i = activeIndex; i<numSquares; i++)
						squares[i] = newValue;
				}

				// Reset the index to point at the least significant value
				activeIndex = numSquares-1;
			}

			var match = checkForMatch(squares);
			if(match != "0")
				matches.push(match);

			// Increment the least significant value
			squares[activeIndex]++;
		}

	}

	printThis(matches);

}

/**
*	Check to see if the squares/exponents passed as a paramater obey the Munchausen number rule
*/
function checkForMatch(squares) {

	var sumOfPowers = 0;

	for(var i = 0; i<squares.length; i++)
		sumOfPowers += Math.pow(squares[i], squares[i]);

	var concat = sumOfPowers.toString();
	var sumOfPowersArr = concat.split('');

	for(var i = 0; i<squares.length; i++) {

		var ind = sumOfPowersArr.indexOf(squares[i].toString());
		if(ind == -1)
			return "0";
		else
			sumOfPowersArr.splice(ind, 1);
	}

	if(sumOfPowersArr.length == 0)
		return concat;
	else 
		return "0";
}

/**
*	Prints the paramter passed through to the HTML document and to the console
*/
function printThis(printee) {
	output.innerHTML = "";
	for (var i = 0; i < printee.length; i++) {
		output.innerHTML += printee[i]+"<br/>";
		console.log(printee[i]);
	}	
}