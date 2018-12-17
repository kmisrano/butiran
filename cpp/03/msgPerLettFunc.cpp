/*
	msgPerLettFunc.cpp
	Display message per letter with functions as examples
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ msgPerLettFunc.cpp -o msgPerLettFunc
	Execute: ./msgPerLettFunc
	
	20181217
	Start this program.
*/

#include <iostream>
#include <cstring>
#include <thread>
#include <chrono>

using namespace std;

// Declare functions name
void dispPerLettCon(int, char[], unsigned int);
void dispPerLettCon(string, unsigned int);

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
		
		// Define delay in milliseconds
		int ms = 100;
		
		// Display per letter
		dispPerLettCon(msg, ms);
	}
	
	// Return success state
	return 0;
}

// Display per letter to console using string
void dispPerLettCon(string msg, unsigned int ms) {
	// Get const char* from string
	char msgc[msg.length() + 1];
	strcpy(msgc, msg.c_str());
	int Nletter = sizeof(msgc) / sizeof(msgc[0]);
	
	// Call the same function name but different arguments
	dispPerLettCon(Nletter, msgc, ms);
}

// Display per letter to console using char[]
void dispPerLettCon(int N, char msgc[], unsigned int ms) {
	for(int i = 0; i < N; i++) {
		cout << msgc[i];
		cout.flush();
		
		// Delay in milliseconds
		// url https://stackoverflow.com/a/10613664/9475509
		this_thread::sleep_for(chrono::milliseconds(ms));
	}
	cout << endl;	
}
