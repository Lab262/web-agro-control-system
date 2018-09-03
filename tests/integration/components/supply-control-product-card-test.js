import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('supply-control-product-card', 'Integration | Component | supply control product card', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{supply-control-product-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#supply-control-product-card}}
      template block text
    {{/supply-control-product-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
