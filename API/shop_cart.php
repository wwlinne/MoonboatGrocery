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
        $sql = "SELECT * FROM shopping_cart";
     /*    $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $users = $stmt->fetch(PDO::FETCH_ASSOC);
        } else { */
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //}
		echo json_encode($users);
        break;
	/* case "POST":
        $data = json_decode(file_get_contents('php://input'));
        if(isset($data->type) && $data->type === 'user') {
            // Handle user information
            $sql = "INSERT INTO user (name, email, phone, password) VALUES (:name, :email, :phone, :password)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $data->name);
            $stmt->bindParam(':email', $data->email);
            $stmt->bindParam(':phone', $data->phone);
            $stmt->bindParam(':password', $data->password);
        } elseif(isset($data->type) && $data->type === 'contact') {
            // Handle contact information
            $sql = "INSERT INTO contact_info (name, email, phone, msg) VALUES (:name, :email, :phone, :msg)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':name', $data->name);
            $stmt->bindParam(':email', $data->email);
            $stmt->bindParam(':phone', $data->phone);
            $stmt->bindParam(':msg', $data->msg);
        }
        
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed'];
        }
        break;  
		case "PUT":
			$user = json_decode( file_get_contents('php://input') );
			$sql = "UPDATE user SET name= :name, email =:email, phone =:phone, password =:password  WHERE id = :id";
			$stmt = $conn->prepare($sql);
			$stmt->bindParam(':id', $user->id);
			$stmt->bindParam(':name', $user->name);
			$stmt->bindParam(':email',$user->email);
			$stmt->bindParam(':phone', $user->phone);
			$stmt->bindParam(':password', $user->password);

			if($stmt->execute()) {
				$response = ['status' => 1, 'message' => 'Record updated successfully.'];
			} else {
				$response = ['status' => 0, 'message' => 'Failed to update record.'];
			}
			echo json_encode($response);
		break;   */
		case "DELETE":
			$sql = "DELETE FROM shopping_cart WHERE id = :id";
			$path = explode('/', $_SERVER['REQUEST_URI']);
	
			$stmt = $conn->prepare($sql);
			$stmt->bindParam(':id', $path[3]);
	
			if($stmt->execute()) {
				$response = ['status' => 1, 'message' => 'Record deleted successfully.'];
			} else {
				$response = ['status' => 0, 'message' => 'Failed to delete record.'];
			}
			echo json_encode($response);
		break;
}