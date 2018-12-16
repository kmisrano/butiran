/*
	numberTypesNoIndent.cpp
	Determine type of numbers without indentation
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ numberTypes.cpp -o numberTypes
	Execute: ./numberTypes
	
	20181216
	Start this program.
*/

// Include libraries
#include <iostream>
#include <cmath>
#include <cstring>

// Use namespace
using namespace std;

// Define main function
int main(int argc, char *argv[]) {
// Check program argument
if(argc < 0) {
// Display program usage
cout << "Usage: numberTypes [number]" << endl;

// Return unsuccess state
return -1;

} else {
// Process number obtained from program argument
double x = atof(argv[1]);

// Define type in string
string type = "";

// Determine negative, positive, or zero
if(x < 0) {
type += "negative";

// Determine integer or real
if(x == floor(x)) {
type += " integer";				
} else {
type += " real";			
}
} else if(x > 0) {
type += "positive";

// Determine integer of real
if(x == floor(x)) {
type += " integer";

// Determine whether square number
if(sqrt(x) == floor(sqrt(x))) {
type += " square";
}
} else {
type += " real";			
}
} else {
type += "zero";

// Determine integer of real
if(x == floor(x)) {
type += " integer";
} else {
type += " real";			
}
}

// Display result
cout << x << " is " << type << endl;

// Return success state
return 0;
}	
}
