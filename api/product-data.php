<?php

define("INIT", true);

$data = [
  "name" => "Lorem ipsum",
  "price" => "69,42 €",
  "details_url" => "https://www.example.com"
];

echo (json_encode($data));
