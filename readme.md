# Serup
The response time should be expected to be 5ms but it can be higher. The relay will be closed if Digispark does not get a callback within 1000ms.

# Installation With Digispark
1. Copy the code in [Serup/arduino/sketch_apr19a.ino](https://github.com/JAAKKQ/Serup/blob/Digispark/arduino/sketch_apr19a/sketch_apr19a.ino) to your Digispark.
2. The relay's data pin is default to pin 1 you can change it in the 9th line:
    ```JavaScript
    int Relay = 1; // Pin where relay and build in led is set
    ```
3. Install the nodejs program by cloning the Digispark repo to your server.
4. Install needed dependencies with `npm install`
5. Set the serial port in `port.json` file. You can get list of all available ports by running `node available`
6. Create a systemd service so that that the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/Digispark/index.js) file is always running. You can find the exapmle service in [Serup/Serup.service](https://github.com/JAAKKQ/Serup/blob/Digispark/Serup.service) you should edit the third section of ExecStart to where the [Serup/index.js](https://github.com/JAAKKQ/Serup/blob/Digispark/index.js) file is located.
7. Test if it works `sudo node index.js` If errors come up check the [subject for common errors](https://github.com/JAAKKQ/Serup#common-errors) below.
8. Now start the service: `sudo systemctl start Serup` and enable it so that it opens up after rebooting: `sudo systemctl enable Serup`

NoiS