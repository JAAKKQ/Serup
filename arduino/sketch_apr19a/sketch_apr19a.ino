int Relay = 3; //Pin where relay is set
bool IsServerResolved =  true;

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
    IsServerResolved =  true;
    PowerTimeout();
  } else {
    IsServerResolved = true;
  }
}

void setup()
{
  pinMode(Relay, OUTPUT);     //Set Pin3 as output
  Serial.begin(9600); // Starts the serial communication
}

void loop() {
  while (Serial.available() > 0) {
    char received = Serial.read();

    //Reset server power timeout if r is received.
    if (received == 'r') {
      Serup();
    }
  }
}
