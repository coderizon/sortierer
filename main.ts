// Wenn Bluetooth verbunden wird
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
// Wenn Bluetooth getrennt wird
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
// Datenempfang und Motorsteuerung
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    // --- FALL 1: ORANGE (Links sortieren) ---
    if (receivedString == "orange") {
        basic.showIcon(IconNames.Heart)
        // Motor auf 45 Grad drehen (nach links kippen)
        // Hinweis: Passe P0 an, falls dein Motor woanders steckt
        pins.servoWritePin(AnalogPin.C8, 45)
        // Kurz warten, damit der Ball rollen kann (1 Sekunde)
        basic.pause(1000)
        // Motor wieder in die Mitte (Neutralstellung)
        pins.servoWritePin(AnalogPin.C8, 90)
    }
    // --- FALL 2: WEIẞ (Rechts sortieren) ---
    if (receivedString == "weiß") {
        basic.showIcon(IconNames.Skull)
        // Motor auf 135 Grad drehen (nach rechts kippen)
        pins.servoWritePin(AnalogPin.P0, 135)
        // Kurz warten
        basic.pause(1000)
        // Motor wieder in die Mitte
        pins.servoWritePin(AnalogPin.P0, 90)
    }
})
let receivedString = ""
// Start-Initialisierung
bluetooth.startUartService()
basic.showIcon(IconNames.Surprised)
// Stelle den Motor beim Start sicherheitshalber auf die Mitte
pins.servoWritePin(AnalogPin.C8, 90)
