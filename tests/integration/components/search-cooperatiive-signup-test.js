import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('search-cooperatiive-signup', 'Integration | Component | search cooperatiive signup', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{search-cooperatiive-signup}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#search-cooperatiive-signup}}
      template block text
    {{/search-cooperatiive-signup}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
