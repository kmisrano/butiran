/*
	mjlaplaceplate.js
	Laplace's equation for plate temperature distribution
	
	Sparisoma Viridi | dudung@gmail.com
	
	20180311
	Create this library for the theory first.
*/

// 20180311.2317 ok (partially)
function theoryPlateTemperature() {
	// Get element for writing content
	var eout = document.getElementById("scriptResult");
	eout.innerHTML = "";
	
	// Reset MathJax equation number
	// Ref http://docs.mathjax.org/en/latest/advanced/typeset
	// .html [20180311]
	MathJax.Hub.Queue(
		["resetEquationNumbers",MathJax.InputJax.TeX],
		["PreProcess",MathJax.Hub],
		["Reprocess",MathJax.Hub]
	);
	
	// Define content
	// Ref: https://stackoverflow.com/a/15558082 [20180311]
	var content = function(){/*


<h1>Temperatur pelat tipis</h1>

Suatu sistem fisis dapat memiliki persamaan diferensial dalam bentuk

\begin{equation}
\nabla^2 u = 0
\label{eq:laplace}
\end{equation}

yang dikenal dengan Persamaan Laplace. Operator $\vec{\nabla}$ dalam koordinat kartesian diungkapkan dengan

\begin{equation}
\vec{\nabla} = \hat{x} \frac{\partial}{\partial x}
+ \hat{y} \frac{\partial}{\partial y}
+ \hat{z} \frac{\partial}{\partial z}
\label{eq:nabla}
\end{equation}

yang akan memberikan

\begin{equation}
\nabla^2 = \frac{\partial^2}{\partial x^2}
+ \frac{\partial^2}{\partial y^2}
+ \frac{\partial^2}{\partial z^2}.
\label{eq:nabla2}
\end{equation}

Untuk kasus pelat tipis yang merupakan sistem dua dimensi $u$ dapat dimisalkan berbentuk separabel

\begin{equation}
u(x, y) = X(x) Y(y)
\label{eq:u-separable}
\end{equation}

sehingga memungkan untuk memecahkan Persamaan (\ref{eq:laplace}) dengan menggunakan metode separasi variabel

\begin{equation}
\nabla^2 u = Y \frac{d^2X}{dx^2} + X \frac{d^2Y}{dy^2}.
\label{eq:thin-plate-separation-variable}
\end{equation}


	*/}.toString().slice(14, -3);
	
	// Update MathJax rendering in content
	updateMath("scriptResult", content)
	
	/*
	// It does not work
	// https://stackoverflow.com/a/7303977/9475509 [20180311]
	console.log(eout.scrollTop);
	console.log(eout.scrollHeight);
	eout.scrollTop = eout.scrollHeight;
	
	// It does not work either
	// https://stackoverflow.com/a/11715670/9475509 [20180311]
	window.scrollTo(0, 300);
	*/
	
	// It works but still need mouse click --201803011.2317 ok
	eout.addEventListener("click", scrollToEnd);
	function scrollToEnd() {
		window.scrollTo(0, eout.scrollHeight);
	}
}