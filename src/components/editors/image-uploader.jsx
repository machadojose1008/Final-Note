import {  ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../utils/firebase/firebase-config';
import Compressor from 'compressorjs';

const uploadImage = (imageFile) => {
  return new Promise((resolve, reject) => {
    // Redimensionar a imagem usando o Compressor.js
    new Compressor(imageFile, {
      quality: 0.5,
      maxWidth: 640,
      maxHeight: 640,
      success: (compressedFile) => {
        // Realizar o upload do arquivo comprimido
        const storageRef = ref(storage, 'images/' + compressedFile.name);
        const uploadTask = uploadBytesResumable(storageRef, compressedFile);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Acompanhamento do progresso do upload, se necessário
          },
          (error) => {
            reject(error);
          },
          () => {
            // Upload concluído com sucesso
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                resolve(downloadURL);
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

  
export default uploadImage;