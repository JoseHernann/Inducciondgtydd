import instance from './axiosInstance';
import JsonRequestOptions from './jsonRequest.ts';

async function getDinamicData(requestOptions: JsonRequestOptions) {
  const {
    process = 'WebAPI_GetDinamicData',
    encryptedSP,
    paramValues = [],
    dataString,
    User,
    Pass,
    encryptedConnection = 'X_XoTaIteUiEJgIMkuVCq8T0g==',
  } = requestOptions;

  const response = await instance.post('DinamicData/GetDinamicData', {
    process,
    dataString,
    encryptedSP, //
    encryptedConnection,
    paramValues, //
    User,
    Pass,
  });
  return JSON.parse(response.data);
}

export default getDinamicData;
