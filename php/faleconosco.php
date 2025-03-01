<?php
// Verifica se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura os dados do formulário
    $nome = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $mensagem = htmlspecialchars($_POST['message']);

    // Configurações do e-mail
    $destinatario = "bigeyesmusicprod@gmail.com"; // Substitua pelo seu e-mail
    $assunto = "Novo contato de $nome";
    $corpo = "
        <h2>Novo contato recebido</h2>
        <p><strong>Nome:</strong> $nome</p>
        <p><strong>E-mail:</strong> $email</p>
        <p><strong>Mensagem:</strong> $mensagem</p>
    ";

    // Cabeçalhos do e-mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $nome <$email>" . "\r\n";

    // Envia o e-mail
    if (mail($destinatario, $assunto, $corpo, $headers)) {
        echo json_encode(["status" => "success", "message" => "Mensagem enviada com sucesso!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao enviar a mensagem."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método de requisição inválido."]);
}
?>

