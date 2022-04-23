/*
 * Serup Code (Microcontoller) by Jaakko & Jummi
 * https://github.com/JAAKKQ/Serup
 * Last modified on 23th April 2022 by Jaakko & Jummi
 * total_hours_wasted_here = 5
*/

int Relay = 3; //Pin where relay is set
bool IsServerResolved =  true, IsInit = true;

//Send "Callback" to server and if you get the call back don't do anything. If the callback doesn't come back within 200ms reboot the server.
void Serup() {
  unsigned long Start, Current, Took;
  Serial.write("ARDUINO: Sending Callback\n");
  Serial.write("Callback\n");
  int index = 0;
  Start = millis();
  while (Serial.available() > 0) {
    char received = Serial.read();
  }
  bool DoOnce = true;
  while (!Serial.available() > 0) {
    Current = millis();
    Took = Current - Start;
    if (Took > 200) {
      Serial.println("ARDUINO: Callback took more than 200ms... Rebooting...");
      if (DoOnce) {
        DoOnce = false;
        Serial.end();
        digitalWrite(Relay, HIGH);
        delay(200);
        digitalWrite(Relay, LOW);
        Serial.begin(9600);
      }
    } else {
      Serial.write("ARDUINO: Callback received in(ms): ");
      Serial.println(Took);
    }
  }
  Serial.println("________________________________________________________");
  delay(5000);
  Serup();
}

void setup()
{
  pinMode(Relay, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600); // Starts the serial communication
}

//Get available serial data and if available serial data is equal to 's' run function Serup()
void loop() {
  while (Serial.available() > 0) {
    char received = Serial.read();
    //Reset server power timeout if r is received.'
    if (received == 's') {
      Serup();
    }
  }
}
