# Power Management Script (DE)

Dieses Skript steuert die Leistung von zwei Steckdosen und ein Automobil-Ladesystem basierend auf der gemessenen Gesamtleistung. Es wird verwendet, um die Leistung dynamisch anzupassen und Geräte ein- oder auszuschalten.

## Funktionsweise

Das Skript überwacht die Gesamtleistung (total_act_power) und passt die Leistungsstufen (`powerlevel`) entsprechend an. Basierend auf dem `powerlevel` werden Steckdosen ein- oder ausgeschaltet und die Ladeleistung des Automobils reguliert.

### Ablauf

1. **Jede Minute**:
   - Die Funktion `everyMinute` wird durch einen Timer alle 60 Sekunden aufgerufen.
   - Sie aktualisiert den letzten gemessenen Leistungswert (`lastpower`) und berechnet die neue Leistungsstufe (`powerlevel`).
   - Basierend auf der Leistungsstufe werden die Steckdosen und die Ladeleistung des Autos angepasst.
   - Die aktuelle Zustandsinformation wird als JSON-String ausgegeben.

2. **Anpassung der Leistungsstufe**:
   - Wenn die gemessene Leistung negativ ist (unter -100), wird die Leistungsstufe erhöht.
   - Wenn die Leistung positiv oder 0 ist, wird die Leistungsstufe verringert.
   - Die Leistungsstufe wird dann auf einen Wert zwischen -1 und 10 begrenzt.

3. **Steuerung der Geräte**:
   - **Steckdose 1** wird eingeschaltet, wenn die Leistungsstufe ≥ 1 ist.
   - **Steckdose 2** wird eingeschaltet, wenn die Leistungsstufe ≥ 2 ist.
   - Die Ladeleistung des Autos wird in Abhängigkeit von der Leistungsstufe (abzüglich 2) geregelt.

## Funktionen

- **`app.everyMinute(e)`**: Hauptfunktion, die jede Minute ausgeführt wird, um die Leistungsstufe zu berechnen und Geräte anzusteuern.
- **`app.applyLevel(level)`**: Wendet die berechnete Leistungsstufe an, um die Geräte zu steuern.
- **`app.steckdose1(on)`**: Schaltet Steckdose 1 ein oder aus.
- **`app.steckdose2(on)`**: Schaltet Steckdose 2 ein oder aus.
- **`app.auto1(ampere)`**: Regelt die Ladeleistung des Automobils.

## Abhängigkeiten

Das Skript verwendet die Shelly-API, um HTTP-Anfragen zu senden und die Steckdosen und das Auto zu steuern. Die IP-Adressen der Geräte müssen entsprechend konfiguriert sein:

- **Steckdose 1**: `http://192.168.1.166`
- **Steckdose 2**: `http://192.168.1.169`
- **Automobil-Ladesystem**: `http://192.168.0.75`

## Installation

1. Stellen Sie sicher, dass die Geräte (Steckdosen, Auto-Ladesystem) im Netzwerk verfügbar sind.
2. Passen Sie ggf. die IP-Adressen im Skript an Ihre Netzwerkkonfiguration an.
3. Laden Sie das Skript auf das entsprechende System hoch und starten Sie es.

## Nutzung

Das Skript wird nach der Installation automatisch jede Minute ausgeführt und steuert die angeschlossenen Geräte basierend auf der gemessenen Leistung.

## Hinweise

- Die URL für die Steuerung der Geräte ist in der Funktion `Shelly.call("http.get", {...})` hartcodiert. Stellen Sie sicher, dass diese URLs korrekt konfiguriert sind.
- Beachten Sie, dass das Skript das `em.getstatus` API verwendet, um den aktuellen Leistungsstatus abzurufen. Stellen Sie sicher, dass das Gerät, von dem die Leistung gemessen wird, richtig konfiguriert ist.

## Anpassungen

- Sie können die Bedingungen für die Anpassung der Leistungsstufe oder die Steuerlogik für die Geräte nach Bedarf ändern.

# Power Management Script (EN)

This script controls the power level of two sockets and an automobile charging system based on the total active power measured. It is used to dynamically adjust the power level and turn devices on or off.

## How It Works

The script monitors the total active power (`total_act_power`) and adjusts the power levels (`powerlevel`) accordingly. Based on the `powerlevel`, the sockets are turned on or off, and the charging power of the car is regulated.

### Workflow

1. **Every Minute**:
   - The `everyMinute` function is triggered by a timer every 60 seconds.
   - It updates the last measured power (`lastpower`) and calculates the new power level (`powerlevel`).
   - Based on the power level, the sockets and the car's charging power are adjusted.
   - The current state information is output as a JSON string.

2. **Adjusting the Power Level**:
   - If the measured power is negative (below -100), the power level is increased.
   - If the power is positive or zero, the power level is decreased.
   - The power level is then clamped between -1 and 10.

3. **Controlling Devices**:
   - **Socket 1** is turned on if the power level is ≥ 1.
   - **Socket 2** is turned on if the power level is ≥ 2.
   - The car's charging power is regulated based on the power level (minus 2).

## Functions

- **`app.everyMinute(e)`**: Main function that runs every minute to calculate the power level and control devices.
- **`app.applyLevel(level)`**: Applies the calculated power level to control the devices.
- **`app.steckdose1(on)`**: Turns Socket 1 on or off.
- **`app.steckdose2(on)`**: Turns Socket 2 on or off.
- **`app.auto1(ampere)`**: Regulates the car's charging power.

## Dependencies

The script uses the Shelly API to send HTTP requests to control the sockets and the car. The IP addresses of the devices must be configured as follows:

- **Socket 1**: `http://192.168.1.166`
- **Socket 2**: `http://192.168.1.169`
- **Automobile Charging System**: `http://192.168.0.75`

## Installation

1. Ensure that the devices (sockets, car charging system) are available on the network.
2. Adjust the IP addresses in the script to match your network configuration if necessary.
3. Upload the script to the appropriate system and start it.

## Usage

The script will automatically run every minute after installation and control the connected devices based on the measured power.

## Notes

- The URL for controlling the devices is hardcoded in the function `Shelly.call("http.get", {...})`. Make sure these URLs are correctly configured.
- Note that the script uses the `em.getstatus` API to fetch the current power status. Ensure that the device from which the power is measured is correctly configured.

## Customization

- You can modify the conditions for adjusting the power level or the control logic for the devices as needed.
