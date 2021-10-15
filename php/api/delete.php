<?php

require 'database.php';
require 'auth.php';

// Extract, validate and sanitize the id.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

  if (checkEmail($request->email, $request->token)) {
    $id = $request->id;

    if(!$id)
    {
      return http_response_code(400);
    }

    // Delete.
    $sql = "DELETE FROM `posts` WHERE `id` ='{$id}' LIMIT 1";

    if(mysqli_query($con, $sql))
    {
      http_response_code(204);
    }
    else
    {
      return http_response_code(422);
    }
  }
}