bool IsServerResolved =  true;
int Relay = 3;
String inData = "";

void PowerTimeout() {
  if (IsServerResolved == false) {
    //Reset server
    digitalWrite(Relay, HIGH);   //Turn on relay
    delay(500);
    digitalWrite(Relay, LOW);    //Turn off relay
  } else {
    IsServerResolved =  false;
    delay(60000);
    PowerTimeout();
  }
}


void Serup() {
  bool IsInit = true;
  if (IsInit == true) {
    IsInit = false;
    PowerTimeout();
  } else {
    IsServerResolved = true;
  }
}

void setup()
{
  pinMode(13, OUTPUT);         //Set Pin13 as output
  digitalWrite(13, HIGH);     //Set Pin13 High
  pinMode(Relay, OUTPUT);     //Set Pin3 as output
}

void loop() {
  while (Serial.available() > 0) {
    char received = Serial.read();
    inData.concat(received);

    // Process message when new line character is received
    if (received == '\n') {
      Serup();
    }
  }
}
