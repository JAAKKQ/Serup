# Serup
Is your server hardware so bad that your server freezes randomly? Well, don't worry, Serup to the rescue! Serup uses Arduino to ping every 5 seconds to your server through serial port. You need nodejs and npm to use the nodejs program that responses to the pings. If Serup does not get a response within 200ms the Arduino will close a relay which is connected to the motherboard's reset button pins. Normally the response will be received in around 9ms.

# Tested on:
- Windows² / x64
- Linux / x64

# Installation
1. Copy the code in [Serup/arduino/sketch_apr19a/](https://github.com/JAAKKQ/Serup/blob/07c93d5679ec25326ab13663b58f0d7cb11cc6a5/arduino/sketch_apr19a/sketch_apr19a.ino) to your Arduino.
2. The relay's data pin is default to pin 3 you can change it in the 8th line:
    ```JavaScript
    int Relay = 3; //Pin where relay is set
    ```
3. Install the nodejs program by cloning this repo to your server.
4. Install needed dependencies with `npm install`
5. Set the serial port in `port.json` file.
6. Create a systemd service so that that the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/07c93d5679ec25326ab13663b58f0d7cb11cc6a5/index.js) file is always running. You can find the exapmle service in [Serup/Serup.service](https://github.com/JAAKKQ/Serup/blob/e2e5cf2e4ccac5d5c01df65ef811d140a502ddcf/Serup.service) you should edit the third section of ExecStart to where the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/07c93d5679ec25326ab13663b58f0d7cb11cc6a5/index.js) file is located.
7. Now start the service: `sudo systemctl start Serup` and enable it so that it opens up after rebooting: `sudo systemctl enable Serup`
