<?php
require 'database.php';
require 'auth.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);

    if (checkEmail($request->email, $request->token)) {
        $email = $request->email;
        $posts = [];
        $sql = "SELECT * FROM posts WHERE `email` = '{$email}' ORDER BY `date` DESC";

        if($result = mysqli_query($con,$sql))
        {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
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

        echo json_encode($posts);
        }
        else
        {
        http_response_code(404);
        }
    }
}