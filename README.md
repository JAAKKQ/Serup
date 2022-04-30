# Serup
Is your server hardware so bad that your server freezes randomly? Well, don't worry, Serup to the rescue! Serup uses Arduino to ping every 20 seconds to your server through serial port. You need nodejs and npm to use the nodejs program that responses to the pings. If Serup does not get a response within 200ms the Arduino will close a relay which is connected to the motherboard's reset button pins. Normally the response will be received in around 7ms.

# Tested on:
### OS
- Windows² / x64
- Linux / x64
### Microcontroller boards
- Arduino Uno R3
- Joy-IT Digispark ATTINY85 ([Digispark/readme.md](https://github.com/JAAKKQ/Serup/blob/Digispark/readme.md))

# Installation With Arduino
1. Copy the code in [Serup/arduino/sketch_apr19a.ino](https://github.com/JAAKKQ/Serup/blob/Arduino/arduino/sketch_apr19a/sketch_apr19a.ino) to your Arduino.
2. The relay's data pin is default to pin 3 you can change it in the 8th line:
    ```JavaScript
    int Relay = 3; //Pin where relay is set
    ```
3. Install the nodejs program by cloning the Arduino repo to your server.
4. Install needed dependencies with `npm install`
5. Set the serial port in `port.json` file. You can get list of all available ports by running `node available`
6. Create a systemd service so that that the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/Arduino/index.js) file is always running. You can find the exapmle service in [Serup/Serup.service](https://github.com/JAAKKQ/Serup/blob/Arduino/Serup.service) you should edit the third section of ExecStart to where the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/Arduino/index.js) file is located on your server.
7. Test if it works `sudo node index.js` If errors come up check the [subject for common errors](https://github.com/JAAKKQ/Serup#common-errors) below.
8. Now start the service: `sudo systemctl start Serup` and enable it so that it opens up after rebooting: `sudo systemctl enable Serup`

# Installation With Digispark
1. Go to the guide here: [Digispark/readme.md](https://github.com/JAAKKQ/Serup/blob/Digispark/readme.md)

# Common errors
#### Error: Opening /dev/ttyACM0: File not found
The port you have set in `port.json` is wrong. Use command `node available` to get list of available ports. Pick a port that has references to your board's name E.g. Arduino
#### Error: Opening /dev/ttyACM0: Access denied
Something is already connected to that serial port.
#### Error: Permission denied, cannot open /dev/ttyACM0
Index.js is not started with root access
