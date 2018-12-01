/*
	fd_grainsfry.js
	Finite differentce simulation of frying with grains
	
	Sparisoma Viridi | dudung@gmail.com
	Nuraina Fika Lubis | nurainafikalubis@gmail.com
	
	20181123
	Smbmit SNIPS abstract.
	
	20181201
	Start this program.
*/

/*
Pemodelan Satu-Dimensi Perambatan Panas Bahan Butiran dalam Proses Sangrai

Sparisoma Viridi, Nuraina Fika Lubis

Memasak beberapa jenis makanan yang berbentuk bahan butiran dengan menggunakan proses sangrai yang umumnya memanfaatkan pasir yang dipanaskan, yang juga merupakan bahan butiran, menarik untuk dipelajari mengingat terdapat dua mekanisme permbatan panas dari wajan ke obyek makanan. Mekanisme pertama adalah melalui konduksi dengan kontak langsung antara wajan dengan butiran pasir yang dilanjutkan dengan beberapa butiran pasir sampai ke obyek. Dan yang kedua adalah melalui radiasi antara wajan ke butiran pasir dan butiran pasir ke obyek melalui ruang kosong di antara butiran. Mekanisme pertama diakomodasi oleh Hukum Fourier, sementara yang kedua oleh Hukum Stefan-Boltzmann. Untuk penyederhanaan dibahas sistem dalam satu dimensi dengan ukuran butiran yang sama akan tetapi obyeknya dapat memiliki ukuran yang berbeda. Susunan dinding wajan, butiran pasir, ruang kosong, dan obyek makanan dapat diacak sehingga dapat tercipta berbagai konfigurasi. Dibahas bagaimana proses perambatan panas dapat terjadi di dalam perose sangrai dan juga radiasinya ke ruang sekitarnya pada bagian atas permukaan pasir. Perambatan panas akibat konveksi sementara diabaikan.

Kata kunci: bahan butiran, sangrai, perambatan panas, simulasi, konfigurasi susunan.
*/

/*
Fourier's law
q = - k \nabla T
q in W/m2
k  in W/m.K
\nabla T in K/m

Stefan-Boltzmann law
J = \sigma W/m2
\sigma in W/m2.T4 (5.670373 \times 10^-8)
T in K
*/
