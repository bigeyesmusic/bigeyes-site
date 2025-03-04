<?php
// Verifica se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura e sanitiza os dados do formulário
    $nome = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $mensagem = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Validação dos campos
    if (empty($nome) || empty($email) || empty($mensagem)) {
        echo json_encode(["status" => "error", "message" => "Todos os campos são obrigatórios."]);
        exit;
    }

    // Validação do e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "E-mail inválido."]);
        exit;
    }

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
        // Log de erro (opcional)
        error_log("Erro ao enviar e-mail para $destinatario");
        echo json_encode(["status" => "error", "message" => "Erro ao enviar a mensagem."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método de requisição inválido."]);
}
?>