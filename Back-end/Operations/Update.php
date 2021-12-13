<?php

    header('Access-Control-Allow-Origin: *'); 
    header('Content-Type:application/json');
    header('Access-Control-Allow-Methods: POST'); 
    header('Access-Control-Allow-Headers:Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods,Authorization,X-Requested-With');

    include_once("./../Database/Database.php");

    $db=new Database();
    $con=$db->Connection();

    $data=json_decode(file_get_contents("php://input"));

    if($_SERVER["REQUEST_METHOD"] != "POST"):
        $db->Message(0,"Page Not Found !");

    elseif(
        empty($data->id)
        || !isset($data->id)
        || !isset($data->username)
        || !isset($data->email)
        || !isset($data->password)
        || empty($data->username)
        || empty($data->email)
        || empty($data->password)
    ):
        $db->Message(0,"Fill All The Required Fields !");
    
    elseif(strlen($data->username) < 4):
        $db->Message(0,"UserName Must Be At Least 4 Characters !");

    elseif(!filter_var($data->email,FILTER_VALIDATE_EMAIL)):
        $db->Message(0,"Email Format Incorrect !");

    elseif(strlen($data->password) < 8):
        $db->Message(0,"Password Must Be At Least 8 Characters !");

    else:
        $id=$data->id;
        $username=trim($data->username);
        $email=trim($data->email);
        $password=trim($data->password);

        if($db->Update($id,$username,$email,$password)):
            $db->Message(1,"User Updated Successfully !");

        endif;
    endif;
?>