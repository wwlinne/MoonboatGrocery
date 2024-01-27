<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
	case "GET":
        $sql = "SELECT * FROM product";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $products = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        echo json_encode($products);
        break;
	
		case "POST":
			$data = json_decode(file_get_contents('php://input'));
			$sql = "INSERT INTO product (cate_id, name, price, `desc`, img) VALUES (:cate_id, :name, :price, :desc, :img)";
			$stmt = $conn->prepare($sql);
			$stmt->bindParam(':cate_id', $data->cate_id);
			$stmt->bindParam(':name', $data->name);
			$stmt->bindParam(':price', $data->price);
			$stmt->bindParam(':desc', $data->desc);
			$stmt->bindParam(':img', $data->img);
		
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
			$sql = "DELETE FROM product WHERE id = :id";
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