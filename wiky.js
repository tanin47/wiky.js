/**
 * Wiky - Javascript library to convert Wikitext to HTML
 * You can do whatever with it. Please give me some credits :P
 * - Tanin Na Nakorn 
 */

var wiky = {}


wiky.process = function(wikitext) {
	var lines = wikitext.split(/\r?\n/);
	
	var html = "";
	
	for (i=0;i<lines.length;i++)
	{
		line = lines[i];
		if (line.match(/^===/)!=null && line.match(/===$/)!=null)
		{
			html += "<h2>"+line.substring(3,line.length-3)+"</h2>";
		}
		else if (line.match(/^==/)!=null && line.match(/==$/)!=null)
		{
			html += "<h3>"+line.substring(2,line.length-2)+"</h3>";
		}
		else if (line.match(/^:+ /)!=null)
		{
			// find start line and ending line
			start = i;
			end = i;
			while (i < lines.length && lines[i].match(/^\:+ /)!=null) i++;
			
			html += wiky.process_indent(lines,start,end);
		}
		else if (line.match(/^-----*$/)!=null)
		{
			html += "<hr/>";
		}
		else if (line.match(/^\*+ /)!=null || line.match(/^#+ /)!=null)
		{
			// find start line and ending line
			start = i;
			end = i;
			while (i < lines.length && (lines[i].match(/^\*+ /)!=null || line.match(/^#+ /)!=null)) i++;
			
			html += wiky.process_bullet_point(lines,start,end);
		}
		else 
		{
			html += wiky.process_normal(line);
		}
		
		html += "<br/>\n";
	}
	
	return html;
}

wiky.process_indent = function(lines,start,end) {
	
}

wiky.process_bullet_point = function(lines,start,end) {
	
}

wiky.process_url = function(txt) {
	
	var index = txt.indexOf(" ");
	
	if (index == -1) 
	{
		return "<a target='"+txt+"' href='"+txt+"' style='background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeF59z4EJADEIQ1F36k7u5E7ZKXeUQPACJ3wK7UNokVxVk9kHnQH7bY9hbDyDhNXgjpRLqFlo4M2GgfyJHhjq8V4agfrgPQX3JtJQGbofmCHgA/nAKks+JAjFAAAAAElFTkSuQmCC\") no-repeat scroll right center transparent;padding-right: 13px;'></a>";
	}
	else
	{
		url = txt.substring(0,index);
		label = txt.substring(index+1);
		return "<a target='"+url+"' href='"+url+"' style='background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAFZJREFUeF59z4EJADEIQ1F36k7u5E7ZKXeUQPACJ3wK7UNokVxVk9kHnQH7bY9hbDyDhNXgjpRLqFlo4M2GgfyJHhjq8V4agfrgPQX3JtJQGbofmCHgA/nAKks+JAjFAAAAAElFTkSuQmCC\") no-repeat scroll right center transparent;padding-right: 13px;'>"+label+"</a>";
	}
}

wiky.process_image = function(txt) {
	var index = txt.indexOf(" ");
	url = txt;
	label = "";
	
	if (index > -1) 
	{
		url = txt.substring(0,index);
		label = txt.substring(index+1);
	}
	
	
	return "<br/><img src='"+url+"' alt=\""+label+"\" /><br/>";
}

wiky.process_normal = function(wikitext) {
	
	// Image
	{
		var index = wikitext.indexOf("[Image:");
		var end_index = wikitext.indexOf("]", index + 7);
		while (index > -1 && end_index > -1) {
			
			wikitext = wikitext.substring(0,index) 
						+ wiky.process_image(wikitext.substring(index+7,end_index)) 
						+ wikitext.substring(end_index+1);
		
			index = wikitext.indexOf("[Image:");
			end_index = wikitext.indexOf("]", index + 7);
		}
	}
	
	// URL
	var protocols = ["http","ftp","news"];
	
	for (var i=0;i<protocols.length;i++)
	{
		var index = wikitext.indexOf("["+protocols[i]+"://");
		var end_index = wikitext.indexOf("]", index + 1);
		while (index > -1 && end_index > -1) {
		
			wikitext = wikitext.substring(0,index) 
						+ wiky.process_url(wikitext.substring(index+1,end_index)) 
						+ wikitext.substring(end_index+1);
		
			index = wikitext.indexOf("["+protocols[i]+"://",end_index+1);
			end_index = wikitext.indexOf("]", index + 1);
			
		}
	}
	
	var count_b = 0;
	var index = wikitext.indexOf("'''");
	while(index > -1) {
		
		if ((count_b%2)==0) wikitext = wikitext.replace(/'''/,"<b>");
		else wikitext = wikitext.replace(/'''/,"</b>");
		
		count_b++;
		
		index = wikitext.indexOf("'''",index);
	}
	
	var count_i = 0;
	var index = wikitext.indexOf("''");
	while(index > -1) {
		
		if ((count_i%2)==0) wikitext = wikitext.replace(/''/,"<i>");
		else wikitext = wikitext.replace(/''/,"</i>");
		
		count_i++;
		
		index = wikitext.indexOf("''",index);
	}
	
	wikitext = wikitext.replace(/<\/b><\/i>/g,"</i></b>");
	
	return wikitext;
}

