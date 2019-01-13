/*
	argFileIO.cpp
	Example of program read parameters from input file and
	save the results into output file
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ argFileIO.cpp -o argFileIO
	Execute: ./argFileIO [ifile ofile]
	
	20190113
	2029 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <fstream>
#include <cstring>
#include <sstream>

using namespace std;

int main(int argc, char *argv[]) {
	// Show usage
	const char *pname = "argOutStreamF";
	if(argc < 2) {
		cout << "Usage: " << pname;
		cout << " [ifile ofile]" << endl;
		cout << "ifile\tinput filename" << endl;
		cout << "ofile\toutput filename" << endl;
		return 1;
	}
	
	// Define constants
	double g = 10;
	
	// Declare variables for initial condition
	double x0, y0, v0x, v0y;
	
	// Declare variable for iteration parameters
	double tbeg, tend, dt, t;
	
	// Get filenames
	const char *ifname = argv[1];
	const char *ofname = argv[2];
	
	// Open filestream for input
	ifstream fin;
	fin.open(ifname);
	
	// Read input file
	string line;
	int i = 0;
	while(fin.good()) {
		getline(fin, line);
		double x = atof(line.c_str());
		switch(i) {
		case 0: x0 = x; break;
		case 1: y0 = x; break;
		case 2: v0x = x; break;
		case 3: v0y = x; break;
		case 4: tbeg = x; break;
		case 5: tend = x; break;
		case 6: dt = x; break;
		default: break;
		}
		i++;
	}
	
	// Close input filestream
	fin.close();
	
	// Initiate t
	t = tbeg;
	
	// Open filestream for output
	ofstream fout;
	fout.open(ofname);
	
	// Perform iteration
	fout << "# t\tvx\tvy\tx\ty" << endl;
	while(t <= tend) {
		
		// Calculate motion variables
		double vx = v0x;
		double vy = v0y - g * t;
		double x = x0 + v0x * t;
		double y = y0 + v0y * t - 0.5 * g * t * t;
		
		// Display values to console
		fout << t << "\t";
		fout << vx << "\t";
		fout << vy << "\t";
		fout << x << "\t";
		fout << y << endl;
		
		// Increase time t by dt
		t += dt;
	}
	
	// Close output filestream
	fout.close();
	
	// Terminate program
	return 0;
}
