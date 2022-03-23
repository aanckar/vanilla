<?php

define("INIT", true);

include("../lib/db.php");

$title = $_GET["title"];

$products = db()->get_products(["title" => $title]);
echo json_encode($products);
