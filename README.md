# Serup
Serup uses microcontroller board to ping every 20 seconds to your server through serial port. You need nodejs and npm to use the nodejs program that responses to the pings. If Serup does not get a response within 100ms the microcontroller board will close a relay which is connected to the motherboard's reset button pins.

# Tested on:
### OS
- Windows² / x64
- Linux / x64
### Microcontroller boards
- Arduino Uno R3 ([Serup/boards/ArduinoUno](https://github.com/JAAKKQ/Serup/blob/main/boards/ArduinoUno))
- Joy-IT Digispark ATTINY85 ([Serup/boards/DigisparkATTINY85](https://github.com/JAAKKQ/Serup/blob/main/boards/DigisparkATTINY85))

# Installation
1. Get the right code for your board from [Serup/boards/](https://github.com/JAAKKQ/Serup/blob/main/boards/) and copy paste that to your board.
2. The relay's data pin is default to pin 3 you can change it in the 11th line:
    ```JavaScript
    int Relay = 3, LedBuildin = LED_BUILTIN; // Pin where relay and build in led is set
    ```
3. Install the nodejs program by cloning the main repo to your server.
4. Install needed dependencies with `npm i` on Linux use `sudo npm i` inside the folder you cloned the repo.
5. Run the nodejs program ones so that the port.json file gets created.
6. Find your serial port path by using command `node available` inside the folder you cloned the repo.
7. Set the serial port path to the port.json file. In the section named "COMport"
8. Now try if everything works by using command `sudo node index` inside the folder you cloned the repo. If errors come up check the [subject for common errors](https://github.com/JAAKKQ/Serup#common-errors) below.
9. Create a systemd service so that that the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/main/index.js) file is always running with root access. You can find the example service in [Serup/Serup.service](https://github.com/JAAKKQ/Serup/blob/main/Serup.service) you should edit the third section of ExecStart to where the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/main/index.js) file is located on your server.
10. Now start the service: `sudo systemctl start Serup` and enable it so that it opens up after rebooting: `sudo systemctl enable Serup`
11. Serup is now ready for work! If you need help just create a [issue](https://github.com/JAAKKQ/Serup/issues/new).

# Common errors
#### Error: Opening /dev/ttyACM0: File not found
The port you have set in `port.json` is not available. Use command `node available` to get list of available ports. Pick a port that has references to your board's name E.g. Arduino
#### Error: Opening /dev/ttyACM0: Access denied
Something is already connected to that serial port.
#### Error: Permission denied, cannot open /dev/ttyACM0
Index.js is not started with root access
