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
		
		x +=100;
		count +=1;
		
		if (count%4==0)
		{
			y+=100;
			x=0;
		}
	}
}