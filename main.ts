// Bluetooth-Status
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Yes)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
// UART-Empfang und Motorsteuerung
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    receivedString = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (receivedString == "Blau") {
        basic.showIcon(IconNames.TShirt)
        // nach links kippen
        pins.servoWritePin(AnalogPin.C8, 45)
        basic.pause(1000)
        // zurück in die Mitte
        pins.servoWritePin(AnalogPin.C8, 90)
    }
    if (receivedString == "Gruen") {
        // falls du "weiß" sendest, entsprechend anpassen
        basic.showIcon(IconNames.Skull)
        // nach rechts kippen
        pins.servoWritePin(AnalogPin.C8, 135)
        basic.pause(1000)
        // zurück in die Mitte
        pins.servoWritePin(AnalogPin.C8, 90)
    }
    if (receivedString == "Bg") {
        // Hintergrund detektiert
        basic.showIcon(IconNames.Happy)
        // zurück zur Ausgangsposition
        pins.servoWritePin(AnalogPin.C8, 90)
    }
})
let receivedString = ""
// Initialisierung
bluetooth.startUartService()
bluetooth.uartWriteString("ready")
basic.showIcon(IconNames.StickFigure)
// Servo in Grundstellung
pins.servoWritePin(AnalogPin.C8, 90)
