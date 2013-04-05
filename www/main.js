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
		

	applyLocalSettings();	
	/* 
	 * applyLocalSettings running on start and restore user settings from localDB
	 */
	function applyLocalSettings() {
		
		$.settings = [];
	}	

});