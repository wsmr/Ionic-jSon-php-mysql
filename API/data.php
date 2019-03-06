<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {

        header('Access-Control-Allow-Origin: * ');
        
        //header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");

        header('Access-Control-Allow-Credentials: true');

        header('Access-Control-Max-Age: 86400');    // cache for 1 day

    }

    // Access-Control headers are received during OPTIONS requests

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])){

            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  
        }      

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])){

            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
        }

        exit(0);

    }

  require 'dbconnect.php';

    $data = file_get_contents('php://input');


    $sql = "SELECT * FROM users ";

      $result = mysqli_query($con,$sql);

      // var_dump($result);

      $row = mysqli_fetch_all($result,MYSQLI_ASSOC);


     // $username = $row['username'];

      $count = mysqli_num_rows($result);

     

      // If result matched myusername and mypassword, table row must be 1 row                    

      if ($count > 0) {

        $response = array('values' => $row);

      } else {

        $response = array('auth' => 'false');         

      }

 echo json_encode($response);

?>

