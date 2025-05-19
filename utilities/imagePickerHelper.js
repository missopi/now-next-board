// File to store all image picker code so can be used on multiple screens. 
// Will handle selected images from camera and photo gallery.

import * as ImagePicker from "expo-image-picker";


// Ask for permissions
export async function requestPermission(type) {
  if (type === 'camera') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  } else {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  }
}

// Choose image from camera or photo gallery
export async function pickImage(type = 'camera') {
  const hasPermission = await requestPermission(type);
  if (!hasPermission) {
    alert('Permission denied. Please enable permissions in settings.');
    return null;
  }

  let result;
  if (type === 'camera') {
    result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
  } else {
    result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: 'images',
    allowsEditing: false,
    base64: true,
    aspect: [4, 3],
    quality: 1,
    });
  }

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  // Covert image into base64
  const asset = result.assets[0];
  const mimeType = asset.type === 'image' && asset.uri?.endsWith('.png') ? 'png' : 'jpeg';
  const based64Image = `data:image/${mimeType};base64,${asset.base64}`;
  console.log('Base64 image file:', based64Image);

  return based64Image;
}
