<?php
use Bacterii\Classes\Classes;
require_once ('Config.php');
if (@$_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
    $Bact = new \Bacterii\Classes\Classes();
    $Bact->ColTakt($_POST['tackt']);
} else {
    echo "Это не АЖАкс запрос";
}
?>