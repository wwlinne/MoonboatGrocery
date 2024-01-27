<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Allow requests from all origins
header("Access-Control-Allow-Origin: *");

// Allow requests with all headers
header("Access-Control-Allow-Headers: *");

// Allow requests using specific methods
header("Access-Control-Allow-Methods: *");

// Check if it's an OPTIONS request (preflight request)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
	case "GET":
            $sql = "SELECT * FROM contact_info";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $info = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($info);
        break;

	case "POST":
            $data = json_decode(file_get_contents('php://input'));
            $sql = "INSERT INTO contact_info (name, email, phone, msg) VALUES (:name, :email, :phone, :msg)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $data->name);
            $stmt->bindParam(':email', $data->email);
            $stmt->bindParam(':phone', $data->phone);
            $stmt->bindParam(':msg', $data->msg);
        
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed'];
        }
        break;  
}