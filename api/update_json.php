<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json'); // JSON-Antwort

    // Daten vom Client empfangen
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    if ($data && isset($data['day'])) {
        // Absoluter Pfad zur JSON-Datei
        $filePath = __DIR__ . '/../data/players.json';

        // Prüfen, ob die Datei existiert
        if (file_exists($filePath)) {
            $jsonData = json_decode(file_get_contents($filePath), true);

            if (is_array($jsonData) && isset($jsonData['players'])) {
                // Spieler basierend auf dem Tag finden
                $playerFound = false;
                foreach ($jsonData['players'] as &$player) {
                    if ($player['day'] === $data['day']) {
                        $player['open'] = true; // 'open' auf true setzen
                        $playerFound = true;
                        break;
                    }
                }

                if ($playerFound) {
                    // Änderungen speichern
                    file_put_contents($filePath, json_encode($jsonData, JSON_PRETTY_PRINT));
                    echo json_encode(['status' => 'success', 'message' => 'Spieler geöffnet']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Spieler nicht gefunden']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Ungültige JSON-Struktur']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'JSON-Datei nicht gefunden']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Ungültige Daten']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Nur POST-Anfragen erlaubt']);
}
