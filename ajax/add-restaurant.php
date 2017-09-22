<?php
    require_once '../vendor/autoload.php';
    require_once '../config.php';
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');

    $validation = [
        'name' => '/.{2,}/',
        'establishment' => '/.{3,}/',
        'city' => '/.{3,}/',
        'phone' => '/^\(0[1-9]{2}\)\s[0-9]{3}-[0-9]{4}$/'
    ];

    $response = [
        'valid' => true,
        'emailSent' => false,
        'errors' => []
    ];

    foreach ($_POST as $field => $value) {
        // Clean user input
        $value = $_POST[$field] = strip_tags(trim($value));

        // Validation by pattern
        if (in_array($field, array_keys($validation)) && !preg_match($validation[$field], $value)) {
            $response['errors'][] = $field;
            $response['valid'] = false;
        }

        // Email validation
        if ($field === 'email' && !filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $response['errors'][] = $field;
            $response['valid'] = false;
        }
    }

    if ($response['valid'] && $config['email']['add-restaurant']['sendEmails']) {
        // Send notification email
        $response['emailSent'] = true;

        exec('php '
          . dirname(__FILE__) . '/../send_email.php '
          . base64_encode(json_encode($_POST)) . ' >> '
          . dirname(__FILE__) . '/mail-log.log 2>>'
          . dirname(__FILE__) . '/mail-err.log &');
    }
    else {
        $response['emailSent'] = true;
    }

    echo json_encode($response);
    die();
