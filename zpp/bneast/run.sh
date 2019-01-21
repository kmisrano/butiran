#	
#	Run asteroids-collapse related program and script
#	
#	Sparisoma Viridi | dudung@fi.itb.ac.id
#	
#	Execute: ./run
#	
#	20160427
#	Create this script for asteroids-collapse program.
#	

# Define script name
sname="run.sh"

# Verbose usage
if [ $# -lt 3 ]
then
	echo "Usage: $name [inum fnum digit]"
	echo -e "inum\tinitial number"
	echo -e "fnum\tfinal number"
	echo -e "digit\tnumber of digit"
	exit
fi

# Get arguments
inum=$1
fnum=$2
digit=$3

# Set format of number sequence
format="%0.$digit""i"

# Check existing txt files and remove them
txt=($(ls *.txt))
Ntxt=${#txt[@]}
echo "Removing"
for (( i=0; i<=$Ntxt; i++ ))
do
	n=$(printf $format $i)
	txtfile="$n.txt"
	if [ -f $txtfile ]
	then
		echo "$txtfile"
		rm "$txtfile"
	fi
done
echo

# Check existing png files and remove them
png=($(ls *.png))
Npng=${#png[@]}
echo "Removing"
for (( i=0; i<=$Npng; i++ ))
do
	n=$(printf $format $i)
	pngfile="$n.png"
	if [ -f $pngfile ]
	then
		echo "$pngfile"
		rm "$pngfile"
	fi
done
echo

# Define executable
cmd1="./asteroids-collapse"
cmd2="./txt2png.sh"

# Prepare initial data
cp particles.data 0000.txt

# Generate number sequence and execute other script
echo "Creating"
for(( i=inum; i<fnum; i++  ))
do
	# Generate number sequence
	n1=$(printf $format $i)
	j=$(expr $i + 1)
	n2=$(printf $format $j)
	
	# Create related filenames
	itxt="$n1.txt"
	ftxt="$n2.txt"
	ipng="$n1.png"
	fpng="$n2.png"
	
	# Perform simulation
	$cmd1 $itxt $ftxt
	echo -n $itxt" "
	
	# Draw particles position
	$cmd2 $itxt
	echo $ipng
done

# Draw last particles position
$cmd2 $ftxt
echo -n $ftxt" "
echo $fpng

# Make gif file
convert *.png data.gif
