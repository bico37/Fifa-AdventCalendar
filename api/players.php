<?php
    // DEFAULT ANSWER
    $answer = array(
        "code" => 404,
        "players" => []
    );

    // REQUEST for ALL players: /api/players.php
    if (!isset($_GET["id"])) {

        $data = file_get_contents("../data/players.json");
        $allPlayers = json_decode($data);

        $answer["code"] = 200;
        $answer["players"] = $allPlayers->players; // Alle Spieler direkt hinzufügen

    }
    // REQUEST for a specific player: /api/players.php?id=1
    else if(isset($_GET["id"]) && is_numeric($_GET["id"]) && !empty($_GET["id"])) {
        $id = $_GET["id"];

        $data = file_get_contents("../data/players.json");
        $allPlayers = json_decode($data);

        // filter players by id
        $filteredPlayers = array_filter($allPlayers->players, function ($player) use ($id): bool {
            return $player->day == $id;
        });

        if (!empty($filteredPlayers)) {
            $answer["code"] = 200;
            $answer["players"] = array_values($filteredPlayers);
        } else {
            $answer["code"] = 404; // Kein Spieler für die Suche gefunden
            $answer["message"] = "No players found for the given id.";
        }
    }

    // SEND JSON
    header('Content-Type: application/json');
    echo json_encode($answer);
?>