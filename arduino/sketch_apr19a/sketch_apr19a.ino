/*
   Serup Code (Microcontroller (Digispark)) by Jaakko & Jummi
   https://github.com/JAAKKQ/Serup
   Last modified on 24th April 2022 by Jaakko & Jummi
   total_hours_wasted_here = 5
*/

// Set the correct pins for your board:
int Relay = 1, SecRelayPin = 4; // Pin where relay and build in led is set

// Global Vars
bool IsServerResolved = true, IsInit = true;

//Board specific libs
#include <DigiCDC.h>

/*
   Send "Callback" to server and if you get the call back don't do anything.
   If the callback doesn't come back within 200ms reboot the server.
*/
void Serup()
{
  unsigned long Start, Current, Took;
  SerialUSB.write("c\n"); // Send "Callback" to the nodejs program. After program receives Callback it will send "r" through serial port.
  Start = millis();
  while (SerialUSB.available() > 0)
  {
    SerialUSB.read();
  }
  bool DoOnce = true;
  while (!SerialUSB.available() > 0)
  {
    Took = millis() - Start;
    if (Took > 200)
    {
      if (DoOnce)
      {
        DoOnce = false;
        SerialUSB.end();
        delay(2000);
        digitalWrite(Relay, HIGH);
        delay(200);
        digitalWrite(Relay, LOW);
        SerialUSB.begin();
        /*
           The loop ends here.
           After the server has rebooted it should start the nodejs program if properly configured on server.
           The program then send the s command and so start this loop again. Check loop()
        */
      } else {
        Serial.print(Took);
      }
    }
  }
  SerialUSB.println("-");
  delay(20000);
  Serup();
}
void setup()
{
  pinMode(Relay, OUTPUT);
  SerialUSB.begin();
}

// Get available serial data and if available serial data is equal to 's' run function Serup()
void loop()
{
  char received = Serial.read();
  // Run Serup() loop if s is received.
  if (received == 's')
  {
    SerialUSB.println("-");
    delay(2000);
    Serup();
  }
}
