/*eslint-env jquery */
/*globals formatJSON */
/*eslint-disable no-unused-vars */
function onTextClick() {
		
		/*
		function createnewDiv(src) {
			var html_code = '<img src=\"' + src + '\" alt=\"the image\" width="250">';
			return $('<div></div>').html(html_code);
			
		}*/
		function createnewText(who, text){
			if (who === 'Bot') {
				return $(`<div class=\"segments load\"><div class=\"from-watson top\"><div class=\"message-inner\"><p>${text}</p></div></div></div>`);
				/*
				<div class="segments load">
          	      <div class="{{clazz}}">
                    <div class="message-inner">
                        <p>{{text}}</p>
                    </div>
                	</div>
            	</div>
            	*/
			}
			if (who === 'You') {
				//var a = 'Hello', b = 'World';
                //console.log(`The computer says ${ a.toUpperCase() }, ${b}!`);
                // Prints "The computer says HELLO, World!"
				return $(`<div class=\"segments load\"><div class=\"from-user top\"><div class=\"message-inner\"><p>${text}</p></div></div></div>`);
			}
			return $('<div></div>').text(text);
		}
		function createnewTextPre(text){
			return $('<pre></pre>').html(text);
		}
		function processOK(response) {
			console.log('OK');
			$('#loading').hide();
			//$('#id_contextdump').prepend(createnewText('Response from Watson: ' + response.output.text));
			//$('#id_contextdump').prepend(createnewText(JSON.stringify(response.output.text, null, 2)));
			$('#id_contextdump').prepend(createnewText('Bot', response.output.text[0]));
        	$('#id_contextdump').show();
        	$('#conversation_output').prepend(createnewTextPre(formatJSON(JSON.stringify(response), false)));
        }
           
    	function processNotOK(err) {
        	//not ok call
        	$('#loading').hide();
        	$('#id_contextdump').prepend(createnewText('Error in response from Watson' + err));		
        	$('#id_contextdump').show();
    	}
    	function invokeAjax(message) {
			var ajaxData = {};
			if (message) {
				ajaxData.context = message; 
			}
			$.ajax({
				type: 'POST',
				url: 'api/chat',
				data: ajaxData,
				success: processOK,
				error: processNotOK
			});
    	}
        
		var temp_url = $('#id_urltext').val();
		if (!temp_url) {
		   $('#id_urltext').val('Skriv ditt meddelande här, tack!');
		   return;
        } 
        if (temp_url === 'Skriv ditt meddelande här, tack!') {
        	return;
        } 

    	$('#loading').show();
		$('#id_contextdump').prepend(createnewText('You', temp_url));
        $('#id_contextdump').show();
		
		//$('#id_urltext').val('Fortsätt skriva här, tack!');
		$('#id_urltext').val('');
		invokeAjax(temp_url); 
}
