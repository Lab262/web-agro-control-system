import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('graph-money-amount-hightlighted', 'Integration | Component | graph money amount hightlighted', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{graph-money-amount-hightlighted}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#graph-money-amount-hightlighted}}
      template block text
    {{/graph-money-amount-hightlighted}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
