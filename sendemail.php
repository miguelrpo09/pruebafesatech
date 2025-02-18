<?php
if (isset($_POST['name'], $_POST['email'], $_POST['subject'], $_POST['message'])) {
    $name    = trim($_POST['name']); 
    $from    = trim($_POST['email']); 
    $subject = trim($_POST['subject']); 
    $message = trim($_POST['message']);  
    $to      = 'no-reply@generandocodigo.com'; // Reemplaza con tu correo

    // Validación del correo electrónico
    if (!filter_var($from, FILTER_VALIDATE_EMAIL)) {
        die("Dirección de correo electrónico no válida.");
    }

    // Cabeceras del correo
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "From: $name <$from>\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Envío del correo
    if (mail($to, $subject, $message, $headers)) {
        echo "El mensaje ha sido enviado correctamente.";
    } else {
        echo "Hubo un error al enviar el mensaje.";
    }
} else {
    echo "Faltan algunos datos del formulario.";
}
?>

