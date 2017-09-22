<?php
  header('Content-Type: application/json');
  require_once '../vendor/autoload.php';
  require_once '../config.php';

  /*if (empty($_POST['token'])) {
    header("HTTP/1.1 400 Bad Request");
    die(json_encode([
      'success' => false,
      'errorMessage' => 'Token not provided.'
    ]));
  }

  if ($_POST['token'] !== $config['token']) {
    header("HTTP/1.1 400 Bad Request");
    die(json_encode([
      'success' => false,
      'errorMessage' => 'Invalid token.'
    ]));
  }*/

  // List of emails
  $emails = [];

  // Save email provided by subscribed user
  $db = new \MicroDB\Database(__DIR__ . '/../emails');
  $items = $db->find();

  if (!$items || !count($items)) {
    die(json_encode($emails));
  }

  // Get emails list
  $data = array_map(function($item) {
    return [
      'email' => $item['email'],
      'date' => date('d.m.Y H:i:s', $item['timestamp'])
    ];
  }, $items);

  header("Content-type: text/csv");
  header("Content-Disposition: attachment; filename=emails.csv");
  header("Pragma: no-cache");
  header("Expires: 0");

  echo '"Email","Date"' . "\n";
  foreach ($data as $key=>$row) {
    echo '"' . $row['email'] . '","' . $row['date'] . '"' . "\n";
  }

  // die(json_encode([
  //   'success' => true,
  //   'data' => json_encode(array_values($data))
  // ]));
