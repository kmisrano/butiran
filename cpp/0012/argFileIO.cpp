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
	
	// Get initial condition
	double x0 = atof(argv[1]);
	double y0 = atof(argv[2]);
	double v0x = atof(argv[3]);
	double v0y = atof(argv[4]);
	
	// Get iteration parameters
	double tbeg = atof(argv[5]);
	double tend = atof(argv[6]);
	double dt = atof(argv[7]);
	double t = tbeg;
	
	// Get filenames
	const char *ifname = argv[1];
	const char *ofname = argv[2];
	
	// Open filestream
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
	fout.close();
	
	// Terminate program
	return 0;
}
