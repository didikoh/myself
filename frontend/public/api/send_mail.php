<?php
// CORS headers for localhost:5173
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
// 确保是 POST 请求
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.php'); // 视情况改成你的主页
    exit;
}

// 1. 获取并简单清洗数据
$name    = trim($_POST['name'] ?? '');
$email   = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

// 2. 简单校验
$errors = [];

if ($name === '') {
    $errors[] = 'Name is required';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if ($message === '') {
    $errors[] = 'Message cannot be empty';
}

if (!empty($errors)) {
    // 这里可以做成返回上一页并提示错误，先给个简单输出
    echo 'Form error:<br>';
    echo implode('<br>', $errors);
    exit;
}

// 3. 设置收件人信息（改成你的邮箱）
$to      = 'didikoh@hotmail.com';   // ← 换成你的 email
$subject = 'New message from portfolio contact form';

// 4. 邮件内容
$body =
    "You have a new message from your portfolio site:\n\n" .
    "Name: {$name}\n" .
    "Email: {$email}\n\n" .
    "Message:\n{$message}\n";

// 5. 头信息（From / Reply-To）
$headers  = "From: Portfolio Website <no-reply@kooteefamily.com>\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 6. 发送邮件
$sent = mail($to, $subject, $body, $headers);

// 7. 给用户一个反馈
if ($sent) {
    echo 'Thank you! Your message has been sent.';
    // 你也可以：
    // header('Location: thank_you.html');
    // exit;
} else {
    echo 'Sorry, something went wrong. Please try again later.';
}
