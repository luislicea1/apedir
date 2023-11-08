
// const resizeImage = async (file) => {
//   // Verificar el tamaño del archivo
//   var fileSizeInKB = file.size / 1024; // Convertir a KB
//   var img = new Image();

//   var onloadPromise = new Promise((resolve, reject) => {
//     img.onload = async function() {
//       var ratio = this.width / this.height;
//       var newWidth, newHeight;

//       if (fileSizeInKB < 200) {
//         // Si el tamaño del archivo es menor que 200 KB, devolver la imagen original
//         newWidth = this.width;
//         newHeight = this.height;
//       } else if (ratio === 9/16) {
//         newHeight = 300;
//         newWidth = newHeight * ratio;
//       } else {
//         newWidth = 300;
//         newHeight = newWidth / ratio;
//       }

//       // Crear un objeto URL para la imagen redimensionada
//       var canvas = document.createElement('canvas');
//       canvas.width = newWidth;
//       canvas.height = newHeight;
//       var ctx = canvas.getContext('2d');
//       ctx.drawImage(this, 0, 0, newWidth, newHeight);
//       var dataUrl = canvas.toDataURL(file.type);

//       // Convertir dataUrl a Blob para poder cargarlo a Supabase
//       var blob = await (await fetch(dataUrl)).blob();

//       resolve(blob);
//     }

//     img.onerror = reject;
//   });

//   var objectURL = URL.createObjectURL(file);
//   img.src = objectURL;

//   return onloadPromise;
// }


// export {resizeImage}

const resizeImage = async (file) => {
  // Verificar el tamaño del archivo
  var fileSizeInKB = file.size / 1024; // Convertir a KB
  var img = new Image();
 
  var onloadPromise = new Promise((resolve, reject) => {
    img.onload = async function() {
      var ratio = this.width / this.height;
      var newWidth, newHeight;
 
      if (fileSizeInKB < 200) {
        // Si el tamaño del archivo es menor que 200 KB, devolver la imagen original
        newWidth = this.width;
        newHeight = this.height;
      } else if (ratio === 9/16) {
        newHeight = 300;
        newWidth = newHeight * ratio;
      } else {
        newWidth = 300;
        newHeight = newWidth / ratio;
      }
 
      // Crear un objeto URL para la imagen redimensionada
      var canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(this, 0, 0, newWidth, newHeight);
      var dataUrl = canvas.toDataURL('image/webp'); // Convertir a webp
 
      // Convertir dataUrl a Blob para poder cargarlo a Supabase
      var blob = await (await fetch(dataUrl)).blob();
 
      resolve(blob);
    }
 
    img.onerror = reject;
  });
 
  var objectURL = URL.createObjectURL(file);
  img.src = objectURL;
 
  return onloadPromise;
 }
 
 export {resizeImage}
 