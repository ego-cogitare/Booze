<?php
require_once dirname(__FILE__) . '/vendor/autoload.php';
require_once dirname(__FILE__) . '/config.php';

$data = json_decode(base64_decode($argv[1]), true);

$mail = new PHPMailer();
$mail->CharSet = 'UTF-8';

$mail->IsSMTP();
$mail->SMTPAuth = true;
//$mail->SMTPSecure = false;
//$mail->SMTPAutoTLS = false;
$mail->SMTPSecure = "ssl";
$mail->Host = $config['email']['smtp']['host'];
$mail->Port = 465;
$mail->Username = $config['email']['smtp']['username'];
$mail->Password = $config['email']['smtp']['password'];

$mail->AddReplyTo(
    $config['email']['add-restaurant']['from'],
    $config['email']['add-restaurant']['subject']
);
$mail->SetFrom(
    $config['email']['add-restaurant']['from'],
    $config['email']['add-restaurant']['subject']
);
$mail->AddAddress(
    $config['email']['add-restaurant']['to'],
    $config['email']['add-restaurant']['subject']
);
$mail->Subject = $config['email']['add-restaurant']['subject'];
$mail->MsgHTML('
    <html>
    <head>
      <title>Заявка на добавление ресторана</title>
    </head>
    <body>
      <table>
        <tr>
          <td><b>Имя:</b></td>
          <td>' . @$data['name'] . '</td>
        </tr>
        <tr>
          <td><b>Электронный адрес:</b></td>
          <td>' . @$data['email'] . '</td>
        </tr>
        <tr>
          <td><b>Название вашего заведения:</b></td>
          <td>' . @$data['establishment'] . '</td>
        </tr>
        <tr>
          <td><b>Город:</b></td>
          <td>' . @$data['city'] . '</td>
        </tr>
        <tr>
          <td><b>Номер телефона:</b></td>
          <td>' . @$data['phone'] . '</td>
        </tr>
        <tr>
          <td><b>Время удобное для звонка:</b></td>
          <td>' . @$data['callTime'] . '</td>
        </tr>
        <tr>
          <td><b>Ваше сообщение:</b></td>
          <td>' . @$data['message'] . '</td>
        </tr>
      </table>
    </body>
    </html>
');
$response['emailSent1'] = $mail->Send();

// Send email to user
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
$mail->AddAddress($data['email'], $config['email']['subscribe']['subject']);
$mail->Subject = $config['email']['subscribe']['subject'];
$mail->MsgHTML('
    <html>
    <head>
      <title>Booze</title>
    </head>
    <body>
      Спасибо, что Вы приняли участие в проекте BOOZE. Более подробно о проекте Вы сможете узнать из презентации.
      При возникновении вопросов свяжитесь с нами по телефону: <a href="tel:+38 096 066 76 36">+38 096 066 76 36</a>
    </body>
    </html>
');
$mail->AddAttachment('../files/Booze.pdf');
$response['emailSent2'] = $mail->Send();

print_r($response); echo "\n";
