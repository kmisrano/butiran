#	
#	Create image of particles position using Gnuplot
#	
#	Sparisoma Viridi | dudung@fi.itb.ac.id
#	
#	Execute: ./txt2png.sh [xxxx]
#	
#	20160427
#	Create this script for asteroids-collapse program.
#	

# Define script name
sname="txt2png.sh"

# Verbose usage
if [ $# -lt 1 ]
then
	echo "Usage: $sname [txtf]"
	echo -e "txtf\tname of txt file"
	exit
fi

# Get input filename
txt=$1
if [ ! -f $txt ]
then
	echo "$sname: error: $txt does not exist"
	exit 
fi

# Create ouput filename
png=$(echo $txt | awk -F"." '{print $1}')
png="$png.png"

# Create temporary script for Gnuplot
t="temp.gps"
echo "input = \"$txt\"" > $t
echo "set output \"$png\"" >> $t
echo "set term png enhanced font \",16\"" >> $t
echo "set size ratio -1" >> $t
echo "set xrange [-6:6]" >> $t
echo "set yrange [-6:6]" >> $t
echo "set grid" >> $t
echo "set xtics 2" >> $t
echo "set mxtics 2" >> $t
echo "set ytics 2" >> $t
echo "set mytics 2" >> $t
echo "set xlabel \"{x}\"" >> $t
echo "set ylabel \"{y}\"" >> $t
echo "plot input u 3:4:(\$2*5.2) w p pt 6 \\" >> $t
echo "ps variable notitle" >> $t
gnuplot $t
rm $t
