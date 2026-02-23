# Bluetooth-Status

def on_bluetooth_connected():
    basic.show_icon(IconNames.YES)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_bluetooth_disconnected():
    basic.show_icon(IconNames.NO)
bluetooth.on_bluetooth_disconnected(on_bluetooth_disconnected)

# UART-Empfang und Motorsteuerung

def on_uart_data_received():
    global receivedString
    receivedString = bluetooth.uart_read_until(serial.delimiters(Delimiters.NEW_LINE))
    if receivedString == "Blau":
        basic.show_icon(IconNames.TSHIRT)
        # nach links kippen
        pins.servo_write_pin(AnalogPin.C8, 45)
        basic.pause(1000)
        # zurück in die Mitte
        pins.servo_write_pin(AnalogPin.C8, 90)
    if receivedString == "Gruen":
        # falls du "weiß" sendest, entsprechend anpassen
        basic.show_icon(IconNames.SKULL)
        # nach rechts kippen
        pins.servo_write_pin(AnalogPin.C8, 135)
        basic.pause(1000)
        # zurück in die Mitte
        pins.servo_write_pin(AnalogPin.C8, 90)
    if receivedString == "Bg":
        # Hintergrund detektiert
        basic.show_icon(IconNames.HAPPY)
        # zurück zur Ausgangsposition
        pins.servo_write_pin(AnalogPin.C8, 90)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.NEW_LINE),
    on_uart_data_received)

receivedString = ""
# Initialisierung
bluetooth.start_uart_service()
bluetooth.uart_write_string("ready")
basic.show_icon(IconNames.STICK_FIGURE)
# Servo in Grundstellung
pins.servo_write_pin(AnalogPin.C8, 90)