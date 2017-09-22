<?php
    require_once '../vendor/autoload.php';
    require_once '../config.php';
    header('Content-Type: application/json');

    $response = [
        'valid' => true,
        'emailSent' => false,
        'errors' => []
    ];

    $email = strip_tags(trim($_POST['email']));

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['errors'][] = 'email';
        $response['valid'] = false;
    }

    if ($response['valid'] && $config['email']['subscribe']['sendEmails']) {

        // Save email provided by subscribed user
        $db = new \MicroDB\Database(__DIR__ . '/../emails');
        $db->create([
          'email' => $email,
          'timestamp' => time()
        ]);

        // Send notification email
        $mail = new PHPMailer();
        $mail->CharSet = 'UTF-8';

        $mail->IsSMTP();
        $mail->SMTPAuth = true;
        // $mail->SMTPSecure = false;
        // $mail->SMTPAutoTLS = false;

        $mail->SMTPSecure = "ssl";
        $mail->Host = $config['email']['smtp']['host'];
        $mail->Port = 465;
        $mail->Username = $config['email']['smtp']['username'];
        $mail->Password = $config['email']['smtp']['password'];

        $mail->AddReplyTo(
            $config['email']['subscribe']['from'],
            $config['email']['subscribe']['subject']
        );
        $mail->SetFrom(
            $config['email']['subscribe']['from'],
            $config['email']['subscribe']['subject']
        );
        $mail->AddAddress(
            $email,
            $config['email']['subscribe']['subject']
        );
        $mail->Subject = $config['email']['subscribe']['subject'];
        $mail->MsgHTML('
            <html>
              <head>
                <title>Booze</title>
              </head>
              <body>
                <p>Спасибо, что Вы стали частью BOOZE. Уже <b>23 сентября</b>, у Вас появится
                возможность выпить бесплатный коктейль в любимом заведении города.
                Ждите уведомления от BOOZE.</p>
              </body>
            </html>
        ');
        $response['emailSent'] = $mail->Send();
    }
    else {
        $response['emailSent'] = true;
    }

    echo json_encode($response);
    die();
