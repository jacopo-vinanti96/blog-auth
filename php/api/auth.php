<?php
require "vendor/autoload.php";

function checkEmail($email, $token) {
    $client = new GuzzleHttp\Client();

    // Create a POST request
    $response = $client->request(
        'POST',
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCBUjhIHf2KeDuZ-lGEm5zytWrmtA48wdI',
        [
            'form_params' => [
                'idToken' => $token
            ]
        ]
    );

    // Parse the response object, e.g. read the headers, body, etc.
    $headers = $response->getHeaders();
    $body = $response->getBody();

    // Output headers and body for debugging purposes
    $resEmail = json_decode($body->getContents())->users[0]->email;
    if ($resEmail == $email) {
        return true;
    } else {
        return false;
    }
}

