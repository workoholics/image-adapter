(function (){
	/**
	 * [ImageAdapter Plugin para adaptar imagen en su marco centrándola debidamente]
	 * @param {[type]} imgNode [nodo de la imagen que se desea adaptar]
	 */
	this.ImageAdapter = function(imgNode){
 
 		//Nodo de la imagen que se quiere centrar
		this.node = imgNode;
		//Establecemos overflow hidden al marco de la imagen
		this.node.parentNode.style.overflow = 'hidden';
		//Creamos un objeto de tipo Image para albergar la imagen real
		this.image = new Image();
		this.image.src = imgNode.getAttribute('src');
		
		//Declaramos un objeto para guardar los datos del marco
		this.frame = {
		};

		this.frame.width = this.node.parentNode.clientWidth;
		this.frame.height = this.node.parentNode.clientHeight;


		/**
		 * [adaptImage Método que adaptará la imagen en su marco]
		 * @return {[type]} [No devuelve ningún valor]
		 */
		this.adaptImage = function(){
			var neededHeight = (this.frame.width * this.image.naturalHeight) / this.image.naturalWidth;
			if(neededHeight > this.frame.height)
			{
				this.setOrientation('x');
			}
			else if(neededHeight < this.frame.height)
			{
				this.setOrientation('y');
			}
			else
			{
				this.node.style.marginTop = '0';
				this.node.style.marginLeft = '0';
				this.node.style.width = '100%';
				this.node.style.height = 'auto';
			}
		};

		/**
		 * [setOrientation Método para establecer la orientacion y centrado de la imagen]
		 * @param {[type]} orientation ['x' para la orientacion horizontal y 'y' para la horientación vertical]
		 */
		this.setOrientation = function(orientation){
			this.node.style.marginTop = '0';
			this.node.style.marginLeft = '0';
			if(orientation === 'x')
			{
				this.node.style.width = '100%';
				this.node.style.height = 'auto';
				var adaptedHeight = (this.frame.width * this.image.naturalHeight) / this.image.naturalWidth;
				var marginTop = -(adaptedHeight - this.frame.height) / 2;
				this.node.style.marginTop = marginTop + "px";
			}
			else if(orientation === 'y')
			{	
				this.node.style.width = 'auto';
				this.node.style.height = '100%';
				var adaptedWidth = (this.frame.height * this.image.naturalWidth) / this.image.naturalHeight;
				var marginLeft = -(adaptedWidth - this.frame.width) / 2;
				this.node.style.marginLeft = marginLeft + "px";
			}
		};


	};
	
}());


document.addEventListener('DOMContentLoaded', function(){
	//Obtenemos todos los nodos que contengal la clase 'img-adapter'
	var imgNodes = document.getElementsByClassName('img-adapter');
	//Por cada uno de los nodos crearemos un objeto tipo ImageAdapter y posteriormente llamaremos al método de adaptación
	for(var i = 0; i < imgNodes.length; i++){
		var adapter = new ImageAdapter(imgNodes[i]);
		adapter.adaptImage();
	}
	
});

//Realizaremos el mismo proceso que en la carga del contenido del DOM cuando el navegador cambie de tamaño.
window.addEventListener('resize', function(){
	var imgNodes = document.getElementsByClassName('img-adapter');
	for(var i = 0; i < imgNodes.length; i++){
		var adapter = new ImageAdapter(imgNodes[i]);
		adapter.adaptImage();
	}
});