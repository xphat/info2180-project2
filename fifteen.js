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
	
	shufflebutton[0].addEventListener("click", function() {
		var adj = getadjacentpoints();
		var rand = Math.floor(Math.random() * adj.length);
		var piecetomove = adj[rand];
		var moveto = whereisthespace();
		var m = document.querySelector('#puzzlearea > [offsetTop~=100px]');
		console.log(m);
		//var m = c.elementFromPoint(piecetomove[0],piecetomove[1]);
		//m.style.left = moveto[0] + "px";
		//m.style.top = moveto[1] + "px";
		//console.log(piecetomove);
	}, false);
	
	
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