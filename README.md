Created this to solve a problem I had with a old computer that I used as a server. The old computer kept freezing randomly.

The Arduino pings (through serial) a NodeJS program on the server if the arduino does not get a response it will close a relay that is connected to the computer's reset pins.
Then the computer reboots and works again for a while.

Worked great until the computer started freezing every hour, then I just switched the old motherboard and it didn't freeze anymore.