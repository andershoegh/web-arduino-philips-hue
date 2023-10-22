import axios from 'axios';
import https from 'https';

export const getIsLightOn = async () => {
  const isLightOn = await axios
    .get(
      'https://192.168.86.21/clip/v2/resource/light/fddb0cfe-12fd-4c67-89f3-ee9dff38b679',
      {
        headers: {
          'hue-application-key': 'jZh-vq4k3qYfFPSJ22mrj6NfDm17UyMe7iqhsmj4',
        },
        httpsAgent: new https.Agent({
          rejectUnauthorized: false,
        }),
      },
    )
    .then((resp) => {
      return resp.data.data[0].on.on;
    })
    .catch((err) => console.log(err));

  return isLightOn;
};
