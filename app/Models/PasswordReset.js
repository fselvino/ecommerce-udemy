/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class PasswordReset extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeCreate', async (model) => {
      model.token = await str_random(25);
      const expires_at = new Date();
      expires_at.setMinutes(expires_at.getMinutes() + 30);
      model.expires_at = expires_at;
    });
  }

  // formatar os valores da data para o padrao do mysql
  static get dates() {
    return ['created_at', 'updated_at', 'expired_at'];
  }
}

module.exports = PasswordReset;
