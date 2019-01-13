/*
	argFIOParams.cpp
	Example of program read parameters from input file with
	key text and save the results into output file
	
	Sparisoma Viridi | https://github.com/dudung/butiran
	
	Compile: g++ argFIOParams.cpp -o argFIOParams
	Execute: ./argFIOParams [ifile ofile]
	
	20190114
	0456 Start creating at home.
*/

#include <iostream>
#include <cstdlib>
#include <fstream>
#include <cstring>
#include <sstream>

using namespace std;

double getParams(const char*, const char*);

int main(int argc, const char *argv[]) {
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
	
	// Read parameters from input file
	x0 = getParams(ifname, "XXX0");
	y0 = getParams(ifname, "YYY0");
	v0x = getParams(ifname, "VV0X");
	v0y = getParams(ifname, "VV0Y");
	tbeg = getParams(ifname, "TBEG");
	tend = getParams(ifname, "TEND");
	dt = getParams(ifname, "TSTP");
	
	// Confirm file reading
	cout << x0 << endl;
	cout << y0 << endl;
	cout << v0x << endl;
	cout << v0y << endl;
	cout << tbeg << endl;
	cout << tend << endl;
	cout << dt << endl;
	
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

double getParams(const char *fname, const char *key) {
	ifstream fin;
	fin.open(fname);
	string line;
	double x = 0;
	while(fin.good()) {
		getline(fin, line);
		size_t beg = line.find(key);
		size_t len = line.length();
		if(beg != string::npos) {
			beg = line.find("\t");
			string vals = line.substr(beg+1, len-beg);
			x = atof(vals.c_str());
		}
	}
	fin.close();
	return x;
}