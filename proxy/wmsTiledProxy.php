<?php

	$url = $_REQUEST["url"];
		
	if (substr ($url, 0, 7) != "http://"
		&& substr ($url, 0, 8) != "https://"
		&& substr ($url, 0, 6) != "ftp://") {
	
		die("ERROR: The argument 'url' must be an absolute URL beginning with 'http://', 'https://', or 'ftp://'.");
	}

	$parts = parse_url($url);
		
	parse_str($parts['query'], $query);
	$format = array_values($query)[3];
	
	
	ini_set("user_agent", $_SERVER['HTTP_USER_AGENT']);
	
	enable_cors();
	switch ($_SERVER["REQUEST_METHOD"]) {
		case "GET":
			get($url, $format);
			break;		
	}
	
	function get($url, $format) {
		header('Content-type: ' .  $format);		
		echo file_get_contents($url);
	}
		
	function enable_cors() {				
		header("Access-Control-Allow-Origin: *");						
	}
?>