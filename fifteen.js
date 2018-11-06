/**
ID: 01-021275
Extra Feature Implemented - Animating the Movement of Puzzlepieces
**/

window.onload = function()
{
	//select puzzlearea
	var puzzlearea = $("#puzzlearea");
	
	//select shufflebutton
	var shufflebutton = $("#shufflebutton");
	//select puzzlearea children
	
	var c = puzzlearea.children();
	var x = 0;
	var y = 0;
	var count = 0;
	
	for (var i = 0; i < c.length; i++)
	{
		//For loop to add puzzlepiece class to each div in the puzzlearea also used to add eventlisteners to each puzzlepiece
		$(c[i]).addClass("puzzlepiece");
		c[i].style.left = x + "px";
		c[i].style.top = y + "px";
		c[i].style.backgroundPosition = -x + "px" + " " + -y + "px";
		
		c[i].addEventListener("click", function() {
			if (isadjacentpoint(this.offsetLeft,this.offsetTop))
			{
				var davoid = whereisthespace();
				var y = davoid[0];
				var x = y.split(",");
				//spy and spx are the starting positions x,y
				var spx = this.offsetLeft;
				var spy = this.offsetTop;
				//selector for moveable piece in order to animate it
				var elem = document.querySelectorAll("div.puzzlepiece.movablepiece");
				//animation
				var id = setInterval(frame, 5);
				function frame() {
					if (spx == x[0] && spy == x[1]) {
						clearInterval(id);
					} else {
						if (spx > x[0])
							spx-=5;
						if (spx < x[0])
							spx+=5;
						if (spy > x[1])
							spy-=5;
						if (spy < x[1])
							spy+=5;
						//increment or decrement the starting positions as needed until they are at the location of the empty space
						elem[0].style.left = spx + "px";
						elem[0].style.top = spy + "px";  
					}
				}
			}
		}, false);
		c[i].addEventListener("mouseover", function() {
			if (isadjacentpoint(this.offsetLeft,this.offsetTop))
			{
				this.classList.add("movablepiece");
			}
		}, false);
		
		c[i].addEventListener("mouseleave", function() {
			if (isadjacentpoint(this.offsetLeft,this.offsetTop))
			{
				this.classList.remove("movablepiece");
			}
		}, false);
		
		x +=100;
		count +=1;
		
		if (count%4==0)
		{
			y+=100;
			x=0;
		}
	}
	
	//add event listener to shufflebutton
	shufflebutton[0].addEventListener("click", function() {
		//random amount of shuffles between 1-500 and calls the shufflemiseh function that amount of times!
		var numshuff = Math.floor(Math.random() * 500);
		while (numshuff > 0)
		{
			shufflemiseh();
			numshuff--;
		}	
	}, false);
	
	
	//heh. shuffle!
	//Shuffle works by getting all the co-ordinates of the adjacent points to the void
	//Then it randomly chooses one, based on the number of adjacent points returned
	//Then it goes through the puzzlepieces to find the div to move and once it finds it, it moves it to the void.
	function shufflemiseh()
	{
		var adj = getadjacentpoints();
		var rand = Math.floor(Math.random() * adj.length);
		var piecetomove = adj[rand];
		var l = piecetomove.split(",");
		l[0] = l[0] + "px";
		l[1] = l[1] + "px";
		var davoid = whereisthespace();
		var y = davoid[0];
		var x = y.split(",");

		var m = document.querySelectorAll("div.puzzlepiece");
		for (var i = 0; i < m.length; i++)
		{
			if (m[i].style.left == l[0] && m[i].style.top == l[1])
			{
				m[i].style.left = x[0] + "px";
				m[i].style.top = x[1] + "px";
			}
		}
	};
	
	
	//function to return the x,y co-ordinates of the empty space
	function whereisthespace()
	{
		//create array with all the possible points
		var allpoints = ["0,0", "0,100", "0,200", "0,300", "100,0", "100,100", "100,200", "100,300", "200,0", "200,100", "200,200", "200,300", "300,0", "300,100", "300,200", "300,300"];
		var index;
		//loop throough the current location of the points and splice them off the array, leaving only the blank space.
		for (var i = 0; i < c.length; i++)
		{
			index = allpoints.indexOf(c[i].offsetLeft + "," + c[i].offsetTop);
			allpoints.splice(index,1);
		}
		return allpoints;
	};
	
	//function to return whether or not a puzzlepiece is moveable
	function isadjacentpoint(xc,yc)
	{
		var davoid = whereisthespace();
		var y = davoid[0];
		var x = y.split(",");
		var ydiff = yc - x[1];
		var xdiff = xc - x[0];
		if ((xdiff == 0 && (ydiff < 200 && ydiff > -200)) || (ydiff == 0 && (xdiff < 200 && xdiff > -200)))
		{
			return true;
		}
		else
		{
			return false;
		}
		
	};
	
	
	//function to get all adjacent moveable points to the empty space (useful for the shuffle function!)
	function getadjacentpoints()
	{
		var davoid = whereisthespace();
		var y = davoid[0];
		var x = y.split(",");
		var xup = Number(x[0]) + 100;
		var xdown = Number(x[0]) - 100;
		var yup = Number(x[1]) + 100;
		var ydown = Number(x[1]) - 100;
		var adjpoints = [];
		if (xup < 301)
		{
			adjpoints.push(xup + "," + x[1]);
		}
		if (xdown > -1)
		{
			adjpoints.push(xdown + "," + x[1]);
		}
		if (yup < 301)
		{
			adjpoints.push(x[0] + "," + yup);
		}
		if (ydown > -1)
		{
			adjpoints.push(x[0] + "," + ydown);
		}
		return adjpoints;
	};
		
	
}