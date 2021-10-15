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
    $request->tags = implode('_', $request->tags);
  
    // Validate.
    $errMsg = '';
    if(trim($request->title) === '') {
      $errMsg .= "Title is invalid \n"; 
    }
    if(trim($request->content) === '') {
      $errMsg .= "Content is invalid \n"; 
    }
    if(trim($request->tags) === '') {
      $errMsg .= "Tags are invalid \n"; 
    }
    if(strpos($request->visible, '1') < 0 && strpos($request->visible, '0') < 0) {
      $errMsg .= "Visible is invalid \n"; 
    }
    if(!date_create($request->date)) {
      $errMsg .= "Date is invalid \n"; 
    }
    if ($errMsg !== '') {
        echo $errMsg;
        return http_response_code(400);
    }
  
    // Sanitize.
    $title = mysqli_real_escape_string($con, trim($request->title));
    $content = mysqli_real_escape_string($con, trim($request->content));
    $tags = mysqli_real_escape_string($con, trim($request->tags));
    $img = mysqli_real_escape_string($con, trim($request->img));
    $visible = $request->visible === '1'? 1 : 0;
    $email = $request->email;
    // Date parsing
    $date = mysqli_real_escape_string($con, trim($request->date));
    $date = str_replace('T', ' ', $date);
    $date = substr($date, 0, -5);
  
    // Create.
    $sql = "INSERT INTO `posts`(`title`,`content`,`tags`,`visible`,`img`,`date`,`email`) 
      VALUES ('{$title}','{$content}','{$tags}','{$visible}','{$img}','{$date}','{$email}')";
  
    if(mysqli_query($con,$sql))
    {
      http_response_code(201);
      $post = [
        'title' => $title,
        'content' => $content,
        'tags' => $tags,
        'visible' => $visible,
        'img' => $img,
        'date' => $date,
        'email' => $email,
        'id' => mysqli_insert_id($con)
      ];
      echo json_encode($post);
    }
    else
    {
      echo mysqli_error($con);
      http_response_code(422);
    }
  }
}