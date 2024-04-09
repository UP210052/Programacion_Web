<?php
include "./partials/connection.php";
try {
    $completed = ($_POST['completed'] == 'true')?1:0;
    $SQL = "UPDATE `task` SET title = '{$_POST['title']}', completed = {$completed} WHERE id = {$_POST['id']}";
    echo $SQL;
    $conn ->query($SQL);

} catch (PDOException $e) {
    die($e->getMessage());
}
?>