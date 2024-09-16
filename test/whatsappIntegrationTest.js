const axios = require('axios');
const assert = require('assert');

describe('Testando Integração com WhatsApp API', () => {
  
  it('Deve enviar mensagem de texto via WhatsApp API', async () => {
    const whatsappEndpoint = 'https://graph.facebook.com/v13.0/{5585996979482}/messages';
    const token = 'SEU_TOKEN_DE_AUTENTICAÇÃO'; 
    const phoneNumber = '5585996979482';
    const data = {
      messaging_product: 'whatsapp',
      to: phoneNumber,
      type: 'text',
      text: { body: 'Teste de Integração - Envio de Mensagem' }
    };

    try {
      const response = await axios.post(whatsappEndpoint, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      assert.strictEqual(response.status, 200);
      console.log('Mensagem enviada com sucesso!', response.data);
    } catch (error) {
      assert.fail(`Erro no envio da mensagem: ${error.message}`);
    }
  });

});
