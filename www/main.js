$(document).ready(function() {
	initInterface();
	
	function initInterface(){

		if (typeof navigator.network != "undefined" && navigator.network.connection.type == Connection.NONE) {
			navigator.notification.alert('Будь ласка, перевiрте, чи доступно пiдключення до Internet!');
		} 

		
		$( "div[data-role='header']:empty" ).html(		
			$( "#header-tmpl" ).render()
		).trigger( "create" );
	};		
		

	$.settings = [];
	
	$.settings.loadPreset = function(name,default_value,onLoad)
	{
		default_value = default_value || 0;
		onLoad = onLoad || function() {};
		
		$.settings[name] = window.localStorage.getItem("settings-"+name);
		if ((typeof $.settings[name]  !="undefined" ) && $.settings[name] != null)
		{
			$.settings[name] = $.settings[name]
		}
		else 
		{ 
			$.settings[name] = default_value;
			window.localStorage.setItem("settings-"+name, $.settings[name]);
		}
		onLoad();
	}
	
	$.settings.savePreset = function(name,value)
	{
		window.localStorage.setItem("settings-"+name, value);
		$.settings[name] = value;
		
	}

	applyLocalSettings();	
	/* 
	 * applyLocalSettings running on start and restore user settings from localDB
	 */
	function applyLocalSettings() {
		$.settings.loadPreset('mobile-phone', '', function(){ $('#phone-number').val($.settings['mobile-phone']); console.log($.settings['mobile-phone'])   } );
		
		if ($.settings['mobile-phone'] == '')
		{
			$.mobile.changePage('#phonesetuppage', {transition: 'none'}); 
		}
		
	}
	
	$("#phonesetuppage .savebutton").on('click',function(){
		$.settings.savePreset('mobile-phone', $('#phone-number').val());
		$.mobile.changePage('#mainpage', {transition: 'pop'}); 	
	})
	
	/*
	 * Settings page font slider
	 */
	$( "#tariffspage").on('change','input[name=distance]',function (event) {
			totalprice = $(this).val() <=5 ? 25 : $(this).val()*5; 
			$("#tariffspage p.totalprice span").text(totalprice )
	});

	/* timepicker solution */
	
	function setOrderTime (orderTime){
		$("a[href='#selector-time'] + span").text(orderTime);
	}
	
	$("a[href='#setup-time-now']").click(function(){
		/*
		pubDate = new Date();
		pubTime = (pubDate.getHours() <=9 ?  '0'+pubDate.getHours(): pubDate.getHours() ) + ':'+   (pubDate.getMinutes() <=9 ?  '0'+pubDate.getMinutes(): pubDate.getMinutes() );
		m = pubDate.getMonth() +1;
		displayDate = (pubDate.getDay() <=9 ?  '0'+pubDate.getDay(): pubDate.getDay() ) + '.'+   (m <=9 ?  '0'+m: m )+'.'+pubDate.getFullYear(); 
		pubTimeDate = displayDate+ ' ' + pubTime
		*/
		setOrderTime("на сейчас");
		
		$.mobile.back();
		
		return false;
	})

	$("a[href='#setup-time']").click(function(){
		
		setOrderTime($("#timepicker").val() == '' ? "на сейчас" : $("#timepicker").val());
		$.mobile.back();

		return false;
	})

	/*
	 * address autocomplete support
	 */
	$( "#autocomplete" ).on( "listviewbeforefilter", function ( e, data ) {
				var $ul = $( this ),
					$input = $( data.input ),
					value = $input.val(),
					html = "";
				$ul.html( "" );
				if ( value && value.length > 2 ) {
					$ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
					$ul.listview( "refresh" );
					$.ajax({
						url: "http://gd.geobytes.com/AutoCompleteCity",
						dataType: "jsonp",
						crossDomain: true,
						data: {
							q: $input.val()
						}
					})
					.then( function ( response ) {
						$.each( response, function ( i, val ) {
							html += "<li>" + val + "</li>";
						});
						$ul.html( html );
						$ul.listview( "refresh" );
						$ul.trigger( "updatelayout");
					});
				}
	});

});