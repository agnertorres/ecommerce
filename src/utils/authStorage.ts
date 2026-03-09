import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'user_auth_credentials';

export const authStorage = {
  async saveCredentials(userId: string, token: string) {
    try {
      await Keychain.setGenericPassword(userId, token, {
        service: SERVICE_NAME,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
    } catch (error) {
      throw new Error('Erro ao salvar as credenciais no Keychain');
    }
  },
  async getCredentials() {
    try {
      const credentials = await Keychain.getGenericPassword({ service: SERVICE_NAME });
      
      if (credentials) {
        return {
          userId: credentials.username,
          token: credentials.password,
        };
      }
      return null;
    } catch (error) {
      throw new Error('Erro ao recuperar as credenciais do Keychain');
    }
  },
  async deleteCredentials() {
    try {
      await Keychain.resetGenericPassword({ service: SERVICE_NAME });
    } catch (error) {
      throw new Error('Erro ao deletar as credenciais do Keychain');
    }
  }
};