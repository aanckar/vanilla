<?php

defined("INIT") || exit;

class DB
{
  private $db;

  function __construct($host, $user, $pass, $name)
  {
    $this->db = new mysqli($host, $user, $pass, $name);
    $this->db->set_charset("utf8mb4");
  }

  function get_products($args = [])
  {
    $stmt = $this->db->prepare("SELECT * FROM products WHERE title LIKE ?");
    $term = "%" . $args["title"] . "%";
    $stmt->bind_param("s", $term);
    $stmt->execute();
    $arr = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    if (!$arr) {
      return [];
    }
    return $arr;
  }
}

function db()
{
  return new DB("localhost", "vanilla", "vanilla", "vanilla");
}
