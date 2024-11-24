<?php
    // DEFAULT ANSWER
    $answer = array(
        "code" => 404,
        "players" => []
    );

    // REQUEST for openDoors: /api/openDoors.php
    // if (!empty($_GET)) {
        // Daten aus JSON-Datei laden
        $data = file_get_contents("../data/players.json");
        $players = json_decode($data, true);

        if (!empty($players) && isset($players['players'])) {
            $openPlayers = array_filter($players['players'], function ($player) {
                return isset($player['open']) && $player['open'] == true;
            });

            $answer["code"] = 200;
            $answer["players"] = array_values($openPlayers); // Filter-Ergebnis in die Antwort schreiben
        } else {
            $answer["code"] = 404;
            $answer["message"] = "Unable to process data.";
        }
    // }

    // SEND JSON
    header('Content-Type: application/json');
    echo json_encode($answer);
?>