window.onload = function()
{
	var puzzlearea = $("#puzzlearea");
	var c = puzzlearea.children();
	var x = 0;
	var y = 0;
	var count = 0;
	
	for (var i = 0; i < c.length; i++)
	{
		$(c[i]).addClass("puzzlepiece");
		c[i].style.left = x + "px";
		c[i].style.top = y + "px";
		c[i].style.backgroundAttachment = "fixed";
		c[i].addEventListener("click", function() {
			movetile(this.offsetLeft,this.offsetTop);
		}, false);
		//c[i].addEventListener("mouseover", hovermiseh, false);
		
		x +=100;
		count +=1;
		
		if (count%4==0)
		{
			y+=100;
			x=0;
		}
	}
	
	function movetile(xc,yc)
	{
		alert("Hola! Im Movin Bitches! From " + xc + " " + yc);
	};
	
	function hovermiseh()
	{
		
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
		var x = davoid[0];
		var ol = x.split(",");
		
		if (ol[0] = 300)
		{
			console.log(ol[0] + " " + ol[1]);
		}
		
	};
	
	adjacentpoints();
	
}