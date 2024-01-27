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
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $items = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $items = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($items);
        break;
    case "POST":
            $data = json_decode(file_get_contents('php://input'));
            // Handle user information
            $sql = "INSERT INTO shopping_cart (product_id) VALUES (:product_id)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':product_id', $data->product_id);
           
    
        if($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Record creation failed'];
        }
        break;  
		
	case "PUT":
			$product = json_decode( file_get_contents('php://input') );
			$sql = "UPDATE product SET cate_id= :cate_id, name =:name, price =:price, desc =:desc, img =:img  WHERE id = :id";
			$stmt = $conn->prepare($sql);
			$stmt->bindParam(':id', $product->id);
			$stmt->bindParam(':cate_id', $product->cate_id);
			$stmt->bindParam(':name',$product->name);
			$stmt->bindParam(':price', $product->price);
			$stmt->bindParam(':desc', $product->desc);
			$stmt->bindParam(':img', $product->img);

			if($stmt->execute()) {
				$response = ['status' => 1, 'message' => 'Record updated successfully.'];
			} else {
				$response = ['status' => 0, 'message' => 'Failed to update record.'];
			}
			echo json_encode($response);
		break;  
		
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