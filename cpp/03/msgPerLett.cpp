/*
	msgPerLett.cpp
	Display message per letter
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ msgPerLett.cpp -o msgPerLett
	Execute: ./msgPerLett
	
	20181216
	Start this program.
*/

#include <iostream>
#include <cstring>
#include <thread>
#include <chrono>

using namespace std;

int main(int argc, char *argv[]) {
	// Display program usage and terminate program
	if(argc < 2) {
		cout << "Usage: msgPerLett [message]" << endl;
		return -1;
	}
	
	// Get number of arguments other than program name
	int Nline = argc - 1;
	
	// Display each argument in seperate line
	for(int line = 0; line < Nline; line++) {
		// Get each argument as string
		string msg = argv[line + 1];
		
		// Get const char* from string
		char msgc[msg.length() + 1];
		strcpy(msgc, msg.c_str());
		//const char *msgc = msg.c_str();
		int Nletter = sizeof(msgc) / sizeof(msgc[0]);
		
		// Display per letter
		for(int letter = 0; letter < Nletter; letter++) {
			cout << msgc[letter];
			cout.flush();
			
			// Delay in milliseconds
			// url https://stackoverflow.com/a/10613664/9475509
			this_thread::sleep_for(chrono::milliseconds(100));
		}
		cout << endl;
	}
	
	// Return success state
	return 0;
}
