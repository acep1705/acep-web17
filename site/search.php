<!DOCTYPE HTML>
<head>
	<title>Search</title>
	<meta charset="utf-8">
	<link href="css/style.css" rel="stylesheet">
	<script src="js/request_url.js"></script>
    <!--[if lt IE 9]>
        <script src="js/html5.js"></script>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
        <link href="css/ie.css" rel="stylesheet">
    <![endif]-->
</head>
<body>
<div>
	<div class="dynamicContent">
		<div class="inner">
            <div class="row">
                <div class="span12">
                    <h2>Search <span>results:</span></h2>
            		<?php 
            			if($_GET["s"]){$s=$_GET["s"];};
            			include("results.php");
            		?>
                </div>
            </div>
        </div>
	</div>
</div>
</body>
</html>