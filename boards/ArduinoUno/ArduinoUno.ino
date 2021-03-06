/*
   Serup Code (Microcontroller (Arduino Uno Edition)) by Jaakko & Jummi
   https://github.com/JAAKKQ/Serup
   Last modified on 2th May 2022 by Jaakko & Jummi
   total_hours_wasted_here = 5
   Copyright (c) 2022 Jaakko & Jummi
   MIT License
*/

// Set the correct pins for your board:
#define Relay 3
#define LedBuildin LED_BUILTIN // Pin where relay and build in led is set

// Global Vars
bool IsServerResolved = true, IsInit = true;

/*
   Send "Callback" to server and if you get the call back don't do anything.
   If the callback doesn't come back within 200ms reboot the server.
*/
void Serup()
{
  unsigned long Start, Current, Took;
  Serial.println(F("a:"));
  Serial.write("c\n"); // Send "Callback" to the nodejs program. After program receives Callback it will send "r" through serial port.
  Start = millis();
  while (Serial.available() > 0)
  {
    Serial.read();
  }
  bool DoOnce = true;
  while (!Serial.available() > 0)
  {
    Took = millis() - Start;
    if (Took > 100)
    {
      if (DoOnce)
      {
        DoOnce = false;
        Serial.println(F("b:"));
        Serial.end();
        delay(2000);
        digitalWrite(LedBuildin, HIGH);
        digitalWrite(Relay, HIGH);
        delay(200);
        digitalWrite(Relay, LOW);
        digitalWrite(LedBuildin, LOW);
        Serial.begin(9600);
        /*
           The loop ends here.
           After the server has rebooted it should start the nodejs program if properly configured on server.
           The program then send the s command and so start this loop again. Check loop()
        */
      }
    }
    else
    {
      Serial.print(F("d:"));
      Serial.println(Took);
    }
  }
  Serial.print(F("e:"));
  Serial.println(millis());
  Serial.println(F("g:"));
  delay(20000);
  Serup();
}

void setup()
{
  pinMode(Relay, OUTPUT);
  pinMode(LedBuildin, OUTPUT);
  Serial.begin(9600); // Starts the serial communication
}

// Get available serial data and if available serial data is equal to 's' run function Serup()
void loop()
{
  while (Serial.available() > 0)
  {
    char received = Serial.read();
    // Run Serup() loop if s is received.
    if (received == 's')
    {
      Serial.println(F("f:"));
      delay(2000);
      Serup();
    }
  }
}
