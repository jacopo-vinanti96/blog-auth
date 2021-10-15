<?php
/**
 * Returns the list of posts.
 */
require 'database.php';

$posts = [];
$sql = "SELECT * FROM posts ORDER BY `date` DESC";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    if ($row['visible'] == 1) {
      $posts[$i]['id'] = $row['id'];
      $posts[$i]['content'] = $row['content'];
      $posts[$i]['title'] = $row['title'];
      $posts[$i]['img'] = $row['img'];
      $posts[$i]['tags'] = explode('_', $row['tags']);
      $posts[$i]['visible'] = $row['visible'];
      $posts[$i]['date'] = $row['date'];
      $posts[$i]['email'] = $row['email'];
      $i++;
    }
  }

  echo json_encode($posts);
}
else
{
  http_response_code(404);
}