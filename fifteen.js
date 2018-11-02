window.onload = function()
{
	var puzzlearea = $("#puzzlearea");
	var shufflebutton = $("#shufflebutton");
	var c = puzzlearea.children();
	var x = 0;
	var y = 0;
	var count = 0;
	
	for (var i = 0; i < c.length; i++)
	{
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
				this.style.left = x[0] + "px";
				this.style.top = x[1] + "px";
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
	console.log(shufflebutton);
	shufflebutton[0].addEventListener("click", function() {
		var davoid = whereisthespace();
		var y = davoid[0];
		var x = y.split(",");
		//algorithm would be to move x[0] and x[1] randomly up or down by 100 and then move it to the position of the space?
		alert("Boom!");
	}, false);
	
	function movetile(xc,yc)
	{
		if (isadjacentpoint(xc,yc))
		{
			var davoid = whereisthespace();
			var y = davoid[0];
			var x = y.split(",");
			
		}
		alert("Hola! Im Movin Bitches! From " + xc + " " + yc);
	};
	
	
	function whereisthespace()
	{
		var allpoints = ["0,0", "0,100", "0,200", "0,300", "100,0", "100,100", "100,200", "100,300", "200,0", "200,100", "200,200", "200,300", "300,0", "300,100", "300,200", "300,300"];
		var index;
		
		for (var i = 0; i < c.length; i++)
		{
			index = allpoints.indexOf(c[i].offsetLeft + "," + c[i].offsetTop);
			allpoints.splice(index,1);
		}
		return allpoints;
	};
	
	
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
		
	
}