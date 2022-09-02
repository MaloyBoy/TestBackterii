<?php

namespace Bacterii\Classes;

class Classes
{
    public function ColTakt($colTakt)
    {
        $BactArray = array('GreenBactGreen' => 3,
            'RedBactGreen' => 4,
            'GreenBactRed' => 7,
            'RedBactRed' => 5);
        foreach ($BactArray as $key => $value) {
            $BactArray[$key] = $value * $colTakt;
        }
        echo json_encode($BactArray);
    }
}

?>